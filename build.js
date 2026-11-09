const fs = require('fs');
const path = require('path');

const outDir = path.join('.vercel', 'output');
const staticDir = path.join(outDir, 'static');

// Clean and recreate .vercel/output
if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(staticDir, { recursive: true });

// Build Output API v3 config.json
const config = {
  version: 3,
  routes: [
    { handle: 'filesystem' },
    { src: '^/welcome/?$', dest: '/index.html' },
    { src: '^/explore/?$', dest: '/explore.html' },
    { src: '^/degen/?$', dest: '/degen.html' },
    { src: '^/loopers/?$', dest: '/loopers.html' },
    { src: '^/create/?$', dest: '/create.html' },
    { src: '^/docs/?$', dest: '/docs.html' },
    { src: '^/analytics/?$', dest: '/analytics.html' },
    { src: '^/support/?$', dest: '/support.html' },
    { src: '^/terms/?$', dest: '/terms.html' },
    { src: '^/privacy/?$', dest: '/privacy.html' },
    { src: '^/opengraph-image/?$', dest: '/opengraph-image.png' },
    { src: '^/apple-icon/?$', dest: '/apple-icon.png' }
  ]
};

fs.writeFileSync(
  path.join(outDir, 'config.json'),
  JSON.stringify(config, null, 2)
);

// Items to copy into static output
const items = [
  'index.html',
  'welcome.html',
  'explore.html',
  'degen.html',
  'create.html',
  'loopers.html',
  'docs.html',
  'analytics.html',
  'support.html',
  'terms.html',
  'privacy.html',
  '_next',
  'apple-icon.png',
  'icon.svg',
  'manifest.webmanifest',
  'opengraph-image.png'
];

for (const item of items) {
  if (fs.existsSync(item)) {
    const dest = path.join(staticDir, item);
    fs.cpSync(item, dest, { recursive: true });
    console.log(`Copied ${item} -> ${dest}`);
  }
}

console.log('SolLoop build successfully generated for Vercel Output API v3!');
