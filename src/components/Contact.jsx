import { useState } from 'react'
import { ArrowUpRight, Mail, Linkedin, Github } from 'lucide-react'
import { profile } from '../data/site'
import Reveal from './Reveal'
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const update = e => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = e => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`)
    const body = encodeURIComponent(`From: ${form.name} (${form.email})\n\n${form.message}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
  }
  return <section className="section contact-section" id="contact"><Reveal className="contact-card"><div className="contact-copy"><span className="eyebrow">07 / YOUR TURN</span><h2>Have something<br/><em>interesting in mind?</em></h2><p>Research idea, collaboration, opportunity or a technical challenge — I'd love to hear about it.</p><div className="social-links"><a href={`mailto:${profile.email}`}><Mail size={16}/> Email</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn</a><a href={`https://github.com/${profile.github}`} target="_blank" rel="noreferrer"><Github size={16}/> GitHub</a></div></div><form className="contact-form" onSubmit={submit}><label>Your name<input name="name" value={form.name} onChange={update} required placeholder="Jane Smith"/></label><label>Email address<input name="email" type="email" value={form.email} onChange={update} required placeholder="jane@example.com"/></label><label>Message<textarea name="message" value={form.message} onChange={update} required rows="4" placeholder="Tell me what you're thinking…"/></label><button className="button button-dark" type="submit">Send a message <ArrowUpRight size={16}/></button>{sent && <small>Your email app should open with the message ready to send. If it doesn't, email {profile.email} directly.</small>}<small className="form-note">This starter uses your email app. Connect Formspree or a serverless endpoint for direct website submissions.</small></form></Reveal></section>
}