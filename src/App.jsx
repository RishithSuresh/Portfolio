import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
function RouteView() {
  const location = useLocation()
  return <AnimatePresence mode="wait"><motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .25 }}><Routes location={location}><Route path="/" element={<Home/>}/><Route path="/projects/:slug" element={<ProjectDetail/>}/><Route path="*" element={<ProjectDetail/>}/></Routes></motion.div></AnimatePresence>
}
export default function App() {
  return <><CustomCursor/><Navbar/><RouteView/></>
}