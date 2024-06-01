'use server';

import twilio from 'twilio';
import { z } from 'zod';
import validator from 'validator';
import crypto from 'crypto';
import { redirect } from 'next/navigation';
import db from '@/libs/db';
import { saveIdToSession } from '@/libs/session';

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

const existToken = async (token: number) => {
  const exists = await db.sMSToken.findFirst({
    where: {
      token: String(token),
    },
    select: {
      id: true,
    },
  });

  return Boolean(exists);
};

const tokenSchema = z.coerce
  .number()
  .min(100000)
  .max(999999)
  .refine(existToken, '토큰이 유효하지 않습니다.');

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

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    await client.messages.create({
      body: `당신의 Carrot Market2의 인증 코드는 ${token}입니다.`,
      from: process.env.TWILIO_PHONE_NUMBER!,
      to: process.env.MY_PHONE_NUMBER!,
    });

    return {
      token: true,
    };
  }

  const result = await tokenSchema.safeParseAsync(token);
  if (!result.success) {
    return {
      token: true,
      error: result.error.flatten(),
    };
  }

  const userToken = await db.sMSToken.findUnique({
    where: {
      token: String(result.data),
    },
    select: {
      id: true,
      userId: true,
    },
  });

  await saveIdToSession(userToken!.userId);

  await db.sMSToken.delete({
    where: {
      id: userToken!.id,
    },
  });

  redirect('/profile');
};
