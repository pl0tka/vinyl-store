import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'mafalda.friesen@ethereal.email',
                pass: '7NudKq8KRSpxK743At',
            },
        });
    }

    async sendMail(to: string, subject: string, text: string): Promise<void> {
        const mailOptions = {
            from: 'mafalda.friesen@ethereal.email',
            to,
            subject,
            text,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Message sent: ', info.messageId);
            return info;
        } catch (err) {
            console.log('Error sending email: ', err.message, err);

            throw new Error(err.message);
        }
    }
}
