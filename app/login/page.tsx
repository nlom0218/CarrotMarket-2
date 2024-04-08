'use client';

import FromButton from '@/components/FormButton';
import FormInput from '@/components/FromInput';
import SocialLogin from '@/components/SocialLogin';
import { useFormState } from 'react-dom';
import { handleForm } from './actions';

export default function Login() {
  const [state, action] = useFormState(handleForm, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password.</h2>
      </div>
      <form className="flex flex-col gap-3" action={action}>
        <FormInput
          required
          type="email"
          name="email"
          placeholder="Email"
          errors={[]}
        />
        <FormInput
          required
          type="password"
          name="password"
          placeholder="Password"
          errors={state?.error ?? []}
        />
        <FromButton type="submit">Log in</FromButton>
      </form>
      <SocialLogin />
    </div>
  );
}
