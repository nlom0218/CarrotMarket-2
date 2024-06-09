import db from '@/libs/db';
import { getSession } from '@/libs/session';
import { formatToWon } from '@/libs/utils';
import { UserIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getIsOwner(userId: number) {
  const session = await getSession();

  if (session.id) {
    return session.id === userId;
  }

  return false;
}

async function getProduct(inputId: string) {
  const id = Number(inputId);

  if (isNaN(id)) return null;

  return await db.product.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
}

type Props = {
  params: {
    id: string;
  };
};

export default async function Product({ params }: Props) {
  const product = await getProduct(params.id);

  if (!product) {
    return notFound();
  }

  const isOwner = await getIsOwner(product.userId);

  return (
    <div>
      <div className="relative aspect-square">
        <Image fill src={product.photo} alt={product.title} />
      </div>
      <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
        <div className="size-10 rounded-full overflow-hidden">
          {product.user.avatar ? (
            <Image
              src={product.user.avatar}
              alt={product.user.username}
              width={40}
              height={40}
            />
          ) : (
            <UserIcon />
          )}
        </div>
        <div>
          <h3>{product.user.username}</h3>
        </div>
      </div>
      <div className="p-5 mb-32">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p>{product.description}</p>
      </div>
      <div className="fixed w-full bottom-0 left-0 p-5 pb-10 bg-neutral-800 flex justify-between items-center">
        <span className="font-semibold text-xl">
          {formatToWon(product.price)}원
        </span>
        {isOwner ? (
          <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
            삭제하기
          </button>
        ) : null}
        <Link
          href={''}
          className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold"
        >
          채팅하기
        </Link>
      </div>
    </div>
  );
}
