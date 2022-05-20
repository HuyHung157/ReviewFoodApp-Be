import { Module } from '@nestjs/common';
import {
  WinstonModule as BaseWinstonModule,
  WinstonModuleOptions,
} from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

@Module({
  imports: [
    BaseWinstonModule.forRootAsync({
      imports: [],
      useFactory: async () => {
        const transports = false
          ? [
              new winston.transports.DailyRotateFile({
                filename: process.env.WINSTON_LOG_ERROR_FILE_NAME || 'error-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                maxSize: '20m',
                level: 'error',
              }),
              new winston.transports.DailyRotateFile({
                filename: process.env.WINSTON_LOG_FILE_NAME || 'application-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                maxSize: '20m',
              }),
            ]
          : [
              new winston.transports.Console({
                format: winston.format.simple(),
              }),
            ];
        const options: WinstonModuleOptions = {
          level: 'info',
          format: winston.format.json(),
          transports,
        };
        return options;
      },
    }),
  ],
})
export class WinstonModule {}
