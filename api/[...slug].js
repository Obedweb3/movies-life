const UPSTREAM = 'https://movie-api.obedtech.top/api';

module.exports = async function handler(req, res) {
  // CORS headers on every response
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // Extract path from URL, strip leading /api
  // req.url will be something like /api/trending or /api/movies/123
  let urlPath = req.url || '/';

  // Remove /api prefix
  urlPath = urlPath.replace(/^\/api/, '');

  // Ensure it starts with /
  if (!urlPath.startsWith('/')) urlPath = '/' + urlPath;

  const url = `${UPSTREAM}${urlPath}`;

  console.log('Proxying:', url);

  try {
    const upstream = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 CineVault/1.0',
        'Origin': 'https://movie-api.obedtech.top'
      },
      signal: AbortSignal.timeout(20000)
    });

    const text = await upstream.text();

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');

    return res.status(upstream.status).send(text);
  } catch (err) {
    console.error('Proxy error:', err.message, '| URL:', url);
    return res.status(502).json({
      error: 'Upstream API error',
      message: err.message,
      url
    });
  }
};
