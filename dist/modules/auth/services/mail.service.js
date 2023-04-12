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
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const SendGrid = require("@sendgrid/mail");
const mongoose_1 = require("mongoose");
let MailService = class MailService {
    constructor(configService) {
        this.configService = configService;
        SendGrid.setApiKey(this.configService.get('SG_API_KEY'));
    }
    async send(email) {
        try {
            const senderEmail = this.configService.get('SENDER_EMAIL');
            const baseUrl = this.configService.get('BASE_URL');
            const verificationToken = String(new mongoose_1.Types.ObjectId());
            const verifyMessage = {
                to: email,
                from: senderEmail,
                subject: 'Verification code',
                text: 'To verify your account you should click on link bellow',
                html: `<a target="_blank" href="${baseUrl}/api/auth/verify/${verificationToken}">Click verify email</a>`,
            };
            await SendGrid.send(verifyMessage);
            return verificationToken;
        }
        catch (_a) {
            throw new common_1.HttpException('Server error', 500);
        }
    }
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map