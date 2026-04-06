// BRP-FIX: D-2
export default function StructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EventVenue',
    name: 'Basti Ram Palace',
    description:
      'Luxury banquet hall in IMT Manesar, Gurugram. Weddings, corporate events, and private celebrations hosted with in-house catering by GD Foods India.',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    telephone: ['+91-8800190003', '+91-9650211469', '+91-9810679550'],
    email: 'info@bastirampalace.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '16G, Kankrola, IMT Manesar',
      addressLocality: 'Manesar',
      addressRegion: 'Haryana',
      postalCode: '122505',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.3919789,
      longitude: 76.9144771,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '120',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday',
      ],
      opens: '09:00',
      closes: '23:00',
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Parking', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'In-house Catering', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Power Backup', value: true },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
