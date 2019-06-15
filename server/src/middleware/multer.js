import multer from 'multer';
import Datauri from 'datauri';
import path from 'path';

const storage = multer.memoryStorage();
export const upload = multer({ storage });

const dUri = new Datauri();

export const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
