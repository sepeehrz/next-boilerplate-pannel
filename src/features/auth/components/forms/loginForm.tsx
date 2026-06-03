'use client';

import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslations} from 'next-intl';
import {CaptchaFieldComponent} from './captcha';
import {Button} from '@/components/common/button';
import {zodResolver} from '@hookform/resolvers/zod';
import {Eye, User, Lock, EyeOff} from 'lucide-react';
import {CreateLoginSchema, type LoginFormValues} from '@/features/auth';
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton
} from '@/components/ui/input-group';

interface LoginFormProps {
  onForgot?: () => void;
}

export function LoginFormComponent({onForgot}: LoginFormProps) {
  const t = useTranslations('auth.login');

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const schema = CreateLoginSchema(t);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      password: '',
      captcha: ''
    }
  });

  async function onSubmit(values: LoginFormValues) {
    setLoading(true);

    console.log({
      ...values
    });

    await new Promise(r => setTimeout(r, 1100));

    setLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-5'
        noValidate>
        <FormField
          control={form.control}
          name='username'
          render={({field}) => (
            <FormItem className='space-y-2'>
              <FormLabel>{t('username')}</FormLabel>

              <FormControl>
                <InputGroup>
                  <InputGroupInput
                    placeholder={t('usernamePlaceholder')}
                    autoComplete='username'
                    className='px-0'
                    aria-invalid={!!form.formState.errors.username}
                    {...field}
                  />
                  <InputGroupAddon className='ps-1.5'>
                    <User />
                  </InputGroupAddon>
                </InputGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({field}) => (
            <FormItem>
              <div className='flex items-center justify-between'>
                <FormLabel>{t('password')}</FormLabel>

                <Button
                  variant='link'
                  onClick={onForgot}
                  className='text-xs font-medium text-primary hover:underline'>
                  {t('forgotPassword')}
                </Button>
              </div>
              <FormControl>
                <InputGroup>
                  <InputGroupInput
                    type={show ? 'text' : 'password'}
                    placeholder={t('passwordPlaceholder')}
                    autoComplete='current-password'
                    className='px-0'
                    aria-invalid={!!form.formState.errors.password}
                    {...field}
                  />
                  <InputGroupAddon className='ps-1.5'>
                    <Lock />
                  </InputGroupAddon>
                  <InputGroupAddon align='inline-end' className='pe-1.5'>
                    <InputGroupButton
                      aria-label='Eye'
                      title='Eye'
                      size='icon-xs'
                      onClick={() => setShow(s => !s)}>
                      {show ? (
                        <EyeOff className='h-4 w-4' />
                      ) : (
                        <Eye className='h-4 w-4' />
                      )}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='captcha'
          render={({field}) => (
            <FormItem>
              <FormControl>
                <CaptchaFieldComponent
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='w-full'
          size='lg'
          disabled={loading}
          loading={loading}>
          {loading ? t('signingIn') : t('signIn')}
        </Button>
      </form>
    </Form>
  );
}
