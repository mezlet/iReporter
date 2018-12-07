import express from 'express';
import redFlagController from '../controllers/redFlagController';


const router = express.Router();

router.get('/api/v1/red-flag', redFlagController.getAll);
router.get('/api/v1/red-flag/:id', redFlagController.getOne);
router.post('/api/v1/red-flag', redFlagController.createRecord);
router.patch('/api/v1/red-flag/:id', redFlagController.update);
router.patch('/api/v1/red-flag/:id/location', redFlagController.updateLocation);
router.patch('/api/v1/red-flag/:id/comment', redFlagController.updateComment);
router.delete('/api/v1/red-flag/:id', redFlagController.delete);

router.use((req, res) => {
  res.status(404).send({
    status: 404,
    message: 'the response you are lookinf for does not exist',
  });
});

export default router;
