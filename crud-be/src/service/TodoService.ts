import { Repository } from "typeorm";
import { Todos } from "../entities/Todo";
import { AppDataSource } from "../data-source";
import { createTodoSchema } from "../utils/Todos";
import { Request, Response } from "express"

export default new class TodosService {
  private readonly TodoRepository: Repository<Todos> = AppDataSource.getRepository(Todos)

  async create(req: Request, res: Response) : Promise<Response> {
    try {
      const data = req.body

      const { error } = createTodoSchema.validate(data)
      if(error) return res.status(400).json({ error: error})

      const obj = this.TodoRepository.create({
        name: data.name,
        visi: data.visi,
        image: data.image
      })

      const todos = this.TodoRepository.save(obj)
      return res.status(200).json(todos)
    } catch (err) {
      return res.status(500).json({ Error: "error while inserting data"})
    }
  }
}