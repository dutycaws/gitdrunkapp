import React, { useEffect, useRef, useState } from 'react'

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve()
    const s = document.createElement('script')
    s.src = src
    s.async = true
    s.defer = true
    s.onload = () => resolve()
    s.onerror = e => reject(e)
    document.head.appendChild(s)
  })
}

export default function MapEmbed({ bars = [], onPlaceSelect = () => {} }) {
  const mapRef = useRef(null)
  const containerRef = useRef(null)
  const [interactive, setInteractive] = useState(false)

  useEffect(() => {
    const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    if (!key) return

    const src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`
    let mounted = true

    loadScript(src)
      .then(() => {
        if (!mounted) return
        setInteractive(true)
        const google = window.google
        const center = { lat: bars[0]?.lat || 37.7749, lng: bars[0]?.lng || -122.4194 }
        const map = new google.maps.Map(mapRef.current, { center, zoom: 14 })
        containerRef.current.style.height = '420px'

        const service = new google.maps.places.PlacesService(map)

        const markers = bars.map(bar => {
          const marker = new google.maps.Marker({
            position: { lat: bar.lat, lng: bar.lng },
            map,
            title: bar.name
          })

          marker.addListener('click', () => {
            // Try to find a matching place using nearbySearch with keyword
            service.nearbySearch({ location: marker.getPosition(), radius: 100, keyword: bar.name }, (results, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
                const placeId = results[0].place_id
                service.getDetails({ placeId, fields: ['name', 'formatted_address', 'reviews', 'website', 'url'] }, (details) => {
                  onPlaceSelect(details)
                })
              } else {
                // No remote details found — fallback to local bar info
                onPlaceSelect({ name: bar.name, formatted_address: bar.address, reviews: [] })
              }
            })
          })

          return marker
        })

        // center map to show all markers
        if (markers.length) {
          const bounds = new google.maps.LatLngBounds()
          markers.forEach(m => bounds.extend(m.getPosition()))
          map.fitBounds(bounds)
        }
      })
      .catch(err => {
        console.error('Failed to load Google Maps script', err)
      })

    return () => {
      mounted = false
    }
  }, [bars, onPlaceSelect])

  // Fallback iframe when no API key
  if (!import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
    const lat = bars[0]?.lat || 37.7749
    const lng = bars[0]?.lng || -122.4194
    const src = `https://maps.google.com/maps?q=${lat},${lng}&z=14&output=embed`
    return (
      <div className="map-embed">
        <div style={{ margin: '8px 0', color: '#a00' }}>
          Set `VITE_GOOGLE_MAPS_API_KEY` to enable interactive map and live reviews.
        </div>
        <iframe title="Nearby bars map" src={src} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
      </div>
    )
  }

  return (
    <div className="map-embed">
      <div ref={mapRef} style={{ width: '100%', height: '420px' }} />
      <div ref={containerRef} />
    </div>
  )
}
