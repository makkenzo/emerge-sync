import mongoose, { Document, Schema } from 'mongoose';

export interface UserDocument extends Document {
    username: string;
    password: string;
    role: string;
    details: {
        firstName: string;
        lastName: string;
        phoneNumber: string;
        email: string;
        location: string;
        profilePic: string;
        gender: string;
        socialMedia: {
            LinkedIn: string;
            Instagram: string;
            Telegram: string;
            X: string;
        };
    };
}

const userSchema = new Schema<UserDocument>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    details: {
        firstName: { type: String },
        lastName: { type: String },
        phoneNumber: { type: String },
        email: { type: String },
        location: { type: String },
        profilePic: { type: String },
        gender: { type: String },
        socialMedia: {
            LinkedIn: { type: String },
            Instagram: { type: String },
            Telegram: { type: String },
            X: { type: String },
        },
    },
});

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
