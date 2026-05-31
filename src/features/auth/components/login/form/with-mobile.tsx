'use client';
import {useForm} from 'react-hook-form';
import {useTranslations} from 'next-intl';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {useLogin} from '../../../hooks/useLogin';
import {CaptchaFieldComponent} from '../captcha';
import {zodResolver} from '@hookform/resolvers/zod';
import {RememberForgetComponent} from '../remember-forget/index';
import {createLoginSchema} from '../../../validations/loginSchema';
import type {LoginFormValues} from '../../../validations/loginSchema';
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';

export function WithMobileComponent() {
  const translate = useTranslations('loginPage.Form');
  const validationT = useTranslations('loginPage.validations.login');

  const {mutate: login, isPending} = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(createLoginSchema(validationT)),
    defaultValues: {
      username: '',
      password: '',
      captcha: ''
    }
  });

  async function convertPasswordToSha1(password: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    const hashHex = hashArray
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  }

  async function onSubmit(data: LoginFormValues) {
    const payload = {
      username: '+98' + data.username,
      password: await convertPasswordToSha1(data.password),
      captcha: data.captcha
    };

    login(payload);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-2'>
          <FormField
            control={form.control}
            name='username'
            render={({field}) => (
              <FormItem className='space-y-2 '>
                <FormLabel className='text-left rtl:text-right'>
                  {translate('mobileInputTitle')}
                </FormLabel>
                <FormControl>
                  <Input
                    id='username'
                    {...field}
                    placeholder={translate('mobileInputPlaceholder')}
                    autoComplete='off'
                    className='h-10 w-full'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({field}) => (
              <FormItem className='space-y-2'>
                <FormLabel>{translate('passwordInputTitle')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={translate('passwordInputPlaceholder')}
                    type='password'
                    autoComplete='off'
                    className='h-10 w-full'
                  />
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
          <RememberForgetComponent />

          <Button
            type='submit'
            variant='default'
            className='w-full rounded-md h-10 text-sm font-medium leading-normal'
            disabled={isPending}>
            {isPending ? 'در حال ورود...' : translate('otpBtn')}
          </Button>
          <Button
            type='submit'
            variant='outline'
            className='w-full border-border rounded-md h-10 text-sm font-medium leading-normal'
            disabled={isPending}>
            {isPending ? 'در حال ورود...' : translate('loginBtn')}
          </Button>
        </form>
      </Form>
    </>
  );
}
