import mongoose, { Schema, model } from 'mongoose';
import { Password } from '../utils/password';

interface UserAttrs {
  email: string;
  password: string;
  role?: string;
}

const userSchema = new Schema<UserAttrs>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
      required: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id, delete ret.__v;
      },
    },
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }

  done();
});

const User = model<UserAttrs>('User', userSchema);

export { User, UserAttrs };
