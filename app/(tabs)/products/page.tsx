import Product from '@/components/Product';
import db from '@/libs/db';

async function getProducts() {
  return await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
  });
}

export default async function Products() {
  const products = await getProducts();

  return (
    <div className="p-5 flex flex-col gap-5">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
