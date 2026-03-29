const UPSTREAM = 'https://movie-api.obedtech.top/api';

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  // Build the upstream path from the catch-all slug
  const { slug } = req.query;
  const pathParts = Array.isArray(slug) ? slug : [slug];
  let upstreamPath = '/' + pathParts.join('/');

  // Forward query string (e.g. ?q=batman)
  const queryKeys = Object.keys(req.query).filter(k => k !== 'slug');
  if (queryKeys.length > 0) {
    const qs = queryKeys.map(k => `${encodeURIComponent(k)}=${encodeURIComponent(req.query[k])}`).join('&');
    upstreamPath += '?' + qs;
  }

  const url = `${UPSTREAM}${upstreamPath}`;

  try {
    const upstream = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'CineVault/1.0'
      },
      signal: AbortSignal.timeout(15000)
    });

    const data = await upstream.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');

    return res.status(upstream.status).json(data);
  } catch (err) {
    console.error('Proxy error:', err.message, 'URL:', url);
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(502).json({ error: 'Upstream API error', details: err.message, url });
  }
}
