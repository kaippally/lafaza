export const API = import.meta.env.VITE_API_URL || 'http://localhost:4030';

export async function get(path, params) {
  const url = new URL(API + path);
  for (const [k, v] of Object.entries(params || {})) {
    if (v !== '' && v != null) url.searchParams.set(k, v);
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(path + ' -> ' + res.status);
  return res.json();
}
