import mongoose, { Document, Schema } from 'mongoose';

export interface UserDocument extends Document {
    username: string;
    password: string;
    role: string;
}

const userSchema = new Schema<UserDocument>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
});

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
