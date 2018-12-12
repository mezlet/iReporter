import uuidv4 from 'uuid/v4';
import db from '../db';
import * as Reply from '../helpers/responses';
import Helper from '../helpers/helper';
import * as Schema from '../helpers/validateSchema';
import Validate from '../helpers/validate';
import * as Query from '../db/queries';

const incidents = {

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
};
export default incidents;
