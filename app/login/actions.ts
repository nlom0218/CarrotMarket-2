'use Server';

export const handleForm = async (
  prevState: any,
  data: FormData
): Promise<{ error: string[] }> => {
  return {
    error: ['wrong password', 'password t0o short'],
  };
};
