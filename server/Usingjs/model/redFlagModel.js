import moment from 'moment';
import db from '../db/db';

class RedFlagModel {
  constructor() {
    this.records = db;
  }

  createRecord(data) {
    const newRecord = {
      id: this.records.length + 1,
      type: data.type,
      createdby: data.createdby,
      status: 'pending',
      comment: data.comment,
      location: data.location,
      createdon: moment.now(),
      modifiedDate: moment.now(),
    };
    this.records.push(newRecord);
    return newRecord;
  }

  findOne(id) {
    return this.records.find(record => record.id === id);
  }

  findAll() {
    return this.records;
  }

  update(id, data) {
    const record = this.findOne(id);
    const index = this.records.indexOf(record);
    this.records[index].createdby = data.createdby;
    this.records[index].comment = data.comment;
    this.records[index].location = data.location;
    this.records[index].modifiedDate = moment.now();
    return this.records[index];
  }

  updateComment(id, data) {
    const record = this.findOne(id);
    const index = this.records.indexOf(record.comment);
    this.records[index].comment = data.comment;
    return this.records[index];
  }

  updateLocation(id, data) {
    const record = this.findOne(id);
    const index = this.records.indexOf(record.location);
    this.records[index].location = data.location;
    return this.records[index];
  }

  delete(id) {
    const record = this.findOne(id);
    const index = this.records.indexOf(record);
    this.records.splice(index, 1);
    return {};
  }
}

export default new RedFlagModel();
