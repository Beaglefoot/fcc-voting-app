import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  githubID?: string;
}

const UserSchema = new Schema({
  githubID: String
});

const User = model<IUser>('user', UserSchema);

export default User;
