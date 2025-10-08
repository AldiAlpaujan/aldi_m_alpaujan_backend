import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from 'generated/prisma';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

type logLevel = 'debug' | 'info' | 'warn' | 'error';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, string>
  implements OnModuleInit
{
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    super({
      log: [
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'query',
        },
      ],
    });
  }

  logObjectData = (data: any, level: logLevel) => {
    for (const key in data) {
      const content = `${key} : ${JSON.stringify(data[key])}`;
      switch (level) {
        case 'debug':
          this.logger.debug(content);
          break;
        case 'info':
          this.logger.info(content);
          break;
        case 'warn':
          this.logger.warn(content);
          break;
        case 'error':
          this.logger.error(content);
          break;
      }
    }
  };

  onModuleInit() {
    this.$on('query', (e) => {
      this.logger.info('========');
      this.logger.info('QUERY LOG');
      this.logger.info('========');
      this.logObjectData(e, 'info');
    });
    this.$on('error', (e) => {
      this.logger.error('========');
      this.logger.error('ERROR LOG');
      this.logger.error('========');
      this.logObjectData(e, 'error');
    });
    this.$on('info', (e) => {
      this.logger.info('========');
      this.logger.info('INFO LOG');
      this.logger.info('========');
      this.logObjectData(e, 'info');
    });
    this.$on('warn', (e) => {
      this.logger.warn('========');
      this.logger.warn('WARN LOG');
      this.logger.warn('========');
      this.logObjectData(e, 'warn');
    });
  }
}
