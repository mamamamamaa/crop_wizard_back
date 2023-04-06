import * as mongoose from 'mongoose';

export const ImageSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
      unique: true,
    },
    publicId: {
      type: String,
      require: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
