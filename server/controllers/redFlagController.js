import recordModel from '../model/redFlagModel';

const redFlagController = {

  createRecord(req, res) {
    if (!req.body.createdby || !req.body.comment || !req.body.location) {
      return res.status(400).send({
        message: 'All fields are required',
      });
    }
    const createdrecord = recordModel.createRecord(req.body);
    return res.status(201).send(createdrecord);
  },

  getAll(req, res) {
    const record = recordModel.findAll();
    return res.status(201).send(record);
  },

  getOne(req, res) {
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
    recordModel.update(parseInt(req.params.id, 10), req.body);
    return res.status(200).send({ message: 'update successful' });
  },

  updateComment(req, res) {
    const record = recordModel.findOne(parseInt(req.params.id, 10));
    if (!record) {
      return res.status(401).send({
        message: 'record not found',
      });
    }
    recordModel.update(parseInt(req.params.id, 10), req.body);
    return res.status(200).send({ message: 'updated comment successfully' });
  },

  updateLocation(req, res) {
    const record = recordModel.findOne(parseInt(req.params.id, 10));
    if (!record) {
      return res.status(401).send({
        message: 'record not found',
      });
    }
    recordModel.update(parseInt(req.params.id, 10), req.body);
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
