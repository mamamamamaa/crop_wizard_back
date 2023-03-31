const { model, Schema } = require("mongoose");

const userImageSchema = new Schema(
  {
    imageURL: {
      type: String,
      require: true,
      unique: true,
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
