import {
  model, Schema, Document, Types,
} from 'mongoose';
import { linkValidationOptions, nameValidationOptions } from '../utils/validators';

interface ICard extends Document {
  name: string,
  link: string,
  owner: Schema.Types.ObjectId,
  likes: [Types.ObjectId],
  createdAt: Date
}

const CardSchema = new Schema<ICard>({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
    validate: nameValidationOptions,
  },
  link: {
    type: String,
    required: true,
    validate: linkValidationOptions,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [Types.ObjectId],
    default: [],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default model<ICard>('Card', CardSchema);
