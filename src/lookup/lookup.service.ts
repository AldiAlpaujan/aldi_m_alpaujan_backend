import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { GetProductCategoryLookupRequest } from 'src/model/lookup.model';

@Injectable()
export class LookupService {
  constructor(private readonly prismaService: PrismaService) {}

  async getProductCategories(request: GetProductCategoryLookupRequest) {
    const data = await this.prismaService.productCategory.findMany({
      where: { name: { contains: request.search } },
      skip: (request.page - 1) * request.limit,
      take: request.limit,
    });
    const dataLength = await this.prismaService.productCategory.count({
      where: { name: { contains: request.search } },
    });
    return {
      code: 200,
      data: data,
      meta: {
        page: request.page,
        limit: request.limit,
        total_page: Math.ceil(dataLength / request.limit),
      },
    };
  }
}
