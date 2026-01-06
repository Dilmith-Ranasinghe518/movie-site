const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "59ade2015a178f0ed6415f74664de2b5";

export async function vkFetch(endpoint: string, params: Record<string, string> = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append("api_key", API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const res = await fetch(url.toString(), {
    next: { revalidate: 3600 } // Cache for 1 hour
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch from TMDB: ${res.statusText}`);
  }

  const data = await res.json();
  return data.results || data;
}
