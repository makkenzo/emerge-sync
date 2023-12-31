import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRouter from './routes/user.routes';
import documentRouter from './routes/document.routes';

import multer from 'multer';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const mongodbUri = process.env.MONGODB_URI || '';
mongoose.connect(mongodbUri);

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/documents', documentRouter);

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, 'uploads'));
    },
    filename: function (req, file, callback) {
        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
        callback(null, file.originalname);
    },
});

// Set storage options:
const upload = multer({ storage: storage });

app.post('/upload-file', upload.array('files'), (req, res) => {
    res.json(req.files);
});

app.get('/export-document/:filePath', (req, res) => {
    const filePath = req.params.filePath;

    // Определяем полный путь к файлу
    const fileFullPath = path.join(__dirname, 'uploads', filePath);

    // Проверяем, существует ли файл
    if (fs.existsSync(fileFullPath)) {
        // Отправляем файл как ответ
        res.download(fileFullPath);
    } else {
        res.status(404).send('Файл не найден');
    }
});

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

app.listen(port, () => {
    `Server is running on port ${port}`;
});
