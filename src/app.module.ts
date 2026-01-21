import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { logger } from './logger.middleware';
import { APP_PIPE } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuditLogsModule } from './audit_logs/audit_logs.module';
import { TagsModule } from './tags/tags.module';
import { NotificationsModule } from './notifications/notifications.module';
import { CommentsModule } from './comments/comments.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { TaskModule } from './task/task.module';
import { ProjectsModule } from './projects/projects.module';
import { CommentsModule } from './comments/comments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { TagsModule } from './tags/tags.module';
import { AuditLogsModule } from './audit_logs/audit_logs.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, TaskModule, ProjectsModule, CommentsModule, NotificationsModule, TagsModule, AuditLogsModule, TasksModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(AppController);
  }
}
