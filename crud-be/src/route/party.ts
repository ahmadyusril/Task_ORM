import * as express from "express";
import PartyController from "../controllers/PartyController"

const PartyRoute = express.Router();
PartyRoute.post('/party', PartyController.create);
PartyRoute.get('/parties', PartyController.find);
PartyRoute.patch("/party/:id", PartyController.update);
PartyRoute.get("/party/:id", PartyController.findById);
PartyRoute.delete("/party/:id", PartyController.delete);

export default PartyRoute;