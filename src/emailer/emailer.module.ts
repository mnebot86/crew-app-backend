import { Module } from '@nestjs/common';
import { EmailService } from './emailer.service';

@Module({
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule { }

