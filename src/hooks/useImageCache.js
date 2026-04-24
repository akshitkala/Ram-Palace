"use client";

import { useState, useCallback } from "react";

// In-memory cache singleton
const cache = new Map();

/**
 * A simple hook to cache image API results to prevent redundant fetches
 * during client-side navigation.
 */
export function useImageCache() {
  const [loading, setLoading] = useState(false);

  const fetchWithCache = useCallback(async (section) => {
    // Return from cache if available
    if (cache.has(section)) {
      return cache.get(section);
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/images?section=${section}`);
      
      if (!res.ok) {
        throw new Error(`API returned status ${res.status}`);
      }

      const data = await res.json();
      const images = data.images || [];
      
      // Store in cache
      cache.set(section, images);
      return images;
    } catch (error) {
      console.error(`Cache fetch failed for ${section}:`, error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const clearCache = useCallback((section) => {
    if (section) {
      cache.delete(section);
    } else {
      cache.clear();
    }
  }, []);

  return { fetchWithCache, loading, clearCache };
}
