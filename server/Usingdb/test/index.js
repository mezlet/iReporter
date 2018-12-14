import babel_polyfill from 'babel-polyfill';
import chai from 'chai';
import faker from 'faker';
import chaiHttp from 'chai-http';
import app from '../../app';

const { expect } = chai;

chai.use(chaiHttp);

const user = {
  firstname: 'Dannni',
  lastname: 'dowtun',
  othernames: 'ram',
  email: faker.internet.email(),
  phonenumber: '2928282828',
  password: '12345678',
  username: faker.internet.userName(),
  // registered: faker.date.recent(),
  //isadmin: false
};

const admin = {
  firstname: 'Danielly',
  lastname: 'messi',
  othernames: 'cow',
  email: faker.internet.email(),
  phonenumber: '9052994438',
  password: '123456785r',
  username: faker.internet.userName(),
};

let token;
let adminToken;

// authentication routes tests
describe('POST api/v1/auth/signup', () => {
  it('should successfully create a user account if inputs are valid', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        // eslint-disable-next-line prefer-destructuring
        token = body.data[0].token;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(201);
        expect(body.data[0]).to.haveOwnProperty('token');
        expect(body.data[0]).to.haveOwnProperty('user');
        expect(body.data[0].user).to.be.an('object');
       // expect(body.data.token).to.be.a('string');
        done();
      });
  });
});

describe('POST api/v1/auth/signup', () => {
  it('should successfully create an admin account if inputs are valid', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(admin)
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        // eslint-disable-next-line prefer-destructuring
        console.log(body);
        adminToken = body.data[0].token;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(201);
        expect(body.data[0]).to.haveOwnProperty('token');
        expect(body.data[0]).to.haveOwnProperty('user');
        expect(body.data[0].user).to.be.an('object');
        done();
      });
  });
});

describe('POST api/v1/auth/signup', () => {
  it('should return an error if signup inputs are invalid', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send()
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('message');
        // expect(body.errors).to.be.a('object');
        done();
      });
  });
});

describe('POST api/v1/auth/signup', () => {
  it('should return an error if username or email already exists', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'dandare47',
        email: faker.internet.email(),
        firstname: faker.name.firstName(),
        othernames: faker.name.firstName(),
        lastname: faker.name.lastName(),
        phonenumber: '2133431454',
        password: '3qwdvf34wedscerscd',
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(409);
        expect(body).to.haveOwnProperty('message');
        expect(body.message).to.equals('Email/ Username Already Exist');
        done();
      });
  });
});

describe('POST api/v1/auth/signup', () => {
  it('should return an error if passwords do not match', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'dandare477',
        email: 'lety@gmail.com',
        firstname: faker.name.firstName(),
        othernames: faker.name.firstName(),
        lastname: faker.name.lastName(),
        phonenumber: '2133431454',
        password: '3qwdvf34wedscerhjkjscd',
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(409);
        expect(body).to.haveOwnProperty('message');
        done();
      });
  });
});

describe('POST api/v1/auth/login', () => {
  it('should successfully log a user in if login inputs are valid', done => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body.data[0]).to.haveOwnProperty('token');
        expect(body.data[0]).to.haveOwnProperty('user');
        expect(body.data[0].user).to.be.an('object');
        expect(body.data[0].token).to.be.a('string');
        done();
      });
  });
});


describe('POST api/v1/auth/login', () => {
  it('should return an error if login inputs are empty', done => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send()
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('message');
        expect(body.message).to.be.a('string');
        done();
      });
  });
});

describe('POST api/v1/auth/login', () => {
  it('should return an error if login password is wrong', done => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        username: user.username,
        password: '1fiuvjnmwcijnmk3wdc0'
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('message');
        done();
      });
  });
});

describe('POST api/incident', () => {
  it('should create a record if user input is valid', done => {
    chai
      .request(app)
      .post('/api/v1/incident/')
      .set({ 'x-access-token': token })
      .send({
        location: '56.78, 78.76',
        comment: 'hello how are you doing',
        type: 'red-flag',
        video: 'jello.mp4',
        image: 'down.jpg'
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.equals(200);
        expect(body.data[0]).to.haveOwnProperty('user');
        expect(body.data[0].user).to.be.an('object');
        done();
      });
  });
});

describe('POST api/v1/incident', () => {
  it('should return an unauthorized error if there is no header token', done => {
    chai
      .request(app)
      .post('/api/v1/incident/')
      .send({
        location: '56.78, 78.76',
        comment: 'hello how are you doing',
        type: 'red-flag',
        video: 'jello.mp4',
        image: 'down.jpg'
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        console.log(res.body);   
        expect(body).to.be.an('object');
        expect(body).to.haveOwnProperty('message');
        done();
      });
  });
});

describe('POST api/v1/incident', () => {
  it('should return an unauthorized error if there is an invalid jwt token', done => {
    chai
      .request(app)
      .post('/api/v1/incident/')
      .set('x-access-token', '34wedcijnemwfecdokjin3jfwekmdcpjirefkmdcls')
      .send({
        location: '56.78, 78.76',
        comment: 'hello how are you doing',
        type: 'red-flag',
        video: 'jello.mp4',
        image: 'down.jpg'
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.message).to.be.a('string');
        expect(body.message).to.be.equals('jwt malformed');
        done();
      });
  });
});


describe('GET api/v1/incident', () => {
  it('should return all available red-flag records', done => {
    chai
      .request(app)
      .get('/api/v1/incident')
      .set({ 'x-access-token': token })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body).to.haveOwnProperty('data');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body.data[0]).to.haveOwnProperty('id');
        done();
      });
  });
});

describe('GET api/v1/incident/:id', () => {
  it('should return an incident record with a specific id', done => {
    chai
      .request(app)
      .get('/api/v1/incident/2')
      .set({ 'x-access-token': token })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.equals(200);
        expect(body).to.haveOwnProperty('data');
        done();
      });
  });
});

describe('GET api/v1/incident/:id (id is non-existent)', () => {
  it('should return an error if a user attempts to make a request for an unexistent record id', done => {
    chai
      .request(app)
      .get(`/api/v1/incident/${faker.random.number() + faker.random.number()}`)
      .set({ 'x-access-token': token })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body).to.haveOwnProperty('message');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(404);
        done();
      });
  });
});

describe('PATCH api/v1/incident/:id/location', () => {
  it('should return an error if the record of that id is non-existent', done => {
    chai
      .request(app)
      .patch('/api/v1/incident/3223432345432432/location')
      .set({ 'x-access-token': token })
      .send({
        location: '543.3213, 423.242'
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('message');
        done();
      });
  });
});
