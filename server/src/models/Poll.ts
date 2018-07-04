import { Schema, model, Document } from 'mongoose';
import AuthorSchema, { IAuthor } from './Author';
import OptionSchema, { IOption } from './Option';

export interface IPoll extends Document {
  title: string;
  options: IOption[];
  author: IAuthor;
}

const PollSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required.'],
    minlength: [3, 'Title should be at least 3 symbols long.']
  },

  options: {
    type: [OptionSchema],
    validate: {
      validator: (options: IOption[]): boolean => options.length >= 2,
      message: 'At least 2 options should be provided.'
    }
  },

  author: {
    type: AuthorSchema,
    required: [true, 'Author is required.']
  }
});

const Poll = model<IPoll>('poll', PollSchema);

export default Poll;
