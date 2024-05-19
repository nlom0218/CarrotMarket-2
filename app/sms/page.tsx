'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { useFormState } from 'react-dom';
import { smsLogin } from './actions';

const initialState = {
  token: false,
  error: undefined,
};

export default function SMSLogin() {
  const [state, action] = useFormState(smsLogin, initialState);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login</h1>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        {state.token ? (
          <Input
            name="token"
            required
            type="number"
            placeholder="Verification code"
            min={100000}
            max={999999}
            errors={state.error?.formErrors}
            key="token"
          />
        ) : (
          <Input
            name="phone"
            required
            type="text"
            placeholder="Phone number"
            errors={state.error?.formErrors}
            key="phone"
          />
        )}
        <Button>
          {state.token ? 'Verify Token' : 'Send Verification SMS'}
        </Button>
      </form>
    </div>
  );
}
