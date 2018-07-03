import { Schema, model, Document } from 'mongoose';

export interface IPoll extends Document {
  title: string;
  options: Array<{
    name: string;
    votes: number;
  }>;
}

const PollSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required.'],
    minlength: [3, 'Title should be at least 3 symbols long.']
  },
  options: [
    {
      name: String,
      votes: { type: Number, default: 0 }
    }
  ]
});

const Poll = model<IPoll>('poll', PollSchema);

export default Poll;
