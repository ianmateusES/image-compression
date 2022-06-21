import 'dotenv/config';
import { configUpload } from 'config/upload';
import cors from 'cors';
import express from 'express';
import { routes } from 'routes';

const app = express();

app.use(express.json());

app.use('/image', express.static(`${configUpload.uploadsFolder}`));

app.use(cors());

app.use(routes);

export { app };
