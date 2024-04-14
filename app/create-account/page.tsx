'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import SocialLogin from '@/components/SocialLogin';
import { useFormState } from 'react-dom';
import { createAccount } from './actions';

export default function CreateAccount() {
  const [state, action] = useFormState(createAccount, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">FILL in the form below to join.</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <Input
          name="username"
          required
          type="text"
          placeholder="Username"
          errors={state?.fieldErrors.username}
          minLength={3}
          maxLength={10}
        />
        <Input
          name="email"
          required
          type="email"
          placeholder="Email"
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          required
          type="password"
          placeholder="Password"
          errors={state?.fieldErrors.password}
          minLength={4}
        />
        <Input
          name="confirmPassword"
          required
          type="password"
          placeholder="Confirm Password"
          errors={state?.fieldErrors.confirmPassword}
          minLength={4}
        />
        <Button>Create Account</Button>
      </form>
      <SocialLogin />
    </div>
  );
}
