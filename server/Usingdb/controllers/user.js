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

  async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return Reply.badrequestError(res, 'missing Email/Password');
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return Reply.badrequestError(res, 'Please enter a valid Email');
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return Reply.unauthorizedError(res, 'incorrect email');
      }
      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        return Reply.unauthorizedError(res, 'incorrect password');
      }
      const token = Helper.generateToken(rows[0].id);
      const data = [{ token, user: rows[0] }];
      return Reply.successResponse(res, data);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

export default User;
