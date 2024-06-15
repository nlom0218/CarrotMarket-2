import ProductList from '@/components/product-list/ProductList';
import db from '@/libs/db';
import { Prisma } from '@prisma/client';

export type ProductsType = Prisma.PromiseReturnType<typeof getProducts>;

async function getProducts() {
  return await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    take: 1,
    orderBy: {
      created_at: 'desc',
    },
  });
}

export default async function Products() {
  const initialProducts = await getProducts();

  return (
    <div>
      <ProductList initialProducts={initialProducts} />
    </div>
  );
}
