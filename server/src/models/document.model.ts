import mongoose, { Document, Schema } from 'mongoose';

export interface DocumentDocument extends Document {
    file: string;
    data: Buffer;
    assignedTo: string;
    date: Date;
}

const documentSchema = new Schema<DocumentDocument>({
    file: { type: String, required: true, unique: true },
    data: { type: Buffer, required: true },
    assignedTo: { type: String, required: true },
    date: { type: Date },
});

const DocumentModel = mongoose.model<DocumentDocument>('Document', documentSchema);

export default DocumentModel;
