import Joi from 'joi';
import recordModel from '../model/redFlagModel';
import { incidentSchema, commentSchema, locationSchema } from '../helpers/validation';

const redFlagController = {

  createRecord(req, res) {
    const { error, value } = Joi.validate(req.body, incidentSchema);
    if (error) {
      return res.status(400)
        .json({ error: error.details[0].message });
    }
    const createdrecord = recordModel.createRecord(value);
    return res.status(201).send(createdrecord);
  },

  getAll(req, res) {
    const record = recordModel.findAll();
    return res.status(201).send(record);
  },

  getOne(req, res) {
    if (!(/^[0-9]$/.test(req.params.id))) {
      return res.status(404)
        .json({ error: 'Invalid id' });
    }
    const record = recordModel.findOne(parseInt(req.params.id, 10));
    if (!record) {
      return res.status(401).send({
        message: 'record not found',
      });
    }
    return res.status(200).send(record);
  },

  update(req, res) {
    const record = recordModel.findOne(parseInt(req.params.id, 10));
    if (!record) {
      return res.status(401).send({
        message: 'record not found',
      });
    }
    const { error, value } = Joi.validate(req.body, incidentSchema);

    if (error) {
      return res.status(400)
        .json({ error: error.details[0].message });
    }
    recordModel.update(parseInt(req.params.id, 10), value);
    return res.status(200).send({ message: 'update successful' });
  },

  updateComment(req, res) {
    const record = recordModel.findOne(parseInt(req.params.id, 10));
    if (!record) {
      return res.status(401).send({
        message: 'record not found',
      });
    }
    const { error, value } = Joi.validate(req.body, commentSchema);

    if (error) {
      return res.status(400)
        .json({ error: error.details[0].message });
    }
    recordModel.update(parseInt(req.params.id, 10), value);
    return res.status(200).send({ message: 'updated comment successfully' });
  },

  updateLocation(req, res) {
    const record = recordModel.findOne(parseInt(req.params.id, 10));
    if (!record) {
      return res.status(401).send({
        message: 'record not found',
      });
    }
    const { error, value } = Joi.validate(req.body, locationSchema);

    if (error) {
      return res.status(400)
        .json({ error: error.details[0].message });
    }
    recordModel.update(parseInt(req.params.id, 10), value);
    return res.status(200).send({ message: 'updated location successfully' });
  },

  delete(req, res) {
    const record = recordModel.findOne(parseInt(req.params.id, 10));
    if (!record) {
      return res.status(401).send({
        message: 'record not found',
      });
    }
    recordModel.delete(req.params.id);
    return res.status(200).send({ message: 'record deleted' });
  },
};

export default redFlagController;
