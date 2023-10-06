import { Repository } from "typeorm";
import { Paslons } from "../entities/Paslon";
import { AppDataSource } from "../data-source";
import { createPaslonSchema, updatePaslonSchema } from "../utils/Paslon";
import { Request, Response } from "express";
import { uploadToCloudinary } from "../utils/Cloudinary";
import { deleteFile } from "../utils/FileHelper";

export default new class PaslonService {
  private readonly PaslonRepository: Repository<Paslons> = AppDataSource.getRepository(Paslons);

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;

      const { error } = createPaslonSchema.validate(data);
      if (error) return res.status(400).json({ error: error });

      let image = "https://th.bing.com/th/id/OIP.yRWATHa-qR9c5mJAvpy0hQHaKZ?pid=ImgDet&rs=1"
      if (req.file?.filename) {
        // save to cloudinary
        image = await uploadToCloudinary(req.file);
        // delete file from local server after save to cloudinary
        deleteFile(req.file.path);
      }
      const obj = this.PaslonRepository.create({
        paslonName: data.paslonName,
        visi: data.visi,
        image: image
      });

      const paslons = this.PaslonRepository.save(obj);
      return res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ Error: "error while inserting data" });
    }

  }

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const paslons = await this.PaslonRepository.find({});
      console.log(paslons);
      return res.status(200).json(paslons);
    } catch (error) {
      return res.status(500).json({ Error: "error while finding datas" });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id) || id <= 0) return res.status(400).json({ Error: "Invalid id" });

      const paslon = await this.PaslonRepository.findOneBy({ id: Number(id) });
      if (!paslon) return res.status(404).json({ Error: "ID not found!" });

      return res.status(200).json(paslon);
    } catch (error) {
      return res.status(500).json({ message: "Something error while findOne" });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const { error } = updatePaslonSchema.validate(data);

      if (error) return res.status(400).json({ Error: "Update error" });

      const paslon = await this.PaslonRepository.findOneBy({ id: Number(id) });
      if (!paslon) { return res.status(404).json({ Error: "ID not found" }) };

      let image = "https://th.bing.com/th/id/OIP.yRWATHa-qR9c5mJAvpy0hQHaKZ?pid=ImgDet&rs=1"
      if (req.file?.filename) {
        // save to cloudinary
        image = await uploadToCloudinary(req.file);
        // delete file from local server after save to cloudinary
        deleteFile(req.file.path);
      }
     paslon.paslonName = data.paslonName
     paslon.visi = data.visi
     paslon.image = image
      const result = await this.PaslonRepository.save(paslon)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ message: "Something error while update paslon" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const paslon = await this.PaslonRepository.findOneBy({ id: Number(id) });
      if (!paslon) { return res.status(404).json({ Error: "ID not found!" }) };

      await this.PaslonRepository.delete(id);
      return res.status(200).json({ message: "Paslon succesfully deleted" });
    } catch (error) {
      return res.status(500).json({ message: "Something error while delete paslon" });
    }
  }
}