import ProductList from '@/components/product-list/ProductList';
import db from '@/libs/db';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Prisma } from '@prisma/client';
import Link from 'next/link';

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
      <Link
        href="/products/add"
        className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white cursor-pointer transition-colors hover:bg-orange-400"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
