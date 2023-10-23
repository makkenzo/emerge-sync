import mongoose, { Document, Schema } from 'mongoose';

export interface DocumentDocument extends Document {
    file: string;
    filePath: string;
    assignedTo: string;
    date: Date;
}

const documentSchema = new Schema<DocumentDocument>({
    file: { type: String, required: true, unique: true },
    filePath: { type: String, required: true, unique: true },
    assignedTo: { type: String, required: true },
    date: { type: Date },
});

const DocumentModel = mongoose.model<DocumentDocument>('Document', documentSchema);

export default DocumentModel;
