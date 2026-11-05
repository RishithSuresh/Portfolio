import { ArrowUpRight } from 'lucide-react'
import { profile } from '../data/site'
export default function Footer() {
  return <footer className="footer"><a className="brand" href="#top">{profile.shortName}<span>✳</span></a><span>Designed & built with curiosity.</span><div><span>© {new Date().getFullYear()} {profile.name}</span><a href="#top">Back to top <ArrowUpRight size={14}/></a></div></footer>
}