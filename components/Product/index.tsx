import { formatToTimeAgo, formatToWon } from '@/libs/utils';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  product: {
    id: number;
    created_at: Date;
    title: string;
    price: number;
    photo: string;
  };
};

export default function Product({ product }: Props) {
  return (
    <Link href={`/products/${product.id}`} className="flex gap-5">
      <div className="relative min-h-28 min-w-28 rounded-md overflow-hidden">
        <Image
          fill
          src={product.photo}
          alt={product.title}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-lg text-white">{product.title}</span>
        <span className="text-sm text-neutral-500">
          {formatToTimeAgo(product.created_at.toString())}
        </span>
        <span className="text-lg text-white font-semibold">
          {formatToWon(product.price)}원
        </span>
      </div>
    </Link>
  );
}
