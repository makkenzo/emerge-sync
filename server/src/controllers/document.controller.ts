import { Request, Response } from 'express';
import DocumentModel from '../models/document.model';
import fs from 'fs';
import xlsx from 'xlsx-populate';

export const getDocument = async (req: Request, res: Response) => {
    try {
        const docId = req.params.id;

        const document = await DocumentModel.findById(docId);

        if (!document) {
            return res.status(404).json({ message: 'Document not found.' });
        }

        if (!document.filePath) {
            return res.status(400).json({ message: 'File path not provided.' });
        }

        const workbook = await xlsx.fromFileAsync(document.filePath);

        const worksheet = workbook.sheet(0);

        const data = worksheet.usedRange().value();

        const headers = data[0];

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
        const documents = await DocumentModel.find();

        if (documents.length === 0) {
            return res.status(404).json({ message: 'No documents found.' });
        }

        return res.status(200).json(documents);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to get documents' });
    }
};

export const updateDocument = async (req: Request, res: Response) => {
    try {
        const docId = req.params.id;
        const updatedData = req.body;

        const document = await DocumentModel.findById(docId);

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        if (!document.filePath) {
            return res.status(400).json({ message: 'File path not provided.' });
        }

        const workbook = await xlsx.fromFileAsync(document.filePath);

        if (!workbook) {
            return res.status(500).json({ message: 'Failed to load the XLSX workbook.' });
        }

        const sheet = workbook.sheet(0);

        const startRow = 2;

        updatedData.forEach((data, index) => {
            Object.keys(data).forEach((key, colIndex) => {
                sheet.cell(startRow + index, colIndex + 1).value(data[key]);
            });
        });
        console.log(updatedData);

        await workbook.toFileAsync(document.filePath);

        return res.status(200).json({ message: 'Document updated successfully.' });
    } catch (error) {
        console.error('An error occurred:', error);
        return res.status(500).json({ message: 'Failed to update document.' });
    }
};

// export const updateDocument = async (req: Request, res: Response) => {
//     try {
//         const docId = req.params.id;
//         const updatedData = req.body; // The updated JSON data

//         const document = await DocumentModel.findById(docId);

//         if (!document) {
//             return res.status(404).json({ message: 'Document not found.' });
//         }

//         // Assuming the filePath field exists in the document object
//         const filePath = document.filePath;

//         // Load the existing XLSX workbook
//         const workbook = new excel.Workbook();
//         await workbook.xlsx.readFile(filePath);

//         // Assuming there's only one worksheet in the workbook
//         const sheet = workbook.getWorksheet(1);

//         if (!sheet) {
//             return res.status(500).json({ message: 'Worksheet not found.' });
//         }

//         // Clear the existing sheet data
//         sheet.eachRow((row, rowNumber) => {
//             if (rowNumber !== 1) {
//                 row.eachCell((cell) => {
//                     cell.value = null;
//                 });
//             }
//         });

//         // Write the updated data to the sheet
//         updatedData.forEach((rowData, rowIndex) => {
//             const row = sheet.getRow(rowIndex + 1);

//             Object.keys(rowData).forEach((key, cellIndex) => {
//                 const cellValue = rowData[key];
//                 row.getCell(cellIndex + 1).value = cellValue;
//             });
//         });

//         // Save the updated workbook back to the original file path
//         await workbook.xlsx.writeFile(filePath);

//         return res.status(200).json({ message: 'Document updated successfully' });
//     } catch (error) {
//         console.error('An error occurred:', error);
//         return res.status(500).json({ message: 'Failed to update document.' });
//     }
// };
