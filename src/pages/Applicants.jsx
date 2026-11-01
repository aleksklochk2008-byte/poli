import React from 'react'
import { useEffect, useRef, useState } from 'react'
import Icon from '../components/Icon.jsx'

const cards = [{ icon: 'calendar', title: 'Расписание дней открытых дверей', text: 'Место и время мероприятия' }, { icon: 'brain', title: 'Активности вуза', text: 'Пройди тест и узнай, какая активность подойдет именно тебе.' }]
export default function Applicants() {
  const [open, setOpen] = useState(null)
  const closeRef = useRef(null)
  useEffect(() => {
    if (!open) return
    const previous = document.activeElement
    closeRef.current?.focus()
    const onKeyDown = event => { if (event.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKeyDown)
    return () => { document.removeEventListener('keydown', onKeyDown); previous?.focus() }
  }, [open])
  return <main className="applicants"><section className="applicants-hero"><div className="campaign"><i />Приемная кампания 2026</div><h1>Твой шанс поступить в <span>лучший вуз Москвы</span></h1><div className="applicant-actions"><button className="button button-glass applicant-action" type="button" onClick={() => setOpen('specialties')}><Icon name="school" /><span>Направления и специальности</span></button><button className="button button-glass applicant-action" type="button" onClick={() => setOpen('calculator')}><Icon name="calculator" /><span>Калькулятор баллов</span></button><button className="video-action button button-glass" type="button" onClick={() => setOpen('video')}><span className="video-action-icon"><Icon name="play" size={15} /></span><span>Видео-навигатор</span></button></div></section><div className="cards">{cards.map(card => <article className="info-card" key={card.title}><div className="card-top"><span className="card-icon"><Icon name={card.icon} /></span><span className="card-arrow"><Icon name="arrow" size={18} /></span></div><h2>{card.title}</h2><p>{card.text}</p></article>)}</div>{open && <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setOpen(false) }}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="video-title"><div className="modal-heading"><h2 id="video-title">{open === 'video' ? 'Видео-навигатор поступающего' : open === 'specialties' ? 'Направления и специальности' : 'Калькулятор баллов'}</h2><button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Закрыть"><Icon name="close" /></button></div><p className="section-placeholder">Информация для этого раздела пока не добавлена.</p></section></div>}</main>
}
