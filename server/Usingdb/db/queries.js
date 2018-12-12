export const createRecord = `INSERT INTO incident (id, createdby, type, location, image, video, comment )
      VALUES($1, $2, $3, $4, $5, $6, $7) returning *`;

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
users(firstname,lastname,othernames,email,phonenumber,username, password)
VALUES($1, $2, $3, $4, $5,$6, $7)
returning *`;
