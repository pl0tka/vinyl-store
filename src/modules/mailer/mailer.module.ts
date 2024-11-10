import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service.js';
import { LoggerModule } from '../../logger/logger.module.js';

@Module({
    imports: [LoggerModule],
    providers: [MailerService],
    exports: [MailerService],
})
export class MailerModule {}
