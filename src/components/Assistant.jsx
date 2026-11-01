import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'

const MAX_FILES = 5
const ALLOWED_EXTENSIONS = new Set(['pdf', 'docx', 'doc'])

function fileKey(file) {
  return `${file.name.toLocaleLowerCase()}\u0000${file.size}\u0000${file.lastModified}`
}

function fileLabel(name) {
  const separator = name.lastIndexOf('.')
  const base = separator > 0 ? name.slice(0, separator) : name
  const extension = separator > 0 ? name.slice(separator) : ''
  const characters = Array.from(base)
  return { base: characters.length > 10 ? `${characters.slice(0, 10).join('')}…` : base, extension }
}

export default function Assistant() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [files, setFiles] = useState([])
  const [fileNotice, setFileNotice] = useState(null)
  const nextId = useRef(0)
  const fileInput = useRef(null)
  const textInput = useRef(null)

  useLayoutEffect(() => {
    const element = textInput.current
    if (!element) return
    element.style.height = 'auto'
    element.style.height = `${Math.min(element.scrollHeight, 160)}px`
    element.style.overflowY = element.scrollHeight > 160 ? 'auto' : 'hidden'
  }, [input])

  useEffect(() => {
    if (!fileNotice) return
    const timeout = window.setTimeout(() => setFileNotice(null), 5000)
    return () => window.clearTimeout(timeout)
  }, [fileNotice])

  function addFiles(event) {
    const selected = Array.from(event.target.files || [])
    const next = [...files]
    const keys = new Set(next.map(fileKey))
    const notices = new Set()

    for (const file of selected) {
      const extension = file.name.split('.').pop()?.toLowerCase()
      if (!ALLOWED_EXTENSIONS.has(extension)) {
        notices.add('Можно добавить только файлы PDF, DOCX и DOC.')
      } else if (keys.has(fileKey(file))) {
        notices.add('Этот файл уже добавлен.')
      } else if (next.length >= MAX_FILES) {
        notices.add('Можно добавить не более пяти файлов.')
      } else {
        next.push(file)
        keys.add(fileKey(file))
      }
    }

    setFiles(next)
    setFileNotice(notices.size ? { text: [...notices].join(' ') } : null)
    event.target.value = ''
  }

  function removeFile(key) {
    setFiles(current => current.filter(file => fileKey(file) !== key))
    setFileNotice(null)
  }

  function send(event) {
    event.preventDefault()
    const text = input.trim()
    if (!text && files.length === 0) return
    const attachments = files.map(file => file.name)
    setMessages(current => [...current, { id: nextId.current++, text, attachments, role: 'user' }, { id: nextId.current++, text: 'Это демонстрационная версия помощника. Файлы не отправляются и не обрабатываются. Для консультации позвоните по телефону +7 (495) 223-05-23.', role: 'assistant' }])
    setInput('')
    setFiles([])
    setFileNotice(null)
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault()
      event.currentTarget.form.requestSubmit()
    }
  }

  return <section className="assistant" aria-label="Интеллектуальный помощник">
    <div className="assistant-heading"><div className="assistant-avatar"><Icon name="sparkle" /></div><div><h2>Интеллектуальный помощник Политеха</h2><p>Консультация абитуриентов и студентов</p></div><span className="status"><i />онлайн</span></div>
    {messages.length > 0 && <div className="messages" aria-live="polite">{messages.map(message => <div className={`message ${message.role}`} key={message.id}>{message.text}{message.attachments?.length > 0 && <div className="message-attachments">{message.attachments.map((name, index) => <div key={`${name}-${index}`}>{name}</div>)}</div>}</div>)}</div>}
    <form className="chat-form" onSubmit={send}>
      {files.length > 0 && <ul className="attachment-list" aria-label="Прикреплённые файлы">{files.map(file => <li className="attachment" key={fileKey(file)}><span className="attachment-name" title={file.name}>{fileLabel(file.name).base}<span className="attachment-extension">{fileLabel(file.name).extension}</span></span><button type="button" className="attachment-remove" aria-label={`Удалить файл ${file.name}`} onClick={() => removeFile(fileKey(file))}><Icon name="close" size={14} /></button></li>)}</ul>}
      <label className="sr-only" htmlFor="question">Ваш вопрос</label>
      <textarea ref={textInput} id="question" rows="1" value={input} onChange={event => setInput(event.target.value)} onKeyDown={handleKeyDown} placeholder="Задай любой вопрос по обучению/поступлению" maxLength={1000} />
      <div className="chat-actions"><input ref={fileInput} className="sr-only" type="file" accept=".pdf,.docx,.doc,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" multiple onChange={addFiles} tabIndex={-1} /><button type="button" className="attach-button" aria-label="Прикрепить файлы PDF, DOCX или DOC" onClick={() => fileInput.current?.click()}><Icon name="plus" size={20} /></button><button type="submit" aria-label="Отправить вопрос"><Icon name="send" size={18} /></button></div>
      {fileNotice && <p className="file-notice" role="status">{fileNotice.text}</p>}
    </form>
  </section>
}
