import { configUpload } from 'config/upload';
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

class FileController {
  public async store(req: Request, res: Response): Promise<Response> {
    const { filename } = req.file;

    await fs.promises.rename(
      path.resolve(configUpload.tmpFolder, filename),
      path.resolve(configUpload.uploadsFolder, filename),
    );

    return res
      .status(200)
      .json({ image: `${process.env.URL_IMAGE}/image/${filename}` });
  }

  public async show(req: Request, res: Response) {
    const form = path.join(__dirname, '..', '..', '..', 'public', 'index.html');

    res.sendFile(form);
  }
}

export { FileController };
