import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  githubID?: string;
  polls: Schema.Types.ObjectId[];
}

const UserSchema = new Schema({
  githubID: String,
  polls: [
    {
      type: Schema.Types.ObjectId,
      ref: 'poll'
    }
  ]
});

const User = model<IUser>('user', UserSchema);

export default User;
