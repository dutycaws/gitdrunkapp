import React from 'react'
import Rating from './Rating'

export default function BarCard({ bar, rating, onRate, onSelect }) {
  return (
    <div className="bar-card" style={{ cursor: onSelect ? 'pointer' : 'default' }} onClick={onSelect}>
      <div className="bar-info">
        <h2>{bar.name}</h2>
        <div className="meta">{bar.address} • {bar.distance} km</div>
      </div>
      <div className="bar-actions">
        <Rating value={rating || 0} onChange={v => onRate(bar.id, v)} />
      </div>
    </div>
  )
}
