"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process = require("process");
exports.default = () => ({
    port: process.env.PORT,
    base_url: process.env.BASE_URL,
    client_url: process.env.CLIENT_URL,
    access_secret_key: process.env.ACCESS_SECRET_KEY,
    expires_in: process.env.EXPIRES_IN,
    sender_email: process.env.SENDER_EMAIL,
    sg_api_key: process.env.SG_API_KEY,
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    google_callback_url: process.env.GOOGLE_CALLBACK_URL,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
    cloudinary_name: process.env.CLOUDINARY_NAME,
});
//# sourceMappingURL=index.js.map