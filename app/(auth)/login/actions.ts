'use server';

import { z } from 'zod';
import bcrypt from 'bcrypt';
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from '@/libs/constants';
import db from '@/libs/db';
import { redirect } from 'next/navigation';
import { saveIdToSession } from '@/libs/session';

const existEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return user;
};

const objectSchema = z.object({
  email: z.string().email().refine(existEmail, '이메일이 존재하지 않습니다.'),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export const login = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const result = await objectSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  }

  const user = await db.user.findUnique({
    where: {
      email: result.data.email,
    },
    select: {
      id: true,
      password: true,
    },
  });

  const comparePasswordResult = await bcrypt.compare(
    result.data.password,
    user!.password ?? ''
  );

  if (!comparePasswordResult) {
    return {
      fieldErrors: {
        password: ['비밀번호가 틀립니다.'],
        email: [],
      },
    };
  }

  await saveIdToSession(user!.id);

  redirect('/profile');
};
