import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { PrismaService } from './prisma/prisma.service';

@Module({ imports: [CommonModule], providers: [PrismaService] })
export class AppModule {}
