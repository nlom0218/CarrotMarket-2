import { ComponentPropsWithoutRef } from 'react';

interface FormButton extends ComponentPropsWithoutRef<'button'> {
  loading: boolean;
}

const FromButton = ({ children, loading, ...rest }: FormButton) => {
  return (
    <button
      className="primary-btn h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
      disabled={loading}
      {...rest}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default FromButton;
