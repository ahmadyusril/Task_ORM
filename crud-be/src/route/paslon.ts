import * as express from 'express';
import PaslonController from '../controllers/PaslonController';
import UploadImage from '../middlewares/UploadImage';

const PaslonRoute = express.Router();
PaslonRoute.post('/paslons', UploadImage.single("image"), PaslonController.create);
PaslonRoute.get('/paslons', PaslonController.find);
PaslonRoute.patch("/paslon/:id", UploadImage.single("image"), PaslonController.update);
PaslonRoute.get("/paslon/:id", PaslonController.findById);
PaslonRoute.delete("/paslon/:id", PaslonController.delete);

export default PaslonRoute;