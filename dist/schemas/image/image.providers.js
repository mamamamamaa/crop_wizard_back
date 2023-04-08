"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageProviders = exports.IMAGE_PROVIDE = void 0;
const image_schema_1 = require("./image.schema");
const database_providers_1 = require("../../database/database.providers");
exports.IMAGE_PROVIDE = 'IMAGE_MODEL';
exports.imageProviders = [
    {
        provide: exports.IMAGE_PROVIDE,
        useFactory: (connection) => connection.model('image', image_schema_1.ImageSchema),
        inject: [database_providers_1.DATABASE_PROVIDE],
    },
];
//# sourceMappingURL=image.providers.js.map