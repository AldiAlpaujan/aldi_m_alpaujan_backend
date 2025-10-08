import z from 'zod';

export class ProductValidation {
  static readonly createProductValidation = z.object({
    product_name: z.string().min(1).max(100),
    category_id: z.number(),
    stock: z.number().min(1),
    group: z.string().min(1).max(100),
    price: z.number().min(1),
  });

  static readonly updateProductValidation = z.object({
    id: z.number(),
    product_name: z.string().min(1).max(100),
    category_id: z.number(),
    stock: z.number().min(1),
    group: z.string().min(1).max(100),
    price: z.number().min(1),
  });

  static readonly deleteProductValidation = z.object({
    ids: z.array(z.number()).min(1),
  });
}
