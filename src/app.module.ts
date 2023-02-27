import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsModule } from './notifications/notifications.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [NotificationsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
