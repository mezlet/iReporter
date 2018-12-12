/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

/* global it,describe:true */
/* eslint no-undef: "error" */

import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';

chai.should();

chai.use(chaiHttp);


describe('Incidents', () => {
  it('should return all incidents of type redflag', (done) => {
    chai.request(server)
      .get('/api/v1/red-flag')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('array');
        res.body[0].id.should.be.a('number');
        res.body[0].should.have.property('createdon');
        res.body[0].should.have.property('location');
        done();
      });
  });
  it('should create redflag record', (done) => {
    const incident = {
      createdon: '2018-10-20T17:09:00.953Z',
      createdby: 2,
      type: 'red-flag',
      location: '10.87, 12.48',
      status: 'resolved',
      comment: 'i am here',
    };
    chai.request(server)
      .post('/api/v1/red-flag')
      .send(incident)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('createdon');
        done();
      });
  });
  it('should return a incident with a particular id', (done) => {
    chai.request(server)
      .get('/api/v1/red-flag/1')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should update a specific red flag record', (done) => {
    const newRecord = {
      id: 1,
      createdon: '2018-11-25T17:10:52.953Z',
      createdby: 2,
      type: 'red-flag',
      location: '6.56 3.37',
      status: 'resolved',
      comment: 'wtz up',
    };
    chai.request(server)
      .patch('/api/v1/red-flag/1')
      .send(newRecord)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message');
        done();
      });
  });
  it('should delete a single incident', (done) => {
    chai.request(server)
      .delete('/api/v1/red-flag/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.property('message');
        done();
      });
  });
});
