import { Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service.js';
import { Public } from '../../common/decorators/public.decorator.js';

@Controller('email')
export class MailerController {
    constructor(private readonly _mailerService: MailerService) {}

    @Public()
    @Post()
    async sendEmail() {
        await this._mailerService.sendMail(
            'mafalda.friesen@ethereal.email',
            'Payment Success',
            'Your payment was successful'
        );
    }
}
