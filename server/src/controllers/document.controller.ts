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
