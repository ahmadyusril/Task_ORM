import { Request, Response } from "express";
import PartyService from "../service/PartyService"

export default new (class PaslonController {
  create(req: Request, res: Response) {
    PartyService.create(req, res);
  }

  find(req: Request, res: Response) {
    PartyService.find(req, res);
  }

  findById(req: Request, res: Response) {
    PartyService.findById(req, res);
  }

  update(req: Request, res: Response) {
    PartyService.update(req, res);
  }

  delete(req: Request, res: Response) {
    PartyService.delete(req, res);
  }
})();