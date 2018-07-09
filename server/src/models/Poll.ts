import { Schema, model, Document } from 'mongoose';
import UserRefSchema, { IUserRef } from './UserRef';
import OptionSchema, { IOption } from './Option';
import User from './User';
import isUniqBy from '../helpers/isUniqBy';

export interface IPoll extends Document {
  title: string;
  options: IOption[];
  author: IUserRef;
  voters: IUserRef[];
}

const PollSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required.'],
    minlength: [3, 'Title should be at least 3 symbols long.']
  },

  options: {
    type: [OptionSchema],
    validate: [
      {
        validator: (options: IOption[]): boolean => options.length >= 2,
        msg: 'At least 2 options should be provided.'
      },
      {
        validator: (options: IOption[]): boolean => isUniqBy('name', options),
        msg: 'Options must be unique.'
      }
    ]
  },

  author: {
    type: UserRefSchema,
    required: [true, 'UserRef is required.']
  },

  voters: [UserRefSchema]
});

PollSchema.pre<IPoll>('remove', async function() {
  await User.findByIdAndUpdate(this.author.user, {
    $pull: { polls: this._id }
  });
});

const Poll = model<IPoll>('poll', PollSchema);

export default Poll;
