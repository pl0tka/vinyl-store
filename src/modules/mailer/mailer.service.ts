import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { emailInfo } from './constants/emailInfo.js';
import { LoggerService } from '../../logger/logger.service.js';
import { ERROR_MESSAGES } from '../../common/constants/constants.js';

@Injectable()
export class MailerService {
    private transporter;

    constructor(
        private readonly _configService: ConfigService,
        private readonly _loggerService: LoggerService
    ) {
        this.transporter = nodemailer.createTransport({
            host: this._configService.get<string>('NODEMAILER_HOST'),
            port: this._configService.get<number>('NODEMAILER_PORT'),
            secure: this._configService.get<boolean>('NODEMAILER_SECURE'),
            auth: {
                user: this._configService.get<string>('NODEMAILER_USER'),
                pass: this._configService.get<string>('NODEMAILER_PASS'),
            },
        });
        this._loggerService.setContext(MailerService.name);
    }

    async sendEmail(to: string, subject: string, text: string) {
        const mailOptions = {
            from: `${emailInfo.emailTitle} <${this._configService.get<string>('NODEMAILER_USER')}>`,
            to,
            subject,
            text,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            this._loggerService.log(
                `${ERROR_MESSAGES.EMAIL_SENT}: ${info.response}`
            );
            return info;
        } catch (error) {
            this._loggerService.error(
                `${ERROR_MESSAGES.EMAIL_SENDING_FAILED}: ${error.message}`
            );
        }
    }
}
