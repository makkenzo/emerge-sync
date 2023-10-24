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
        const { file, filePath, assignedTo } = req.body;

        if (!file || !filePath || !assignedTo) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }

        // Check if a document with the same filename already exists
        const existingDocument = await DocumentModel.findOne({ file });

        if (existingDocument) {
            return res.status(409).json({ message: 'A document with the same filename already exists.' });
        }

        const newDocument = new DocumentModel({
            file,
            filePath,
            assignedTo,
            date: Date.now(),
        });

        await newDocument.save();

        return res.status(201).json(newDocument);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to add document' });
    }
};
