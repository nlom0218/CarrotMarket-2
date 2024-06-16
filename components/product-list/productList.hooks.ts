import { getMoreProducts } from '@/app/(tabs)/products/actions';
import { ProductsType } from '@/app/(tabs)/products/page';
import { useEffect, useRef, useState } from 'react';

export const useGetInfiniteProducts = (initialProducts: ProductsType) => {
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

  return { trigger, isLastPage, products, isLoading, page };
};
