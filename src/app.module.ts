import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ProductModule } from './product/product.module';
import { LookupModule } from './lookup/lookup.module';

@Module({ imports: [CommonModule, ProductModule, LookupModule] })
export class AppModule {}
