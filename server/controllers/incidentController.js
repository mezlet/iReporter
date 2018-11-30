/* eslint-disable class-methods-use-this */
import db from '../db/db';

class IncidentController {
  getAllIncidents(req, res) {
    return res.status(200).send({
      status: 200,
      data: db[0].incidents,
    });
  }

  getAllRedFlags(req, res) {
    const redflags = [];
    db[0].incidents.forEach((incident) => {
      if (incident.type === 'red-flag') {
        redflags.push(incident);
      }
    });

    return res.status(200).send({
      status: 200,
      data: redflags,
    });
  }

  createRedFlag(req, res) {
    if (!req.body.createdBy || !req.body.type || !req.body.location || !req.body.comment) {
      res.send({
        status: 404,
        message: 'all fields are required',
      });
    }
    const redflag = {
      id: db[0].incidents.length + 1,
      createdOn: new Date(),
      createdBy: req.body.user_id,
      type: req.body.type,
      location: req.body.location,
      status: 'pending',
      comment: req.body.comment,
    };
    db[0].incidents.push(redflag);
    res.status(200).send({
      status: 200,
      message: 'created red-flag record',
      redflag,
    });
  }

  getRedFlag(req, res) {
    const id = parseInt(req.params.id, 10);
    const incident = db[0].incidents;
    const result = [];

    for (let i = 0; i < incident.length; i += 1) {
      if (incident[i].id === id) {
        result.push(incident[i]);
        break;
      }
    }
    if (result) {
      res.status(200).send({
        status: 200,
        data: result,
      });
    } else {
      res.send({
        status: 404,
        message: 'sorry id does not exist',
      });
    }
  }

  editLocation(req, res) {
    const id = parseInt(req.params.id, 10);
    const incident = db[0].incidents;
    if (!req.body.location) {
      res.send({
        message: 'location field is required',
      });
    }
    for (let i = 0; i < incident.length; i += 1) {
      if (incident[i].id === id) {
        const record = incident[i];
        const newLocation = req.body.location;
        record.location = newLocation;
        res.send({
          status: 200,
          data: [
            {
              id: record.id,
              message: "updated red-flag record's location",
            },
          ],
        });
      }
    }
    res.send({
      status: 404,
      message: 'can"t find id',
    });
  }

  editComment(req, res) {
    const id = parseInt(req.params.id, 10);
    const incident = db[0].incidents;
    if (!req.body.comment) {
      res.send({
        message: 'comment field is required',
      });
    }
    for (let i = 0; i < incident.length; i += 1) {
      if (incident[i].id === id) {
        const record = incident[i];
        const newComment = req.body.comment;
        record.comment = newComment;
        res.send({
          status: 200,
          data: [
            {
              id: record.id,
              message: "updated red-flag record's comment",
            },
          ],
          record: incident,
        });
      }
    }
    res.send({
      status: 404,
      message: 'can"t find id',
    });
  }

  deleteIncident(req, res) {
    const id = parseInt(req.params.id, 10);
    const incident = db[0].incidents;
    for (let i = 0; i < incident.length; i += 1) {
      if (incident[i].id === id) {
        const record = incident[i];
        const index = i;
        incident.splice(index, 1);
        res.send({
          status: 200,
          data: [
            {
              id: record.id,
              message: 'red-flag record has been deleted',
            },
          ],
          record: incident,
        });
      }
    }
    res.send({
      status: 404,
      message: 'can"t find id',
    });
  }
}

const incidentControllers = new IncidentController();
export default incidentControllers;
