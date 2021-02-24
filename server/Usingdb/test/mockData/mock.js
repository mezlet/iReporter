import { isUndefined } from 'util';
import faker from 'faker';

export const endpoints = {
  login: '/api/v1/auth/login',
  signup: '/api/v1/auth/signup',
};

export const exampleUser1 = {
  firstname: 'Leticia',
  lastname: 'Esiagu',
  othernames: 'Dada',
  email: 'esiaguleticia@gmail.com',
  phonenumber: '5467897543',
  username: 'leticia',
  password: 'mypassword',
};

export const exampleUser2 = {
  firstname: 'James',
  lastname: 'Michael',
  othernames: 'Jesus',
  email: 'esiaguleticia@gmail.com',
  phonenumber: '5467897543',
  username: 'leticia',
  password: 'strongpassword',
};

export const exampleUser3 = {
  firstname: 'James',
  lastname: 'Michael',
  othernames: 'Jesus',
  email: 'james.jesus@gmail.com',
  phonenumber: '5467897543',
  username: 'james.jesus',
  password: 'strongpassword',
};

export const login1 = {
  email: 'esiaguleticia@gmail.com',
  password: 'mypassword',
};
export const invalidlogin1 = {
  email: undefined,
  password: undefined,
};
export const wrongpassword = {
  email: 'esiaguleticia@gmail.com',
  password: '1234',
};
export const wrongemail = {
  email: 'leticia@gmail.com',
  password: 'mypassword',
};

export const exampleRedFlag = {
  type: 'red-flag',
  location: '8.33, 42.44',
  image: 'incident1.png',
  video: 'incident1.mp4',
  comment: 'I slept off, again',
};

export const invaliduser = {
  firstname: undefined,
  lastname: undefined,
  othernames: undefined,
  email: undefined,
  phonenumber: undefined,
  username: undefined,
  password: undefined,
};
export const Admin = {
  firstname: 'James',
  lastname: 'Michael',
  othernames: 'Jesus',
  email: 'james.jesus@gmail.com',
  phonenumber: '5467897543',
  username: 'james.jesus',
  password: 'strongpassword',
  isAdmin: true,
};
