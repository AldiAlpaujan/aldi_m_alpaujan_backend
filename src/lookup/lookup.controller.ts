import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { GetProductCategoryLookupRequest } from 'src/model/lookup.model';
import { LookupService } from './lookup.service';

@Controller('/api/lookup')
export class LookupController {
  constructor(private readonly lookupService: LookupService) {}

  @Get('/product-categories')
  async getProductCategories(
    @Query('search') search: string,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    const request: GetProductCategoryLookupRequest = {
      search: search,
      page: page ?? 1,
      limit: limit ?? 10,
    };
    const result = await this.lookupService.getProductCategories(request);
    return result;
  }
}
