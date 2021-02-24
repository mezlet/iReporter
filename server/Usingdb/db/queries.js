export const createIncidentTable = `
  CREATE TABLE IF NOT EXISTS incident
    (
        id SERIAL PRIMARY KEY,
        type VARCHAR(255) NOT NULL,
        status VARCHAR(255) NOT NULL DEFAULT 'pending',
        location VARCHAR(255) NOT NULL,
        comment VARCHAR(255),
        image VARCHAR(255) NOT NULL,
        video VARCHAR(255) NOT NULL,
        createdby integer NOT NULL,
        createdon timestamp NOT NULL DEFAULT now()
    );
`;

export const createUserTable = `
  CREATE TABLE IF NOT EXISTS USERS
    (
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(128) NOT NULL,
        lastname VARCHAR(128) NOT NULL,
        othernames VARCHAR(128) NOT NULL,
        email VARCHAR(128) NOT NULL UNIQUE,
        username VARCHAR(128) NOT NULL UNIQUE,
        password VARCHAR(128) NOT NULL,
        phonenumber VARCHAR(128) NOT NULL,
        registered timestamp without time zone DEFAULT now(),
        isadmin boolean NOT NULL DEFAULT false   
    );
`;

export const createRecord = `INSERT INTO incident (createdby, type, location, image, video, comment)
      VALUES($1, $2, $3, $4, $5, $6) returning *`;

export const getRecords = 'SELECT * FROM incident';

export const getRecord = 'SELECT * FROM incident WHERE id = $1';

export const getType = 'SELECT * FROM incident WHERE type = $1';

export const getRecordSelectField = 'SELECT createdby, type, location, image, video, comment FROM incident WHERE id = $1';
export const getRecordSelectComment = 'SELECT createdby, comment FROM incident WHERE id = $1';
export const getRecordSelectLocation = 'SELECT createdby, location FROM incident WHERE id = $1';
export const getRecordSelectStatus = 'SELECT createdby, status FROM incident WHERE id = $1';

export const updateRecord = `UPDATE incident
SET type=$1,location=$2, image=$3, video=$4, comment=$5
WHERE id=$6 returning *`;

export const updateComment = `UPDATE incident
SET comment=$1
WHERE id=$2 returning *`;

export const updateLocation = `UPDATE incident
SET location=$1
WHERE id=$2 returning *`;

export const updateStatus = `UPDATE incident
SET status=$1
WHERE id=$2 returning *`;

export const getUser = 'SELECT * FROM users WHERE id = $1';

export const deleteRecord = 'DELETE FROM incident WHERE id=$1 returning *';

export const createUser = `INSERT INTO
users(firstname, lastname, othernames, email, phonenumber, username, password)
VALUES($1, $2, $3, $4, $5,$6, $7)
returning *`;
