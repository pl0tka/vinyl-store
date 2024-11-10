import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service.js';
import { MailerController } from './mailer.controller.js';

@Module({
    controllers: [MailerController],
    providers: [MailerService],
    exports: [MailerService],
})
export class MailerModule {}
