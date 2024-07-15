import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { login } from '../src/routes';

chai.use(chaiHttp);

const app = new Hono();
app.post('/login', login);

const port = 3001;
const server = serve({ fetch: app.fetch, port });

describe('POST /login', () => {
  after(() => {
    server.close();
  });

  it('should return success true for valid credentials', (done) => {
    chai.request(`http://localhost:${port}`)
      .post('/login')
      .send({ username: 'admin', password: 'password' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.be.true;
        done();
      });
  });

  it('should return success false for invalid credentials', (done) => {
    chai.request(`http://localhost:${port}`)
      .post('/login')
      .send({ username: 'user', password: 'wrong' })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.be.false;
        done();
      });
  });
});
