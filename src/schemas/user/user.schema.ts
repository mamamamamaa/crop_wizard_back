import * as mongoose from 'mongoose';
import { emailRegex } from '../../helpers/regex';

export const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minlength: 3,
      maxLength: 20,
    },
    email: {
      type: String,
      matches: emailRegex,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: 8,
    },
    accessToken: {
      type: String,
      default: null,
    },
    verificationToken: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
