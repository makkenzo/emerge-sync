import { Request, Response } from 'express';
import DocumentModel from '../models/document.model';

export const getDocument = async (req: Request, res: Response) => {
    try {
        const docId = req.params.id;

        const document = await DocumentModel.findById(docId);

        if (!document) {
            return res.status(404).json({ message: 'Document not found.' });
        }

        return res.status(200).json(document);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to get document' });
    }
};

export const addDocument = async (req: Request, res: Response) => {
    try {
        console.log(`${Date.now()}: ${req.body.file}`);

        const { file, filePath, assignedTo } = req.body;

        // Проверяем, что обязательные поля указаны в теле запроса
        if (!file || !filePath || !assignedTo) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }

        console.log(Date.now());

        // Создаем новый документ на основе модели DocumentModel
        const newDocument = new DocumentModel({
            file,
            filePath,
            assignedTo,
            date: Date.now(),
        });

        // Сохраняем документ в базу данных
        await newDocument.save();

        return res.status(201).json(newDocument);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to add document' });
    }
};
