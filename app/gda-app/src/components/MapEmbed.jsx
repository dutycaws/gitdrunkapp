import React from 'react'

export default function MapEmbed({ lat = 37.7749, lng = -122.4194, zoom = 14 }) {
  const src = `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`

  return (
    <div className="map-embed">
      <iframe
        title="Nearby bars map"
        src={src}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}
