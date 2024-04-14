import Button from '@/components/Button';
import Input from '@/components/Input';

export default function SMSLogin() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login</h1>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <form className="flex flex-col gap-3">
        <Input required type="number" placeholder="Phone number" />
        <Input required type="number" placeholder="Verification code" />
        <Button>Verify</Button>
      </form>
    </div>
  );
}
