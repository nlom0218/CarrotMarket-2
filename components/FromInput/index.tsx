import { ComponentPropsWithoutRef } from 'react';

interface FromInput extends ComponentPropsWithoutRef<'input'> {
  errors?: string[];
}

const FormInput = ({ errors = [], ...rest }: FromInput) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        className="bg-transparent rounded-md w-full h-10 
        focus:outline-none ring-2 focus:ring-4 ring-neutral-200 focus:ring-orange-500 transition
        border-none placeholder:text-neutral-400"
        {...rest}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
};

export default FormInput;
