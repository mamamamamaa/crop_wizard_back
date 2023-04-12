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
exports.AuthService = void 0;
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const mail_service_1 = require("./mail.service");
const user_service_1 = require("../../user/user.service");
let AuthService = class AuthService {
    constructor(userService, mailService, configService, jwtService) {
        this.userService = userService;
        this.mailService = mailService;
        this.configService = configService;
        this.jwtService = jwtService;
        this.jwtOptions = {
            secret: this.configService.get('ACCESS_SECRET_KEY'),
            expiresIn: this.configService.get('EXPIRES_IN'),
        };
        this.clientUrl = this.configService.get('CLIENT_URL');
    }
    async signIn(userData) {
        try {
            const { email, password } = userData;
            const user = await this.userService.findUser({ email }, '+password');
            if (!user) {
                throw new common_1.HttpException('Invalid email or password', common_1.HttpStatus.CONFLICT);
            }
            const comparePassword = await bcrypt.compare(password, user.password);
            if (!comparePassword) {
                throw new common_1.HttpException('Invalid email or password', common_1.HttpStatus.CONFLICT);
            }
            if (!user.verify) {
                return this.reverify(user);
            }
            const payload = { _id: user._id };
            const accessToken = await this.jwtService.signAsync(payload, this.jwtOptions);
            await this.userService.updateUser(user._id, { accessToken });
            return { username: user.username, email, accessToken };
        }
        catch (err) {
            throw new common_1.HttpException('Server error', 500);
        }
    }
    async signUp(userData) {
        try {
            const { email, password } = userData;
            const user = await this.userService.findUser({ email });
            if (user && user.verify) {
                throw new common_1.HttpException('Email in use', common_1.HttpStatus.BAD_REQUEST);
            }
            if (user && !user.verify) {
                return this.reverify(user);
            }
            const hashPassword = await bcrypt.hash(password, 10);
            const verificationToken = await this.mailService.send(email);
            const payloadToRegister = Object.assign(Object.assign({}, userData), { password: hashPassword, verificationToken });
            await this.userService.createUser(payloadToRegister);
            return { message: 'Verify your account by email', email };
        }
        catch (_a) {
            throw new common_1.HttpException('Server error', 500);
        }
    }
    async verify(token, res) {
        try {
            const user = await this.userService.findUser({
                verificationToken: token,
            });
            if (!user) {
                throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
            }
            await this.userService.updateUser(user._id, {
                verify: true,
                verificationToken: null,
            });
            res.redirect(this.clientUrl);
        }
        catch (_a) {
            throw new common_1.HttpException('Server error', 500);
        }
    }
    current({ email, username }) {
        return { email, username };
    }
    async logout({ _id }) {
        try {
            await this.userService.updateUser(_id, { accessToken: null });
        }
        catch (_a) {
            throw new common_1.HttpException('Server error', 500);
        }
    }
    async googleLogin(req, res) {
        const { _id } = req.user;
        const payload = { _id };
        const accessToken = await this.jwtService.signAsync(payload, this.jwtOptions);
        const user = await this.userService.updateUser(_id, { accessToken }, '-verificationToken -verify -updatedAt -createdAt');
        const cookieOptions = {
            httpOnly: true,
            maxAge: 3600000,
        };
        const stringifyUser = JSON.stringify(user);
        res.cookie('user', stringifyUser, cookieOptions);
        res.cookie('accessToken', accessToken, cookieOptions);
        res.redirect(this.clientUrl);
    }
    async reverify({ email, _id }) {
        const verificationToken = await this.mailService.send(email);
        await this.userService.updateUser(_id, { verificationToken });
        return { message: 'Verify your account by email', email };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        mail_service_1.MailService,
        config_1.ConfigService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map