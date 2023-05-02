import { model, Schema, Document } from 'mongoose';
import {
  nameValidationOptions,
  aboutValidationOptions,
  linkValidationOptions,
  emailValidationOptions,
} from '../utils/validators';

interface IUser extends Document {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    validate: nameValidationOptions,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    validate: aboutValidationOptions,
  },
  avatar: {
    type: String,
    validate: linkValidationOptions,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'e-mail is required'],
    validate: emailValidationOptions,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  },
});

export default model<IUser>('User', UserSchema);
