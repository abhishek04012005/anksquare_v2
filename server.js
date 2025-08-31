const express = require('express');
const next = require('next');
const compression = require('compression');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;
const host = '0.0.0.0'; // cPanel/Passenger

app.prepare().then(() => {
  const server = express();

  // Compression
  server.use(compression());

  // Security headers
  server.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  // Express 5-safe catch-all for Next.js
  server.use((req, res) => {
    return handle(req, res);
  });

  // Error handler last
  server.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).send('Internal Server Error');
  });

  server.listen(port, host, () => {
    console.log(`> Ready on http://${host}:${port} as ${dev ? 'development' : 'production'}`);
  });
}).catch(err => {
  console.error('Error starting server:', err);
  process.exit(1);
});
