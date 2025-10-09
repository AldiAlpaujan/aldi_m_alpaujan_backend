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

@Injectable()
export class ProductService {
  constructor(
    private readonly validationService: ValidationService,
    private readonly prismaService: PrismaService,
  ) {}

  async get(request: GetProductRequest) {
    const data = await this.prismaService.product.findMany({
      where: { product_name: { contains: request.search } },
      include: { category: true },
      skip: (request.page - 1) * request.limit,
      take: request.limit,
    });
    const dataLength = await this.prismaService.product.count({
      where: { product_name: { contains: request.search } },
    });
    return {
      code: 200,
      data: data.map((item) => this.toDetailProduct(item)),
      meta: {
        total_item: dataLength,
        page: request.page,
        limit: request.limit,
        total_page: Math.ceil(dataLength / request.limit),
      },
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
