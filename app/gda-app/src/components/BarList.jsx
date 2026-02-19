import React from 'react'
import BarCard from './BarCard'

export default function BarList({ bars, ratings, onRate, onSelectBar }) {
  return (
    <div className="bar-list">
      {bars.map(bar => (
        <BarCard key={bar.id} bar={bar} rating={ratings[bar.id]} onRate={onRate} onSelect={() => onSelectBar && onSelectBar(bar)} />
      ))}
    </div>
  )
}
