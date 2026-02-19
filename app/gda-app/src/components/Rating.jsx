import React from 'react'

function Star({ filled, onClick, label }) {
  return (
    <button className={`star ${filled ? 'filled' : ''}`} onClick={onClick} aria-label={label}>
      {filled ? '★' : '☆'}
    </button>
  )
}

export default function Rating({ value = 0, onChange }) {
  return (
    <div className="rating" role="radiogroup">
      {[1, 2, 3, 4, 5].map(n => (
        <Star
          key={n}
          filled={n <= value}
          onClick={() => onChange(n)}
          label={`${n} star${n > 1 ? 's' : ''}`}
        />
      ))}
    </div>
  )
}
