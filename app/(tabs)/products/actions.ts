'use server';

import db from '@/libs/db';

const PRODUCT_COUNT = 1;

export async function getMoreProducts(page: number) {
  return await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    skip: PRODUCT_COUNT * (page - 1),
    take: PRODUCT_COUNT,
    orderBy: {
      created_at: 'desc',
    },
  });
}
