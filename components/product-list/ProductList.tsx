'use client';

import { ProductsType } from '@/app/(tabs)/products/page';
import Product from '../Product';
import { useState } from 'react';
import Button from '../Button';
import { getMoreProducts } from '@/app/(tabs)/products/actions';

type Props = {
  initialProducts: ProductsType;
};

export default function ProductList({ initialProducts }: Props) {
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickButton = async () => {
    setIsLoading(true);
    const newProducts = await getMoreProducts(page + 1);

    if (newProducts.length !== 0) {
      setPage((prev) => prev + 1);
    } else {
      setIsLastPage(true);
    }

    setProducts((prev) => [...prev, ...newProducts]);
    setIsLoading(false);
  };

  return (
    <div className="p-5 flex flex-col gap-5">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
      {isLastPage ? (
        <div className="flex justify-center">상품이 없습니다.</div>
      ) : (
        <Button onClick={handleClickButton}>
          {isLoading ? '로딩중' : '더보기'}
        </Button>
      )}
    </div>
  );
}
