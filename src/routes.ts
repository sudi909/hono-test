import { Context } from 'hono';

export const login = async (c: Context) => {
  const { username, password } = await c.req.json();

  if (username === 'admin' && password === 'password') {
    return c.json({ success: true }, 200);
  } else {
    return c.json({ success: false }, 401);
  }
};

export const user = async (c: Context) => {
  const userId = parseInt(c.req.param().id);

  if (userId == 1) {
    return c.json({
      id: 1,
      name: 'John Doe',
    }, 200);
  } else if (userId == 2) {
    return c.json({
      id: 2,
      name: 'Jane Doe',
    }, 200);
  } else {
    return c.json({ error: 'User not found' }, 404);
  }
};