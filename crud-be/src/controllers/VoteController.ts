import { Request, Response } from "express";
import VoteService from "../service/VoteService";

export default new (class VoteController {
  findAll(req: Request, res: Response) {
    VoteService.findAll(req, res);
  }
  create(req: Request, res: Response) {
    VoteService.create(req, res);
  }
})();