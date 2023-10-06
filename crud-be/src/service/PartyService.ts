import { Repository } from "typeorm";
import { Party } from "../entities/Party";
import { AppDataSource } from "../data-source";
import { createPartySchema } from "../utils/Party";
import { Request, Response } from "express";

export default new class PartyService {
    private readonly PartyRepository: Repository<Party> =
        AppDataSource.getRepository(Party);

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body;

            const { error } = createPartySchema.validate(data);
            if (error) return res.status(400).json({ error: error });

            const newParty = await this.PartyRepository.create({
                partyName: data.partyName
            });

            return res.status(200).json(newParty);
        }   catch (err) {
            return res.status(500).json({ Error: "error while inserting party" });
        }
    }

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const parties = await this.PartyRepository.find({});
            console.log(parties);
            return res.status(200).json(parties);
        }   catch (error) {
            console.log(error)
            return res.status(500).json({ Error: "error while finding parties" });
        }
    }

    async findById(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            if (isNaN(id) || id <= 0) return res.status(400).json({ Error: "Invalid id" });

            const partyDetail = await this.PartyRepository.findOneBy({ id: Number(id) });
            if (!partyDetail) return res.status(404).json({ Error: "Party not found!" });

            return res.status(200).json(partyDetail);
        }   catch (error) {
            return res.status(500).json({ message: "Something error while find party" });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            const data = req.body;
            const { error } = createPartySchema.validate(data);

            if (error) return res.status(400).json({ Error: "Update error" });

            const partyDetail = await this.PartyRepository.findOneBy({ id: Number(id) });
            if (!partyDetail) { return res.status(404).json({ Error: "Party not found" }) };

 
            const editedParty = await this.PartyRepository.query(
                `UPDATE "party" SET name=$1, "updatedAt"=$2 WHERE id=$3 RETURNING id, partyName, "createdAt" as created_at, "updatedAt" as updated_at`,
                [data.partyName, new Date(), id]
              );

            const result = await this.PartyRepository.save(editedParty)
            return res.status(200).json(result)
        }   catch (error) {
            return res.status(500).json({ message: "Something error while update party" });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            const partyDetail = await this.PartyRepository.findOneBy({ id: Number(id) });
            if (!partyDetail) { return res.status(404).json({ Error: "Party not found!" }) };

            await this.PartyRepository.delete(id);
            return res.status(200).json({ message: "Party has been succesfully deleted" });
        }   catch (error) {
            return res.status(500).json({ message: "Something error while delete party" });
        }
    }
}