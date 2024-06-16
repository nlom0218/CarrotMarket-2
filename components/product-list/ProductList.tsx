'use client';

import { ProductsType } from '@/app/(tabs)/products/page';
import Product from '../Product';
import { useEffect, useRef, useState } from 'react';
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

  const trigger = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (trigger.current === null) {
      return;
    }

    const observer = new IntersectionObserver(
      async ([currentTrigger]) => {
        if (currentTrigger.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);

          setIsLoading(true);
          const newProducts = await getMoreProducts(page + 1);

          if (newProducts.length !== 0) {
            setPage((prev) => prev + 1);
          } else {
            setIsLastPage(true);
          }

          setProducts((prev) => [...prev, ...newProducts]);
          setIsLoading(false);
        }
      },
      {
        threshold: 0,
        rootMargin: '0px 0px 100px 0px',
      }
    );

    observer.observe(trigger.current);

    return () => {
      observer.disconnect();
    };
  }, [page]);

  return (
    <div className="p-5 flex flex-col gap-5">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}

      {!isLastPage ? (
        <span ref={trigger} style={{ marginTop: `${page * 600}vh` }}>
          {isLoading ? '로딩 중' : '더 불러오기'}
        </span>
      ) : null}
    </div>
  );
}
