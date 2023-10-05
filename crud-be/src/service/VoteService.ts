import { Request, Response } from "express";
import { Repository } from "typeorm";
import { Votes } from "../entities/Vote";
import { Paslons } from "../entities/Paslon";
import { AppDataSource } from "../data-source";
import { createVoteSchema } from "../utils/Vote";

class VoteService {
    private readonly VoteRepository: Repository<Votes> =
        AppDataSource.getRepository(Votes);
    private readonly PaslonRepository: Repository<Paslons> =
        AppDataSource.getRepository(Paslons);

    async findAll(req: Request, res: Response) {
        try {
            const votes = await this.VoteRepository.find({
                relations: ["paslon"],
            });

            return res.status(200).json({
                code: 200,
                data: votes,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                code: 500,
                error: "Internal Server Error",
            });
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body;

            // validasi
            const { error } = createVoteSchema.validate(data);
            if (error) return res.status(400).json({ code: 400, error });

            const newVote = await this.VoteRepository.query(
                `INSERT INTO votes("voterName", "paslonId") VALUES($1, $2) RETURNING id, "voterName"`,
                [data.voterName, data.paslonId]
            );

            const paslonRelatedToVote = await this.PaslonRepository.findOneBy({
                id: data.paslonId,
            });

            return res.status(201).json({
                code: 201,
                data: {
                    ...newVote[0],
                    paslon: paslonRelatedToVote,
                },
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                code: 500,
                error: "Internal Server Error",
            });
        }
    }
}

export default new VoteService();
