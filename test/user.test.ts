import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { user } from '../src/routes';

chai.use(chaiHttp);

const app = new Hono();
app.get('/user/:id', user);

const port = 3002;
const server = serve({ fetch: app.fetch, port });

describe('GET /user/:id', () => {
  after(() => {
    server.close();
  });

  it('should return user data for a valid user ID', (done) => {
    const userId = 1;
    chai.request(`http://localhost:${port}`)
      .get(`/user/${userId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.equal(userId);
        done();
      });
  });

  it('should return an error for an invalid user ID', (done) => {
    const invalidUserId = 3;
    chai.request(`http://localhost:${port}`)
      .get(`/user/${invalidUserId}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('User not found');
        done();
      });
  });
});
