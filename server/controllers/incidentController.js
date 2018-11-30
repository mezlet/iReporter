/* eslint-disable class-methods-use-this */
import db from '../db/db';

class IncidentController {
  getAllIncidents(req, res) {
    return res.status(200).send({
      status: 200,
      data: db[0].incidents,
    });
  }
}

const incidentControllers = new IncidentController();
export default incidentControllers;
