import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { createTokenDTO, notificationDTO } from 'src/DTO';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly NotificationService: NotificationsService) {}

  @Post('/create_user_token')
  async addExpoTokenToDatabase(@Body() createInfo: createTokenDTO) {
    return this.NotificationService.addTokenToDatabase(createInfo);
  }

  @Post('/send_notification')
  async sendNotification(@Body() notificationInfo: notificationDTO) {
    return this.NotificationService.sendNotification(notificationInfo);
  }

  @Patch('/revoke_notification_access/:user_email')
  async revokeNotificationAccess(@Param() user_email: any) {
    return this.NotificationService.revokeNotificationAccess(user_email);
  }
}
