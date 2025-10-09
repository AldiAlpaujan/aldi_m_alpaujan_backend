import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import type {
  CreateProductDto,
  DeleteProductDto,
  GetProductRequest,
  UpdateProductDto,
} from 'src/model/product.model';

@Controller('/api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @HttpCode(200)
  async get(
    @Query('search') search: string,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    const request: GetProductRequest = {
      search: search,
      page: page ?? 1,
      limit: limit ?? 10,
    };
    const result = await this.productService.get(request);
    return result;
  }

  @Post()
  @HttpCode(200)
  async create(@Body() createDTO: CreateProductDto) {
    const result = await this.productService.create(createDTO);
    return result;
  }

  @Put()
  @HttpCode(200)
  update(@Body() updateDTO: UpdateProductDto) {
    const result = this.productService.update(updateDTO);
    return result;
  }

  @Delete()
  @HttpCode(200)
  delete(@Body() ids: DeleteProductDto) {
    const result = this.productService.delete(ids);
    return result;
  }
}
