'use client';

import { ProductsType } from '@/app/(tabs)/products/page';
import Product from '../Product';
import { useGetInfiniteProducts } from './productList.hooks';

type Props = {
  initialProducts: ProductsType;
};

export default function ProductList({ initialProducts }: Props) {
  const { trigger, products, isLastPage, isLoading, page } =
    useGetInfiniteProducts(initialProducts);

  return (
    <div className="p-5 flex flex-col gap-5">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}

      {!isLastPage ? (
        // 현재 style은 상품 수가 많이 있지 않아 임시방편임
        <span ref={trigger} style={{ marginTop: `${page * 600}vh` }}>
          {isLoading ? '로딩 중' : '더 불러오기'}
        </span>
      ) : null}
    </div>
  );
}
