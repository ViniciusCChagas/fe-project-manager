import { Input } from '../../../../core/components/Input';
import { Button } from '../../../../core/components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCreateUser } from '../../hooks/useCreateUser.ts';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface IRegisterFormValues {
  name: string;
  email: string;
  password: string;
}

export function RegisterPage() {
  window.document.title = 'Register - Project Manager';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormValues>();

  const { mutateAsync: createUser, isLoading } = useCreateUser();
  const navigate = useNavigate();

  async function onSubmit(data: IRegisterFormValues) {
    try {
      await createUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      toast('Account created successfully! Use your credentials to login.', {
        type: 'success',
        autoClose: 7000,
      });
      navigate('/login', { replace: true });
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
          className={'gap-lg mx-auto flex flex-col'}
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className={'text-h1 text-center font-bold'}>Register</h1>
          <Input
            type={'text'}
            placeholder={'your name'}
            label={'Name:'}
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 3,
                message: 'Name must have at least 3 characters',
              },
            })}
            disabled={isLoading}
            errorMessage={errors.name && errors.name.message}
          />

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
              minLength: {
                value: 8,
                message: 'Password must have at least 8 characters',
              },
            })}
            disabled={isLoading}
            errorMessage={errors.password && errors.password.message}
          />

          <div className={'gap-xs mt-5 flex flex-col'}>
            <Button type={'submit'} loading={isLoading}>
              Submit
            </Button>
            <p className={'text-center'}>or</p>
            <Link
              to={'/auth/login'}
              className={'text-center text-yellow-700 underline'}
            >
              Login to your account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
