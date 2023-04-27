import { model, Schema, Document } from 'mongoose';
import { nameValidationOptions, aboutValidationOptions, linkValidationOptions } from '../utils/validators';

interface IUser extends Document {
  name: string;
  about: string;
  avatar: string;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, 'name is required'],
    validate: nameValidationOptions,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    required: [true, 'about info is required'],
    validate: aboutValidationOptions,
  },
  avatar: {
    type: String,
    required: [true, 'avatar is required'],
    validate: linkValidationOptions,
  },
});

export default model<IUser>('User', UserSchema);
