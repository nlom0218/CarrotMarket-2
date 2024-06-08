import { resolve } from 'path';

async function getProduct() {
  await new Promise((res) => setTimeout(res, 10000000));
}

type Props = {
  params: {
    id: string;
  };
};

export default async function Product({ params }: Props) {
  await getProduct();

  return <span>Product detail {params.id}</span>;
}
