import FromButton from '@/components/FormButton';
import FormInput from '@/components/FromInput';
import SocialLogin from '@/components/SocialLogin';

export default function Login() {
  const handleForm = async (data: FormData) => {
    'use server';
    console.log(data.get('email'), data.get('password'));
    console.log('i run in the server');
  };

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password.</h2>
      </div>
      <form className="flex flex-col gap-3" action={handleForm}>
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
          errors={[]}
        />
        <FromButton type="submit" loading={false}>
          Log in
        </FromButton>
      </form>
      <SocialLogin />
    </div>
  );
}
