const API_BASE = 'https://api.arasaac.org/v1';
const STATIC_BASE = 'https://static.arasaac.org/pictograms';

export const DEFAULT_LANGUAGE = 'nl';

export interface ArasaacKeyword {
  keyword: string;
  plural?: string;
  type?: number; // 1=Proper, 2=Common, 3=Verb, 4=Descriptive, 5=Social, 6=Misc
}

export interface ArasaacPictogram {
  _id: number;
  keywords: ArasaacKeyword[];
  categories: string[];
  aac: boolean;
  aacColor: boolean;
  skin: boolean;
  hair: boolean;
}

export function getSymbolImageUrl(symbolId: number, resolution: 300 | 500 = 500): string {
  return `${STATIC_BASE}/${symbolId}/${symbolId}_${resolution}.png`;
}

export async function searchSymbols(
  query: string,
  language: string = DEFAULT_LANGUAGE,
): Promise<ArasaacPictogram[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  // Try bestsearch first (exact match, faster)
  const bestUrl = `${API_BASE}/pictograms/${language}/bestsearch/${encodeURIComponent(trimmed)}`;
  try {
    const bestRes = await fetch(bestUrl);
    if (bestRes.ok) {
      const data = await bestRes.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch {
    // Fall through to broad search
  }

  // Fall back to broad search
  const searchUrl = `${API_BASE}/pictograms/${language}/search/${encodeURIComponent(trimmed)}`;
  try {
    const res = await fetch(searchUrl);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) return data;
    }
  } catch {
    // Network error
  }

  return [];
}
