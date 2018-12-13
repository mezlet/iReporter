import chai from 'chai';
import faker from 'faker';
import chaiHttp from 'chai-http';
import Helper from '../helpers/helper';
import prepareDB from '../db/db';
import server from '../../app';
import * as Mock from './mock';

chai.should();
chai.use(chaiHttp);

beforeEach((done) => {
  prepareDB();
  done();
});

// const { expect } = chai;

chai.should();
chai.use(chaiHttp);
let token;

describe('POST api/v1/auth/signup', () => {
  it('should register users', (done) => {
    chai.request(server)
      .post(Mock.endpoints.signup)
      .send(Mock.exampleUser1)
      .end((err, res) => {
      // eslint-disable-next-line prefer-destructuring
        token = Helper.generateToken(res.body.id);
        res.should.have.status(200);
        res.body.data[0].should.have.property('token');
        res.body.data[0].should.have.property('users');
        res.body.data[0].user.should.have.property('id');
        res.body.data[0].user.should.have.property('email');
        res.body.data[0].user.should.have.property('password');
        res.body.should.equal('object');
      });
    done();
  });
  it('should return error on invalid input', (done) => {
    chai
      .request(server)
      .post(Mock.endpoints.signup)
      .send(Mock.invaliduser)
      .end((err, res) => {
        if (err) done();
        res.should.have.status(400);
        res.body.should.have.property('message');
        res.body.should.be.a('object');
        done();
      });
  });
  it('should return an error if username or email already exists', (done) => {
    chai
      .request(server)
      .post(Mock.endpoints.signup)
      .send(Mock.exampleUser)
      .end((err, res) => {
        console.log(res);
        if (err) done();
        res.should.have.status(500);
        res.body.should.have.property('message');
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('POST api/v1/auth/login', () => {
  it('should login users', (done) => {
    chai.request(server)
      .post(Mock.endpoints.login)
      .send(Mock.login1)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data[0].should.have.property('token');
        res.body.data[0].should.have.property('users');
        res.body.data[0].user.should.have.property('email');
        res.body.data[0].user.should.have.property('password');
        res.body.should.equal('object');
      });
    done();
  });
  it('should return error on invalid input', (done) => {
    chai
      .request(server)
      .post(Mock.endpoints.login)
      .send(Mock.invaliduser)
      .end((err, res) => {
        if (err) done();
        res.should.have.status(400);
        res.body.should.have.property('message');
        res.body.should.be.a('object');
        done();
      });
  });
  it('should return an error if login inputs are empty', (done) => {
    chai
      .request(server)
      .post(Mock.endpoints.login)
      .send()
      .end((err, res) => {
        if (err) done();
        res.body.should.be.a('object');
        res.should.have.status(400);
        res.body.should.have.property('message');
        done();
      });
  });
  it('should return an error if login password is wrong', (done) => {
    chai
      .request(server)
      .post(Mock.endpoints.login)
      .send(Mock.wrongpassword)
      .end((err, res) => {
        if (err) done();
        res.body.should.be.a('object');
        res.should.have.status(401);
        res.body.should.have.property('message');
        done();
      });
  });
  it('should return an error if login email is wrong', (done) => {
    chai
      .request(server)
      .post(Mock.endpoints.login)
      .send(Mock.wrongpassword)
      .end((err, res) => {
        if (err) done();
        res.body.should.be.a('object');
        res.should.have.status(401);
        res.body.should.have.property('message');
        done();
      });
  });
});

describe('Get Incident', () => {
  it('should return an error if there is no record in the db', (done) => {
    chai.request(server)
      .get('/api/v1/incident')
      .set({ 'x-access-token': token })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.data[0].should.have.property('message');
        res.body.should.equal('object');
      });
    done();
  });
  it('should create a redflag or intervention record', (done) => {
    chai.request(server)
      .post('/api/v1/incident')
      .set({ 'x-access-token': token })
      .send({
        type: 'red-flag',
        location: `${faker.address.longitude()}, ${faker.address.latitude()}`,
        comments: 'esdxgcvbjknbklml,ml,mkkn',
        videos: 'jello.mp4',
        images: 'down.jpg',
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.data[0].should.have.property('message');
        res.body.should.equal('object');
      });
    done();
  });
});
