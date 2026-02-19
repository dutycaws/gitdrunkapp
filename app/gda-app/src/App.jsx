import React, { useEffect, useState } from 'react'
import BarList from './components/BarList'
import MapEmbed from './components/MapEmbed'

const SAMPLE_BARS = [
  { id: 'b1', name: 'The Tipsy Turtle', address: '123 Main St', distance: 0.4 },
  { id: 'b2', name: 'Hammer & Ale', address: '4 Oak Ave', distance: 0.8 },
  { id: 'b3', name: 'Neon Nook', address: '77 Night Rd', distance: 1.2 },
  { id: 'b4', name: 'Brass Lantern', address: '9 River Pkwy', distance: 1.5 },
  { id: 'b5', name: 'Copper Tap', address: '56 Market St', distance: 2.0 }
]

export default function App() {
  const [bars] = useState(SAMPLE_BARS)
  const [ratings, setRatings] = useState({})

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('gda_ratings')
      if (raw) setRatings(JSON.parse(raw))
    } catch (e) {
      console.error('Failed to load ratings', e)
    }
  }, [])

  useEffect(() => {
    try {
      sessionStorage.setItem('gda_ratings', JSON.stringify(ratings))
    } catch (e) {
      console.error('Failed to save ratings', e)
    }
  }, [ratings])

  function setRating(barId, value) {
    setRatings(prev => ({ ...prev, [barId]: value }))
  }

  return (
    <div className="app">
      <header className="hero">
        <h1>GitDrunk — Nearby Bars</h1>
        <p>Browse nearby bars and rate them (stored in session storage)</p>
      </header>

      <MapEmbed />

      <main>
        <BarList bars={bars} ratings={ratings} onRate={setRating} />
      </main>
    </div>
  )
}
