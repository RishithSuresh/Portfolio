import { useState } from 'react'
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  Github,
  Linkedin,
  Loader2,
  Mail
} from 'lucide-react'
import { profile, getGithubUrl } from '../data/site'
import Reveal from './Reveal'
import SectionStickman from './SectionStickman'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'success' | 'error'
  const [statusMsg, setStatusMsg] = useState('')
  const [copied, setCopied] = useState(false)

  const update = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (status === 'success' || status === 'error') {
      setStatus('idle')
      setStatusMsg('')
    }
  }

  const buildMailtoHref = () => {
    const subject = encodeURIComponent(`Portfolio message from ${form.name || 'Visitor'}`)
    const body = encodeURIComponent(`From: ${form.name} (${form.email})\n\n${form.message}`)
    return `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  const submit = async e => {
    e.preventDefault()
    if (status === 'sending') return

    const name = form.name.trim()
    const email = form.email.trim()
    const message = form.message.trim()

    if (!name || !EMAIL_RE.test(email) || !message) {
      setStatus('error')
      setStatusMsg('Please enter your name, a valid email address, and a message.')
      return
    }

    setStatus('sending')
    setStatusMsg('')

    try {
      const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(profile.email)}`
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          _replyto: email,
          _subject: `Portfolio message from ${name}`,
          message
        })
      })

      let data = null
      try {
        data = await res.json()
      } catch {
        data = null
      }

      const delivered = res.ok && (data?.success === true || data?.success === 'true')
      if (!delivered) {
        const reason = data?.message || `Server returned status ${res.status}`
        throw new Error(reason)
      }

      setStatus('success')
      setStatusMsg(
        `Delivered to ${profile.email}!${
          data?.message ? ` (${data.message})` : ''
        }`
      )
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus('error')
      setStatusMsg(
        `Message could not be delivered${err?.message ? `: ${err.message}` : '.'} You can retry or send via your mail app.`
      )
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const isSending = status === 'sending'

  return (
    <section className="section" id="contact">
      <Reveal className="contact-card">
        <SectionStickman variant="lounger" className="stickman-contact-lounger" width={46} height={28} />
        <SectionStickman variant="courier" className="stickman-contact-ledge" width={74} height={44} />
        <div className="contact-copy">
          <span className="eyebrow">06 / Contact</span>
          <h2>
            Have something
            <br />
            <em>in mind?</em>
          </h2>
          <p>
            Research idea, collaboration, opportunity, or a technical challenge — send a message
            directly to my inbox.
          </p>

          <div className="social-links">
            <a href={`mailto:${profile.email}`}>
              <Mail size={15} /> Email
            </a>
            <button type="button" className="copy-email-btn" onClick={copyEmail}>
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? 'Copied' : 'Copy email'}
            </button>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={15} /> LinkedIn
            </a>
            <a href={getGithubUrl(profile.github)} target="_blank" rel="noreferrer">
              <Github size={15} /> GitHub
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={submit} noValidate>
          <label>
            Your name
            <input
              name="name"
              value={form.name}
              onChange={update}
              required
              disabled={isSending}
              placeholder="Jane Smith"
            />
          </label>
          <label>
            Your email address
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={update}
              required
              disabled={isSending}
              placeholder="jane@example.com"
            />
          </label>
          <label>
            Message
            <textarea
              name="message"
              value={form.message}
              onChange={update}
              required
              disabled={isSending}
              rows="4"
              placeholder="Tell me what you're thinking…"
            />
          </label>
          <button className="button button-primary" type="submit" disabled={isSending}>
            {isSending ? (
              <>
                <Loader2 size={16} className="spin-icon" /> Sending message…
              </>
            ) : (
              <>
                Send message <ArrowUpRight size={16} />
              </>
            )}
          </button>

          {status === 'success' && (
            <div className="contact-status is-success" role="status" aria-live="polite">
              <CheckCircle2 size={16} />
              <span>{statusMsg}</span>
            </div>
          )}

          {status === 'error' && (
            <div className="contact-status is-error" role="alert" aria-live="assertive">
              <AlertCircle size={16} />
              <div>
                <span>{statusMsg}</span>
                <a href={buildMailtoHref()} className="contact-fallback-link">
                  Open email app instead <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          )}

          {status === 'idle' && (
            <small>Messages are delivered directly to {profile.email}.</small>
          )}
        </form>
      </Reveal>
    </section>
  )
}
