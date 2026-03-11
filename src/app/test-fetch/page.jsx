'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function TestFetch() {

  const endpoints = [
    { label: 'Gallery', url: '/api/images/gallery' },
    { label: 'Weddings', url: '/api/images/events/weddings' },
    { label: 'Corporate', url: '/api/images/events/corporate' },
    { label: 'Private Parties', url: '/api/images/events/private-parties' },
  ];

  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const runTests = async () => {
      const output = {};
      for (const ep of endpoints) {
        try {
          const start = Date.now();
          const res = await fetch(ep.url);
          const data = await res.json();
          const duration = Date.now() - start;
          output[ep.label] = {
            status: res.status,
            ok: res.ok,
            count: data.images && Array.isArray(data.images) ? data.images.length : 'not an array',
            duration: duration + 'ms',
            firstImage: data.images && Array.isArray(data.images) && data.images[0] 
              ? data.images[0].secure_url 
              : null,
            error: !res.ok ? JSON.stringify(data) : null,
          };
        } catch (err) {
          output[ep.label] = { 
            status: 'FETCH_ERROR', 
            error: err.message 
          };
        }
      }
      setResults(output);
      setLoading(false);
    };
    runTests();
  }, []);

  return (
    <div style={{ padding: 40, fontFamily: 'monospace' }}>
      <h1>🔍 Cloudinary Fetch Diagnostic</h1>
      {loading && <p>Running tests...</p>}
      {Object.entries(results).map(([label, result]) => (
        <div key={label} style={{ 
          marginBottom: 32, 
          padding: 20, 
          border: `2px solid ${result.ok ? 'green' : 'red'}`,
          borderRadius: 8 
        }}>
          <h2>{result.ok ? '✅' : '❌'} {label}</h2>
          <p>Status: {result.status}</p>
          <p>Images found: {result.count}</p>
          <p>Response time: {result.duration}</p>
          {result.error && (
            <p style={{ color: 'red' }}>Error: {result.error}</p>
          )}
          {result.firstImage && (
            <div>
              <p>First image preview:</p>
              <Image 
                src={result.firstImage} 
                alt="test" 
                width={200} 
                height={150}
                quality={70}
                sizes="(max-width: 768px) 100vw, 25vw"
                style={{ objectFit: 'cover', borderRadius: 4 }}
              />
              <p style={{ fontSize: 11, color: '#666', wordBreak: 'break-all' }}>
                {result.firstImage}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
