import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { showRoutes } from 'hono/dev';
import { cors } from 'hono/cors';
import { swaggerUI } from '@hono/swagger-ui';
import shameRoutes from './routes/shame';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', prettyJSON());
app.use('*', cors());

// Swagger UI
app.get('/docs', swaggerUI({/* ... existing swagger config ... */}));

// Routes
app.route('/shame', shameRoutes);

// Serve frontend static files (after building)
app.use('/*', async (c, next) => {
  try {
    const serveStatic = serve({ root: './frontend/dist' });
    return serveStatic(c, next);
  } catch {
    return next();
  }
});

// Show routes in console
showRoutes(app);

console.log('🚀 Server ready at http://localhost:3000');
console.log('📚 API documentation available at http://localhost:3000/docs');

export default {
  port: 3000,
  fetch: app.fetch,
};
