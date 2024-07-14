import { Input } from '../../../../core/components/Input';
import { Button } from '../../../../core/components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useLogin } from '../../hooks/useLogin.ts';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useAuth } from '../../../../core/hooks/useAuth.tsx';

interface ILoginFormValues {
  email: string;
  password: string;
}

export function LoginPage() {
  window.document.title = 'Login - Project Manager';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormValues>();

  const { mutateAsync: handleLogin, isLoading } = useLogin();
  const navigate = useNavigate();
  const { saveUser } = useAuth();

  async function onSubmit(data: ILoginFormValues) {
    try {
      const { user } = await handleLogin(data);
      saveUser(user);
      navigate('/', { replace: true });
    } catch (err) {
      const error = err as AxiosError;
      const responseError = error.response?.data as { message: string };

      toast(responseError.message, { type: 'error' });

      console.error(err);
    }
  }

  return (
    <div
      className={
        'flex min-h-[100vh] w-full items-center justify-center bg-yellow-400'
      }
    >
      <div
        className={
          'shadow-level-2 w-[90vw] max-w-[400px] rounded-md bg-white p-10'
        }
      >
        <form
          className={'gap-md mx-auto flex flex-col'}
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className={'text-h1 text-center font-bold'}>Login</h1>
          <Input
            type={'email'}
            placeholder={'your@email.com'}
            label={'Email:'}
            {...register('email', {
              required: 'Email is required',
            })}
            disabled={isLoading}
            errorMessage={errors.email && errors.email.message}
          />

          <Input
            type={'password'}
            placeholder={'***'}
            label={'Password:'}
            {...register('password', {
              required: 'Password is required',
            })}
            disabled={isLoading}
            errorMessage={errors.password && errors.password.message}
          />
          <div className={'gap-xs mt-5 flex flex-col'}>
            <Button type={'submit'} loading={isLoading} disabled={isLoading}>
              Login
            </Button>
            <p className={'text-center'}>or</p>
            <Link
              to={'/auth/register'}
              className={'text-center text-yellow-700 underline'}
            >
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
