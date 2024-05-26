'use server';

import { z } from 'zod';
import validator from 'validator';
import crypto from 'crypto';
import { redirect } from 'next/navigation';
import db from '@/libs/db';

type ActionState = {
  token: boolean;
};

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, 'ko-KR'),
    '올바른 번호를 입력해주세요.'
  );

const tokenSchema = z.coerce.number().min(100000).max(999999);

async function createToken() {
  const token = crypto.randomInt(100000, 999999).toString();

  const dbToken = await db.sMSToken.findUnique({
    where: {
      token,
    },
    select: {
      id: true,
    },
  });

  if (dbToken) {
    return createToken();
  }

  return token;
}

export const smsLogin = async (prevState: ActionState, formData: FormData) => {
  const phone = formData.get('phone');
  const token = formData.get('token');

  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      return {
        token: false,
        error: result.error.flatten(),
      };
    }

    await db.sMSToken.deleteMany({
      where: {
        user: {
          phone: result.data,
        },
      },
    });

    const token = await createToken();

    await db.sMSToken.create({
      data: {
        token,
        user: {
          connectOrCreate: {
            where: {
              phone: result.data,
            },
            create: {
              username: crypto.randomBytes(10).toString('hex'),
              phone: result.data,
            },
          },
        },
      },
    });

    return {
      token: true,
    };
  }

  const result = tokenSchema.safeParse(token);
  if (!result.success) {
    return {
      token: true,
      error: result.error.flatten(),
    };
  }

  redirect('/');
};
