import { Request, Response } from 'express';
import DocumentModel from '../models/document.model';
import fs from 'fs';
import xlsx from 'xlsx-populate';
import * as xlsx2 from 'xlsx';

// interface Document {
//     file: string;
//     filePath: string;
//     assignedTo: string;
//     date: Date;
// }

export const getDocument = async (req: Request, res: Response) => {
    try {
        const docId = req.params.id;

        const document = await DocumentModel.findById(docId);

        if (!document) {
            return res.status(404).json({ message: 'Document not found.' });
        }

        // Check if the filePath field exists in the document object
        if (!document.filePath) {
            return res.status(400).json({ message: 'File path not provided.' });
        }

        const workbook = await xlsx.fromFileAsync(document.filePath);

        const worksheet = workbook.sheet(0);
        const data = worksheet.usedRange().value();

        // Assuming the first row in the data contains headers
        const headers = data[0];

        // Map the data into an array of objects
        const jsonData = data.slice(1).map((row) => {
            const rowObject = {};
            row.forEach((cell, index) => {
                rowObject[headers[index]] = cell;
            });
            return rowObject;
        });

        return res.status(200).json(jsonData);
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

export const getAllDocuments = async (req: Request, res: Response) => {
    try {
        // Use Mongoose's find() method to retrieve all documents
        const documents = await DocumentModel.find();

        // Check if there are no documents
        if (documents.length === 0) {
            return res.status(404).json({ message: 'No documents found.' });
        }

        // Return the list of documents as a JSON response
        return res.status(200).json(documents);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to get documents' });
    }
};

export const updateDocument = async (req: Request, res: Response) => {
    try {
        const docId = req.params.id;
        const updatedData = req.body; // The updated JSON data
        // console.log(updatedData);

        const document = await DocumentModel.findById(docId);

        if (!document) {
            return res.status(404).json({ message: 'Document not found.' });
        }

        // Assuming the filePath field exists in the document object
        const filePath = document.filePath;

        // Open the existing XLSX workbook
        const workbook = await xlsx.fromFileAsync(filePath);

        // Get the first sheet in the workbook
        const sheet = workbook.sheet(0);

        // Clear the existing sheet data
        sheet.usedRange().clear();

        // Write the updated data to the sheet
        updatedData.forEach((rowData, rowIndex) => {
            Object.keys(rowData).forEach((key, cellIndex) => {
                const cellValue = rowData[key];
                sheet.cell(rowIndex + 1, cellIndex + 1).value(cellValue);
            });
        });

        // Save the workbook back to the original file path
        await workbook.toFileAsync(filePath);

        return res.status(200).json({ message: 'Document updated successfully' });
    } catch (error) {
        console.error('An error occurred:', error);
        return res.status(500).json({ message: 'Failed to update document.' });
    }
};
