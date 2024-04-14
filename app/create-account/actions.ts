'use server';

import { z } from 'zod';

const passwordRegex = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/
);

const formSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, '너무 작아!')
      .max(10, '너무 길어!')
      .refine((value) => !value.includes('potato'), 'no potatoes allowed!!'),
    email: z.string().email(),
    password: z
      .string()
      .min(4)
      .regex(passwordRegex, '비밀번호 형식에 맞지 않아요'),
    confirmPassword: z.string().min(4),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    ['password', 'confirmPassword'].forEach((key) => {
      if (password !== confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [key],
          message: '둘이 같지 않어222',
        });
      }
    });
  });

export const createAccount = async (prevState: any, formData: FormData) => {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  };

  const result = formSchema.safeParse(data);

  if (!result.success) {
    console.log('issues', result.error.issues);
    console.log('flatten', result.error.flatten());
  }

  if (!result.success) return result.error.flatten();
  else console.log(result.data);
};
