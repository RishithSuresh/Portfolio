import { ArrowUpRight } from 'lucide-react'
import { profile } from '../data/site'
import SectionStickman from './SectionStickman'

export default function Footer() {
  return (
    <footer className="footer">
      <SectionStickman variant="meditator" className="stickman-footer-meditator" width={40} height={38} />
      <a className="brand" href="#top">
        {profile.shortName}
        <span>✳</span>
      </a>
      <span>Designed &amp; built with curiosity.</span>
      <div>
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <a href="#top">
          Back to top <ArrowUpRight size={14} />
        </a>
      </div>
      <SectionStickman variant="waver" className="stickman-footer-waver" width={36} height={42} />
    </footer>
  )
}