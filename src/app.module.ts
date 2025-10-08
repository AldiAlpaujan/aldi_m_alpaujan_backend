import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ProductModule } from './product/product.module';

@Module({ imports: [CommonModule, ProductModule] })
export class AppModule {}
