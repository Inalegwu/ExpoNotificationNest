import { Injectable } from '@nestjs/common';
import { createTokenDTO, notificationDTO } from 'src/DTO';
import { PrismaService } from 'src/prisma.service';
import { Message, Status } from 'src/utils/types';
import { Expo } from 'expo-server-sdk';

@Injectable()
export class NotificationsService {
  constructor(private readonly Prisma: PrismaService) {}

  async addTokenToDatabase(createTokenInfo: createTokenDTO): Promise<Message> {
    try {
      await this.Prisma.user.create({
        data: {
          notification_token: createTokenInfo.expo_token,
          user_id: createTokenInfo.user_id,
          email: createTokenInfo.user_email,
        },
      });
      return { message: 'Successful', status: Status.SUCCESSFUL };
    } catch (e) {
      return {
        message: 'Failed',
        error: e.message.toString(),
        status: Status.FAILED,
      };
    }
  }
  async sendNotification(notificationInfo: notificationDTO): Promise<Message> {
    try {
      console.log(notificationInfo);
      const expo = new Expo();
      const messages = [];
      const user = await this.Prisma.user.findUnique({
        where: { email: notificationInfo.user_email },
      });
      const db_message = await this.Prisma.notification.create({
        data: {
          body: notificationInfo.body,
          title: notificationInfo.title,
          user_token: user.notification_token,
          user_id: user.id,
        },
      });
      messages.push({
        to: user.notification_token,
        sound: 'default',
        body: db_message.body,
        title: db_message.title,
      });
      await expo.sendPushNotificationsAsync(messages);
      return { message: 'Successful', status: Status.SUCCESSFUL };
    } catch (e) {
      return {
        message: 'Failed',
        error: e.message.toString(),
        status: Status.FAILED,
      };
    }
  }

  async revokeNotificationAccess(user_email: any): Promise<Message> {
    try {
      await this.Prisma.user.delete({ where: { email: user_email } });
      return { message: 'Successful', status: Status.SUCCESSFUL };
    } catch (e) {
      return { message: 'Failed', status: Status.FAILED };
    }
  }
}
