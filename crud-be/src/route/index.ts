import * as express from 'express';
import TodoController from '../controllers/TodoController';
import UploadImage from '../middlewares/UploadImage';

const router = express.Router();
router.post('/paslons', UploadImage.single("image"), TodoController.create);
router.get('/paslons', TodoController.find);
router.patch("/paslon/:id", UploadImage.single("image"), TodoController.update);
router.get("/paslon/:id", TodoController.findById);
router.delete("/paslon/:id", TodoController.delete);

export default router;