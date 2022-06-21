import { FileController } from 'app/controllers';
import { configUpload } from 'config/upload';
import { Router } from 'express';
import multer from 'multer';

// http://${url}:${port}/files
const filesRoutes = Router();

const uploadFile = multer(configUpload.multer);

const fileController = new FileController();

filesRoutes.post('/new', uploadFile.single('image'), fileController.store);

filesRoutes.get('/form', fileController.show);

export { filesRoutes };
