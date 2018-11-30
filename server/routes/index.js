import express from 'express';
import userController from '../controllers/userController';
import incidentController from '../controllers/incidentController';


const router = express.Router();

router.get('/api/v1/users', userController.getAllUsers);
router.get('/api/v1/incidents', incidentController.getAllIncidents);
router.get('/api/v1/incidents/redflags', incidentController.getAllRedFlags);
router.get('/api/v1/incidents/redflags/:id', incidentController.getRedFlag);
router.post('/api/v1/incidents/create', incidentController.createRedFlag);
router.post('/api/v1/incidents/editlocation/:id', incidentController.editLocation);
router.post('/api/v1/incidents/editcomment/:id', incidentController.editComment);
router.delete('/api/v1/incidents/delete/:id', incidentController.deleteIncident);

router.use((req, res) => {
  res.status(404).send({
    status: 404,
    message: 'the response you are lookinf for does not exist',
  });
});

export default router;
