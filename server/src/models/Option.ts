import { Schema } from 'mongoose';

export interface IOption {
  name: string;
  votes: number;
}

const OptionSchema = new Schema({
  name: String,
  votes: { type: Number, default: 0 }
});

export default OptionSchema;
