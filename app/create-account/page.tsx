'use client';

import FromButton from '@/components/FormButton';
import FormInput from '@/components/FromInput';
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
        <FormInput
          name="username"
          required
          type="text"
          placeholder="Username"
          errors={state?.fieldErrors.username}
          minLength={3}
          maxLength={10}
        />
        <FormInput
          name="email"
          required
          type="email"
          placeholder="Email"
          errors={state?.fieldErrors.email}
        />
        <FormInput
          name="password"
          required
          type="password"
          placeholder="Password"
          errors={state?.fieldErrors.password}
          minLength={4}
        />
        <FormInput
          name="confirmPassword"
          required
          type="password"
          placeholder="Confirm Password"
          errors={state?.fieldErrors.confirmPassword}
          minLength={4}
        />
        <FromButton>Create Account</FromButton>
      </form>
      <SocialLogin />
    </div>
  );
}
