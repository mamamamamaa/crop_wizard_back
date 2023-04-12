"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleStrategy = void 0;
const bcrypt = require("bcrypt");
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const user_service_1 = require("../../user/user.service");
const mongoose_1 = require("mongoose");
let GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    constructor(configService, userService) {
        super({
            clientID: configService.get('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
            callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
            scope: ['email', 'profile'],
            passReqToCallback: true,
        });
        this.configService = configService;
        this.userService = userService;
    }
    async validate(req, accessToken, refreshToken, profile, done) {
        try {
            const { emails, displayName } = profile;
            const { value: email } = emails[0];
            const user = await this.userService.findUser({ email });
            if (user) {
                return done(null, user);
            }
            const tempPassword = String(new mongoose_1.Types.ObjectId());
            const hashPassword = await bcrypt.hash(tempPassword, 10);
            const newUser = await this.userService.createUser({
                email,
                username: displayName,
                password: hashPassword,
                verificationToken: null,
                verify: true,
            });
            done(null, newUser);
        }
        catch (error) {
            done(error);
        }
    }
};
GoogleStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        user_service_1.UserService])
], GoogleStrategy);
exports.GoogleStrategy = GoogleStrategy;
//# sourceMappingURL=google.strategy.js.map