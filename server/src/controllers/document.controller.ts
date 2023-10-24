import { Request, Response } from 'express';
import DocumentModel from '../models/document.model';
import fs from 'fs';
import path from 'path';

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

        const existingDocument = await DocumentModel.findOne({ file });

        if (existingDocument) {
            return res.status(400).json({ message: 'Документ с таким именем файла уже существует.' });
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

export const deleteDocument = async (req: Request, res: Response) => {
    try {
        const docId = req.params.id;
        const document = await DocumentModel.findById(docId);

        if (!document) {
            return res.status(404).json({ message: 'Document not found.' });
        }

        const filePath = document.filePath;

        // Wrap the fs.unlink operation in a Promise
        const unlinkFile = () =>
            new Promise<void>((resolve, reject) => {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Failed to delete the local file:', err);
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });

        try {
            await DocumentModel.deleteOne({ _id: docId }).exec();
        } catch (err) {
            console.error('Failed to delete the document:', err);
            return res.status(500).json({ message: 'Failed to delete the document.' });
        }

        await Promise.all([unlinkFile()]);

        return res.status(204).json({ message: 'File deleted successfully.' });
    } catch (error) {
        console.error('An error occurred:', error);
        return res.status(500).json({ message: 'Failed to delete document.' });
    }
};
