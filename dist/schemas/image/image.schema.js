"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageSchema = void 0;
const mongoose = require("mongoose");
exports.ImageSchema = new mongoose.Schema({
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
}, {
    versionKey: false,
    timestamps: true,
});
//# sourceMappingURL=image.schema.js.map