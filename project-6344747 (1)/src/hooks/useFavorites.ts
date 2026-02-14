
import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'nasa-dslm-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage once on mount
  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Ensure the parsed data is an array of strings
        if (Array.isArray(parsed) && parsed.every(item => typeof item === 'string')) {
          setFavorites(parsed);
        } else {
          setFavorites([]);
        }
      } catch {
        // If JSON is malformed, reset to empty list
        setFavorites([]);
      }
    }
  }, []);

  // Centralised saving logic with error handling
  const saveFavorites = useCallback((newFavorites: string[]) => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (e) {
      console.error('Failed to save favorites to localStorage:', e);
    }
  }, []);

  const addFavorite = useCallback(
    (modelId: string) => {
      if (!modelId) return;
      // Avoid duplicates
      if (!favorites.includes(modelId)) {
        const newFavorites = [...favorites, modelId];
        saveFavorites(newFavorites);
      }
    },
    [favorites, saveFavorites]
  );

  const removeFavorite = useCallback(
    (modelId: string) => {
      if (!modelId) return;
      const newFavorites = favorites.filter(id => id !== modelId);
      saveFavorites(newFavorites);
    },
    [favorites, saveFavorites]
  );

  const toggleFavorite = useCallback(
    (modelId: string) => {
      if (!modelId) return;
      if (favorites.includes(modelId)) {
        removeFavorite(modelId);
      } else {
        addFavorite(modelId);
      }
    },
    [favorites, addFavorite, removeFavorite]
  );

  const isFavorite = useCallback(
    (modelId: string) => favorites.includes(modelId),
    [favorites]
  );

  const clearAllFavorites = useCallback(() => {
    saveFavorites([]);
  }, [saveFavorites]);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearAllFavorites,
    favoritesCount: favorites.length,
  };
}
