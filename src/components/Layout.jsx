import React from 'react'
import Icon from './Icon.jsx'
import logo from '../assets/logo.png'

export function Header({ page, theme, onToggle }) {
  return <header className="header"><nav className="nav" aria-label="Основная навигация"><a className="brand" href="#/"><img className="brand-mark" src={logo} alt="" /><span className="brand-name"><strong>МОСКОВСКИЙ</strong><span>ПОЛИТЕХ</span></span></a><span className="priority"><i />приоритет <Icon name="chevronUp" size={13} /></span><div className="nav-actions">{page === 'home' && <span className="phone">+7 (495) 223-05-23</span>}{page === 'home' ? <a className="button button-primary button-small" href="#/applicants"><i />Поступающим</a> : <a className="button button-primary button-small" href="tel:+74952230523"><i />Связаться</a>}{page === 'home' && <button className="button button-small button-students" type="button">Обучающимся</button>}<button className="theme-button" type="button" onClick={onToggle} aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}><Icon name={theme === 'dark' ? 'sun' : 'moon'} size={17} /></button></div></nav></header>
}

export function Footer() {
  return <footer className="footer"><span>© 2025 Московский Политехнический Университет</span></footer>
}
