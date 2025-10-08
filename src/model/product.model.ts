import { ProductValidation } from 'src/product/product.validation';
import z from 'zod';

export type GetProductRequest = {
  search: string;
  page: number;
  limit: number;
};

export type CreateProductDto = z.infer<
  typeof ProductValidation.createProductValidation
>;

export type UpdateProductDto = z.infer<
  typeof ProductValidation.updateProductValidation
>;

export type DeleteProductDto = z.infer<
  typeof ProductValidation.deleteProductValidation
>;
