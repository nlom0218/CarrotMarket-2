'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import SocialLogin from '@/components/SocialLogin';
import { useFormState } from 'react-dom';
import { login } from './actions';

export default function Login() {
  const [state, action] = useFormState(login, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password.</h2>
      </div>
      <form className="flex flex-col gap-3" action={action}>
        <Input
          required
          type="email"
          name="email"
          placeholder="Email"
          errors={state?.fieldErrors.email}
        />
        <Input
          required
          type="password"
          name="password"
          placeholder="Password"
          errors={state?.fieldErrors.password}
        />
        <Button type="submit">Log in</Button>
      </form>
      <SocialLogin />
    </div>
  );
}
