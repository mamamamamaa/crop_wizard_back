"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = exports.DATABASE_PROVIDE = void 0;
const mongoose = require("mongoose");
exports.DATABASE_PROVIDE = 'DATABASE_CONNECTION';
exports.databaseProviders = [
    {
        provide: exports.DATABASE_PROVIDE,
        useFactory: async () => await mongoose.connect(process.env.DB),
    },
];
//# sourceMappingURL=database.providers.js.map