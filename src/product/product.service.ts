import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { ProductValidation } from './product.validation';
import {
  CreateProductDto,
  DeleteProductDto,
  GetProductRequest,
  UpdateProductDto,
} from 'src/model/product.model';
import { Product, ProductCategory } from 'generated/prisma';
import { ErrorDetail400 } from 'src/common/error.filter';

@Injectable()
export class ProductService {
  constructor(
    private readonly validationService: ValidationService,
    private readonly prismaService: PrismaService,
  ) {}

  async get(request: GetProductRequest) {
    const data = await this.prismaService.product.findMany({
      where: { product_name: { contains: request.search } },
      skip: (request.page - 1) * request.limit,
      take: request.limit,
    });
    return {
      code: 200,
      data: data,
      meta: {
        total_item: data.length,
        page: request.page,
        limit: request.limit,
        total_page: Math.ceil(data.length / request.limit),
      },
    };
  }

  async getById(id: number) {
    const data = await this.prismaService.product.findFirst({
      where: { id },
      include: { category: true },
    });

    return {
      code: 200,
      data: data && this.toDetailProduct(data as any),
    };
  }

  toDetailProduct(product: Product & { category: ProductCategory }) {
    return {
      id: product.id,
      product_name: product.product_name,
      category_id: product.category.id,
      category_name: product.category.name,
      group: product.group,
      stock: product.stock,
      price: product.price,
    };
  }

  async create(createDTO: CreateProductDto) {
    const dto = this.validationService.validate(
      ProductValidation.createProductValidation,
      createDTO,
    );

    await this.prismaService.product.create({ data: dto });
    return {
      code: 200,
      message: 'Success create new product',
    };
  }

  async update(updateDTO: UpdateProductDto) {
    const dto = this.validationService.validate(
      ProductValidation.updateProductValidation,
      updateDTO,
    );

    const product = await this.prismaService.product.findFirst({
      where: { id: dto.id },
    });
    if (!product) throw new HttpException('Product not found!', 400);

    await this.prismaService.product.update({
      where: { id: dto.id },
      data: dto,
    });

    return {
      code: 200,
      message: 'Success update product',
    };
  }

  async delete(deleteDTO: DeleteProductDto) {
    const dto = this.validationService.validate(
      ProductValidation.deleteProductValidation,
      deleteDTO,
    );
    await this.prismaService.product.deleteMany({
      where: { id: { in: dto.ids } },
    });
    return {
      code: 200,
      message: 'Success delete product',
    };
  }
}
