'use client';

import { ComponentPropsWithoutRef } from 'react';
import { useFormStatus } from 'react-dom';

interface Button extends ComponentPropsWithoutRef<'button'> {}

const Button = ({ children, ...rest }: Button) => {
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

export default Button;
