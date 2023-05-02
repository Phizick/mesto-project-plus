import {
  model, Schema, Document, Model,
} from 'mongoose';
import bcrypt from 'bcrypt';
import {
  nameValidationOptions,
  aboutValidationOptions,
  linkValidationOptions,
  emailValidationOptions,
} from '../utils/validators';
import AuthorizationError from '../errors/AuthorizationError';

interface IUser extends Document {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

interface IUserDocument extends Document<IUser> {
}

interface UserModel extends Model<IUser> {
  // eslint-disable-next-line
  findUserByData: (email: string, password: string) => Promise<IUserDocument>;
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
    select: false,
  },
});

UserSchema.static('findUserByData', async function findUserByData(email: string, password: string) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    throw new AuthorizationError('invalid email or password');
  }
  const userValid = await bcrypt.compare(password, user.password);
  if (!userValid) {
    throw new AuthorizationError('invalid email or password');
  }
  return user;
});
export default model<IUser, UserModel>('User', UserSchema);
