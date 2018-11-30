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
});
