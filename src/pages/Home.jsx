import React from 'react'
import Assistant from '../components/Assistant.jsx'
import Icon from '../components/Icon.jsx'

const metrics = [['350+', 'Индустриальных проектов'], ['92%', 'Трудоустройство выпускников'], ['Топ-1', 'Инженерный бакалавриат']]
export default function Home() {
  return <main className="home"><section className="hero-copy"><h1>Флагман проектного обучения в России</h1><p>Обучаем студентов на реальных проектах индустрии: электротранспорт, автономные системы и дизайн будущего.</p><div className="hero-actions"><a className="button button-primary" href="#/applicants">Поступающим <span className="accent"><Icon name="arrow" size={18} /></span></a></div><div className="metrics">{metrics.map(([value, label]) => <div className="metric" key={value}><strong>{value}</strong><span>{label}</span></div>)}</div></section><Assistant /></main>
}
