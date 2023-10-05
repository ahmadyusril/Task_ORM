import * as express from 'express';
import TodoController from '../controllers/PaslonController';
import UploadImage from '../middlewares/UploadImage';

const PaslonRoute = express.Router();
PaslonRoute.post('/paslons', UploadImage.single("image"), TodoController.create);
PaslonRoute.get('/paslons', TodoController.find);
PaslonRoute.patch("/paslon/:id", UploadImage.single("image"), TodoController.update);
PaslonRoute.get("/paslon/:id", TodoController.findById);
PaslonRoute.delete("/paslon/:id", TodoController.delete);

export default PaslonRoute;