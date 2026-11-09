export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    const upstream = await fetch('https://loopup.fun/api/rpc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Origin': 'https://loopup.fun',
        'Referer': 'https://loopup.fun/'
      },
      body: rawBody
    });

    const data = await upstream.text();
    res.setHeader('Content-Type', 'application/json');
    return res.status(upstream.status).send(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
