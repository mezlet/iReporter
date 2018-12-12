import db from '../db/index';
import Helper from '../helpers/helper';
import * as Reply from '../helpers/responses';
import * as Schema from '../helpers/validateSchema';
import Validate from '../helpers/validate';
import * as Query from '../db/queries';

const User = {

  async create(req, res) {
    return Validate(req.body, Schema.signup)
      .then(async (response) => {
        const hashPassword = Helper.hashPassword(req.body.password);
        const {
          firstname, lastname, othernames, email, phonenumber, username,
        } = response;
        const payload = [firstname, lastname, othernames, email,
          phonenumber, username, hashPassword];
        try {
          const { rows } = await db.query(Query.createUser, payload);
          const token = Helper.generateToken(rows[0].id);
          const data = [{ token, user: rows[0] }];
          return Reply.successResponse(res, data);
        } catch (error) {
          if (error.routine === '_bt_check_unique') {
            return Reply.conflictError(res, 'Email/ Username Already Exist');
          }
          return Reply.serverError(res, error.message);
        }
      })
      .catch((error) => {
        const message = `${error.details[0].context.key} is invalid`;
        return Reply.badrequestError(res, message);
      });
  },
};

export default User;
