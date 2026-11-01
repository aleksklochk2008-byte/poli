import React from 'react'
import { useEffect, useState } from 'react'
import { Footer, Header } from './components/Layout.jsx'
import Applicants from './pages/Applicants.jsx'
import Home from './pages/Home.jsx'
import Icon from './components/Icon.jsx'

function getPage() { return window.location.hash.startsWith('#/applicants') ? 'applicants' : 'home' }
function getTheme() { try { return localStorage.getItem('mp_theme') === 'light' ? 'light' : 'dark' } catch { return 'dark' } }
export default function App() {
  const [page, setPage] = useState(getPage)
  const [theme, setTheme] = useState(getTheme)
  useEffect(() => { const update = () => setPage(getPage()); window.addEventListener('hashchange', update); return () => window.removeEventListener('hashchange', update) }, [])
  useEffect(() => { document.documentElement.dataset.theme = theme; try { localStorage.setItem('mp_theme', theme) } catch { } }, [theme])
  return <div className="app"><div className="ambient" aria-hidden="true" /><Header page={page} theme={theme} onToggle={() => setTheme(current => current === 'dark' ? 'light' : 'dark')} />{page === 'home' ? <Home /> : <Applicants />}<Footer />{page === 'applicants' && <a className="assistant-link" href="#/" aria-label="Открыть помощника на главной"><span className="assistant-link-label">Интеллектуальный помощник Политеха</span><span className="assistant-link-icon"><Icon name="sparkle" size={20} /></span></a>}</div>
}
