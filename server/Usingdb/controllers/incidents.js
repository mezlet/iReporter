import uuidv4 from 'uuid/v4';
import db from '../db';
import * as Reply from '../helpers/responses';
import Helper from '../helpers/helper';
import * as Schema from '../helpers/validateSchema';
import Validate from '../helpers/validate';
import * as Query from '../db/queries';

const Incident = {

  async create(req, res) {
    return Validate(req.body, Schema.record)
      .then(async (response) => {
        const userID = Helper.decodeToken(req.headers['x-access-token']).userId;
        const {
          type, location, image, video, comment,
        } = response;
        const payload = [uuidv4(), userID, type, location, image, video, comment];
        try {
          const { rows } = await db.query(Query.createRecord, payload);
          const data = [{ user: rows[0] }];
          return Reply.successResponse(res, data);
        } catch (error) {
          return Reply.serverError(res, error.message);
        }
      })
      .catch((error) => {
        const message = `${error.details[0].context.key} is invalid`;
        return Reply.badrequestError(res, message);
      });
  },

  async getAll(req, res) {
    try {
      const { rows: data } = await db.query(Query.getRecords);
      return data.length ? Reply.successResponse(res, data)
        : Reply.notFoundError(res, 'no records in the db');
    } catch (error) {
      return Reply.serverError(res, error.message);
    }
  },
  async getAll(req, res) {
    try {
      const { rows: data } = await db.query(Query.getRecords);
      return data.length ? Reply.successResponse(res, data)
        : Reply.notFoundError(res, 'no records in the db');
    } catch (error) {
      return Reply.serverError(res, error.message);
    }
  },
  async getRedFlag(req, res) {
    try {
      const { rows: data } = await db.query(Query.getType, ['red-flag']);
      return data.length ? Reply.successResponse(res, data)
        : Reply.notFoundError(res, 'no red-flag record(s) in the db');
    } catch (error) {
      return Reply.serverError(res, error.message);
    }
  },

  async getIntervention(req, res) {
    try {
      const { rows: data } = await db.query(Query.getType, ['intevention']);
      return data.length ? Reply.successResponse(res, data)
        : Reply.notFoundError(res, 'no intervention record(s) in the db');
    } catch (error) {
      return Reply.serverError(res, error.message);
    }
  },

  async getOne(req, res) {
    try {
      const { rows } = await db.query(Query.getRecord, [req.params.id]);
      const data = rows[0];
      return data ? Reply.successResponse(res, data)
        : Reply.notFoundError(res, 'record not found');
    } catch (error) {
      return Reply.serverError(res, error.message);
    }
  },

  async update(req, res) {
    return Validate(req.body, Schema.updateRecord)
      .then(async (response) => {
        const userID = Helper.decodeToken(req.headers['x-access-token']).userId;
        try {
          const { rows } = await db.query(Query.getRecordSelectField, [req.params.id]);
          if (!rows[0]) {
            Reply.notFoundError(res, 'record not found');
          } else if (rows[0] && userID !== rows[0].createdby) {
            return Reply.unauthorizedError(res, 'you are not authorized to edit this entry');
          }
          const newUpdate = { ...rows[0], ...response };
          delete newUpdate.createdby;
          const payload = [...Object.values(newUpdate), req.params.id];
          const queryResponse = await db.query(Query.updateRecord, payload);
          const data = [{ user: queryResponse.rows[0] }];
          return Reply.successResponse(res, data);
        } catch (error) {
          return Reply.serverError(res, error.message);
        }
      })
      .catch((error) => {
        const message = `${error.details[0].context.key} is invalid`;
        return Reply.badrequestError(res, message);
      });
  },

  async updateComment(req, res) {
    return Validate(req.body, Schema.updateComment)
      .then(async (response) => {
        const userID = Helper.decodeToken(req.headers['x-access-token']).userId;
        try {
          const { rows } = await db.query(Query.getRecordSelectComment, [req.params.id]);
          if (!rows[0]) {
            Reply.notFoundError(res, 'record not found');
          } else if (rows[0] && userID !== rows[0].createdby) {
            return Reply.unauthorizedError(res, 'you are not authorized to edit this entry');
          }
          const newUpdate = { ...rows[0], ...response };
          delete newUpdate.createdby;
          const payload = [...Object.values(newUpdate), req.params.id];
          const queryResponse = await db.query(Query.updateComment, payload);
          const data = [{ user: queryResponse.rows[0] }];
          return Reply.successResponse(res, data);
        } catch (error) {
          return Reply.serverError(res, error.message);
        }
      })
      .catch((error) => {
        const message = `${error.details[0].context.key} is invalid`;
        return Reply.badrequestError(res, message);
      });
  },
  async updateStatus(req, res) {
    return Validate(req.body, Schema.updateStatus)
      .then(async (response) => {
        try {
          const { rows } = await db.query(Query.getRecord, [req.params.id]);
          if (!rows[0]) {
            Reply.notFoundError(res, 'record not found');
          }
          const payload = [response.status, req.params.id];
          const queryResponse = await db.query(Query.updateStatus, payload);
          const userId = queryResponse.rows[0].createdby;
          const query2Response = await db.query(Query.getUser, [userId]);
          const userEmail = query2Response.rows[0].email;
          Helper.sendMail(
            userEmail,
            'Update on Your Reported Incident',
            `Your reported incident with id ${req.params.id} has been ${req.body.status}`,
          );
          return res.status(200).json(queryResponse.rows[0]);
        } catch (err) {
          return res.status(400).json(err);
        }
      })
      .catch((error) => {
        const message = `${error.details[0].context.key} is invalid`;
        return Reply.badrequestError(res, message);
      });
  },

  async updateLocation(req, res) {
    return Validate(req.body, Schema.updateLocation)
      .then(async (response) => {
        const userID = Helper.decodeToken(req.headers['x-access-token']).userId;
        try {
          const { rows } = await db.query(Query.getRecordSelectLocation, [req.params.id]);
          if (!rows[0]) {
            Reply.notFoundError(res, 'record not found');
          } else if (rows[0] && userID !== rows[0].createdby) {
            return Reply.unauthorizedError(res, 'you are not authorized to edit this entry');
          }
          const newUpdate = { ...rows[0], ...response };
          delete newUpdate.createdby;
          const payload = [...Object.values(newUpdate), req.params.id];
          const queryResponse = await db.query(Query.updateLocation, payload);
          const data = [{ user: queryResponse.rows[0] }];
          return Reply.successResponse(res, data);
        } catch (error) {
          return Reply.serverError(res, error.message);
        }
      })
      .catch((error) => {
        const message = `${error.details[0].context.key} is invalid`;
        return Reply.badrequestError(res, message);
      });
  },

};
export default Incident;
