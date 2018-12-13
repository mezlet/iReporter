
// src/usingDB/controllers/Helper.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const Helper = {

  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },

  generateToken(id) {
    const token = jwt.sign({
      userId: id,
    },
    process.env.SECRET, { expiresIn: '7d' });
    return token;
  },

  decodeToken(token) {
    try {
      const userData = jwt.verify(token, process.env.SECRET);
      return userData;
    } catch (error) {
      throw Error('Invalid token');
    }
  },


  sendMail(recipient, subject, messageBody) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `"${process.env.EMAIL_SENDER}" <${process.env.EMAIL}>`,
      to: recipient,
      subject,
      text: messageBody,
    };

    return new Promise((resolve, reject) => transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error);
      }
      return resolve(info.response);
    }));
  },
};

export default Helper;
