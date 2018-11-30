/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

/* global it,describe:true */
/* eslint no-undef: "error" */

import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import db from '../db/db';

chai.should();

chai.use(chaiHttp);

describe('Incidents', () => {
  it('should return a list of all incident', (done) => {
    chai.request(server)
      .get('/api/v1/incidents')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('id');
        res.body.data[0].should.have.property('createdOn');
        res.body.data[0].should.have.property('createdBy');
        res.body.data[0].should.have.property('type');
        res.body.data[0].should.have.property('location');
        res.body.data[0].should.have.property('status');
        res.body.data[0].should.have.property('comment');
        res.body.data[0].id.should.be.a('number');
        res.body.data[0].createdOn.should.be.a('string');

        done();
      });
  });
  it('should create incident', (done) => {
    const incident = {
      createdOn: '2018-10-20T17:09:00.953Z',
      createdBy: 2,
      type: 'red-flag',
      location: '10.87 12.48',
      status: 'resolved',
      comment: 'i am here',
    };
    chai.request(server)
      .post('/api/v1/incidents/create')
      .send(incident)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should return a redflag incident with a particular id', (done) => {
    const incident = db[0].incidents;
    chai.request(server)
      .get('/api/v1/incidents/redflags/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data[0].id.should.equal(incident[0].id);
        done();
      });
  });
  it('should update a specific incident', (done) => {
    chai.request(server)
      .post('/api/v1/incidents/editcomment/1')
      .send({ comment: 'hello' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data[0].should.property('message');
        done();
      });
  });
});
