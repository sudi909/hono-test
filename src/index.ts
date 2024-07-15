import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { login, user } from './routes'; // Import the user route handler

const app = new Hono();

app.get('/', async (c) => {
  console.log('Hello, World!');
  return c.json({ message: 'Hello, World!' }, 200);
});

app.post('/login', login);
app.get('/user/:id', user);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
});
