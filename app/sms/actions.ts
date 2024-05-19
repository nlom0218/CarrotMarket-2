'use server';

import { z } from 'zod';
import validator from 'validator';
import { redirect } from 'next/navigation';

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
