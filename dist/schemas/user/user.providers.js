"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProviders = exports.USER_PROVIDE = void 0;
const user_schema_1 = require("./user.schema");
const database_providers_1 = require("../../database/database.providers");
exports.USER_PROVIDE = 'USER_MODEL';
exports.userProviders = [
    {
        provide: exports.USER_PROVIDE,
        useFactory: (connection) => connection.model('user', user_schema_1.UserSchema),
        inject: [database_providers_1.DATABASE_PROVIDE],
    },
];
//# sourceMappingURL=user.providers.js.map