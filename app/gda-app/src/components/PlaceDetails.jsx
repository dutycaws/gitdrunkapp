import React from 'react'

export default function PlaceDetails({ place }) {
  if (!place) {
    return (
      <section className="place-details empty">
        <h3>No place selected</h3>
        <p>Click a marker on the map to view Google reviews and menu/website links.</p>
      </section>
    )
  }

  const reviews = place.reviews || []

  return (
    <section className="place-details">
      <h3>{place.name}</h3>
      {place.formatted_address && <div className="meta">{place.formatted_address}</div>}

      <div style={{ marginTop: 8 }}>
        <strong>Menu / Website:</strong>
        {place.website ? (
          <div><a href={place.website} target="_blank" rel="noreferrer">Visit website</a></div>
        ) : place.url ? (
          <div><a href={place.url} target="_blank" rel="noreferrer">Open in Google Maps</a></div>
        ) : (
          <div>Menu not available for this place.</div>
        )}
      </div>

      <div style={{ marginTop: 12 }}>
        <strong>Google reviews:</strong>
        {reviews.length === 0 ? (
          <div>No reviews available.</div>
        ) : (
          <ul className="reviews-list">
            {reviews.map((r, idx) => (
              <li key={idx} className="review">
                <div className="rev-header">{r.author_name} • {r.rating}★ • {r.relative_time_description}</div>
                <div className="rev-body">{r.text}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
