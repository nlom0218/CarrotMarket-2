'use client';

import { ComponentPropsWithoutRef } from 'react';
import { useFormStatus } from 'react-dom';

interface FormButton extends ComponentPropsWithoutRef<'button'> {}

const FromButton = ({ children, ...rest }: FormButton) => {
  const { pending } = useFormStatus();
  return (
    <button
      className="primary-btn h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
      disabled={pending}
      {...rest}
    >
      {pending ? 'Loading...' : children}
    </button>
  );
};

export default FromButton;
