const { model, Schema } = require("mongoose");

const userImageSchema = new Schema(
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
      select: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Image = model("image", userImageSchema);

module.exports = { Image };
