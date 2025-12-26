const STORAGE_KEY = 'cdf_favorites_v1';

export function getLocalFavorites(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.map(String);
    return [];
  } catch (e) {
    return [];
  }
}

export function isLocalFavorite(id: string): boolean {
  return getLocalFavorites().includes(String(id));
}

export function addLocalFavorite(id: string) {
  try {
    const fav = new Set(getLocalFavorites());
    fav.add(String(id));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(fav)));
  } catch (e) {}
}

export function removeLocalFavorite(id: string) {
  try {
    const fav = new Set(getLocalFavorites());
    fav.delete(String(id));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(fav)));
  } catch (e) {}
}

export function toggleLocalFavorite(id: string) {
  if (isLocalFavorite(id)) removeLocalFavorite(id);
  else addLocalFavorite(id);
}
