
import jwt from 'jsonwebtoken';
import db from '../db';
import Helper from '../helpers/helper';
import * as Reply from '../helpers/responses';

const Auth = {

  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).send({ message: 'Token is not provided' });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(text, [decoded.userId]);
      if (!rows[0]) {
        return res.status(400).send({ message: 'The token you provided is invalid' });
      }
      req.user = { id: decoded.userId };
      return next();
    } catch (error) {
      return res.status(401).send(error);
    }
  },

  async isAdmin(req, res, next) {
    const userData = Helper.decodeToken(req.headers['x-access-token']);
    const query = 'SELECT * FROM users WHERE id = $1';
    const { rows } = await db.query(query, [userData.userId]);
    return rows[0] && rows[0].isadmin === 'true' ? next()
      : Reply.unauthorizedError(res, 'you are not an administrator');
  },

};

export default Auth;
