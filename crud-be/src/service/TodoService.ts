import { Repository } from "typeorm";
import { Todos } from "../entities/Todo";
import { AppDataSource } from "../data-source";
import { createTodoSchema, updateTodoSchema } from "../utils/Todos";
import { Request, Response } from "express";
import { uploadToCloudinary } from "../utils/Cloudinary";
import { deleteFile } from "../utils/FileHelper";

export default new class PaslonService {
  private readonly TodoRepository: Repository<Todos> = AppDataSource.getRepository(Todos);

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;

      const { error } = createTodoSchema.validate(data);
      if (error) return res.status(400).json({ error: error });

      let image = "https://th.bing.com/th/id/OIP.yRWATHa-qR9c5mJAvpy0hQHaKZ?pid=ImgDet&rs=1"
      if (req.file?.filename) {
        // save to cloudinary
        image = await uploadToCloudinary(req.file);
        // delete file from local server after save to cloudinary
        deleteFile(req.file.path);
      }
      const obj = this.TodoRepository.create({
        name: data.name,
        visi: data.visi,
        image: image
      });

      const todos = this.TodoRepository.save(obj);
      return res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ Error: "error while inserting data" });
    }

  }

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const todos = await this.TodoRepository.find({});
      console.log(todos);
      return res.status(200).json(todos);
    } catch (error) {
      return res.status(500).json({ Error: "error while finding datas" });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id) || id <= 0) return res.status(400).json({ Error: "Invalid id" });

      const todo = await this.TodoRepository.findOneBy({ id: Number(id) });
      if (!todo) return res.status(404).json({ Error: "ID not found!" });

      return res.status(200).json(todo);
    } catch (error) {
      return res.status(500).json({ message: "Something error while findOne" });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const { error } = updateTodoSchema.validate(data);

      if (error) return res.status(400).json({ Error: "Update error" });

      const todo = await this.TodoRepository.findOneBy({ id: Number(id) });
      if (!todo) { return res.status(404).json({ Error: "ID not found" }) };

      let image = "https://th.bing.com/th/id/OIP.yRWATHa-qR9c5mJAvpy0hQHaKZ?pid=ImgDet&rs=1"
      if (req.file?.filename) {
        // save to cloudinary
        image = await uploadToCloudinary(req.file);
        // delete file from local server after save to cloudinary
        deleteFile(req.file.path);
      }
      todo.name = data.name
      todo.visi = data.visi
      todo.image = image
      const result = await this.TodoRepository.save(todo)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ message: "Something error while update todo" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const todo = await this.TodoRepository.findOneBy({ id: Number(id) });
      if (!todo) { return res.status(404).json({ Error: "ID not found!" }) };

      await this.TodoRepository.delete(id);
      return res.status(200).json({ message: "Paslon succesfully deleted" });
    } catch (error) {
      return res.status(500).json({ message: "Something error while delete todo" });
    }
  }
}