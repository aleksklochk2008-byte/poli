import React from 'react'
const paths = {
  chevronUp: <path d="m6 15 6-6 6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M19.07 4.93l-1.42 1.42M6.35 17.65l-1.42 1.42" /></>,
  moon: <path d="M20.5 14.1A8.5 8.5 0 0 1 9.9 3.5 8.5 8.5 0 1 0 20.5 14.1Z" />,
  arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  send: <path d="M12 19V5m-6 6 6-6 6 6" />,
  sparkle: <><path d="M12 3c.4 4.5 3 7.1 7.5 7.5-4.5.4-7.1 3-7.5 7.5-.4-4.5-3-7.1-7.5-7.5C9 10.1 11.6 7.5 12 3Z" /><path d="M19 16c.2 2 1 2.8 3 3-2 .2-2.8 1-3 3-.2-2-1-2.8-3-3 2-.2 2.8-1 3-3Z" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 10h18" /></>,
  brain: <><path d="M12 20V4a3 3 0 0 0-5.5-1A4 4 0 0 0 4 9a4 4 0 0 0 1 7 3.5 3.5 0 0 0 7 4Zm0 0V4a3 3 0 0 1 5.5-1A4 4 0 0 1 20 9a4 4 0 0 1-1 7 3.5 3.5 0 0 1-7 4Z" /></>,
  support: <><path d="M4 13v-2a8 8 0 0 1 16 0v2M4 13h3v5H5a1 1 0 0 1-1-1v-4Zm16 0h-3v5h2a1 1 0 0 0 1-1v-4ZM17 19c-1 2-3 2-5 2" /></>,
  school: <><path d="m2 9 10-5 10 5-10 5L2 9Zm4 2v5c3 3 9 3 12 0v-5m4-2v7" /></>,
  calculator: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8 7h8M8 11h1m3 0h1m3 0h1M8 15h1m3 0h1m3 0h1M8 18h1m3 0h1m3 0h1" /></>,
  play: <path d="m9 5 11 7-11 7V5Z" />,
  close: <path d="M5 5l14 14M19 5 5 19" />
}
export default function Icon({ name, size = 20 }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}
