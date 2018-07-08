import { Schema } from 'mongoose';
import isValidIP from '../helpers/isValidIP';

export interface IUserRef {
  ip: string;
  user?: Schema.Types.ObjectId;
}

const UserRefSchema = new Schema(
  {
    ip: {
      type: String,
      validate: {
        validator: isValidIP,
        message: 'Valid IP address should be provided.'
      },
      required: [true, 'IP address is required.']
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  },
  { _id: false }
);

export default UserRefSchema;
