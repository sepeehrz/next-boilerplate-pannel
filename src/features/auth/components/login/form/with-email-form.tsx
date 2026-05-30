'use client';
import {useForm} from 'react-hook-form';
import {useTranslations} from 'next-intl';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {useLogin} from '../../../hooks/useLogin';
import {CaptchaFieldComponent} from '../captcha';
import {zodResolver} from '@hookform/resolvers/zod';
import {useQueryClient} from '@tanstack/react-query';
import {createLoginSchema} from '../../../validations/loginSchema';
import {RememberForgetComponent} from '../remember-forget/index';
import type {LoginFormValues} from '../../../validations/loginSchema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

export function WithEmailFormComponent() {
  const translate = useTranslations('loginPage.Form');
  const translateGlobal = useTranslations('global');
  const validationT = useTranslations('loginPage.validations.login');
  const queryClient = useQueryClient();

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
      username: data.username,
      password: await convertPasswordToSha1(data.password),
      captcha: data.captcha
    };
    login(payload, {
      onError: () => {
        queryClient.invalidateQueries({
          queryKey: ['generate-captcha']
        });
      }
    });
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
                  {translate('emailInputTitle')}
                </FormLabel>
                <FormControl>
                  <Input
                    id='username'
                    {...field}
                    placeholder={translate('emailInputPlaceholder')}
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
            className='w-full border-border rounded-md h-10 text-sm font-medium leading-normal'
            disabled={isPending}>
            {isPending ? translateGlobal('entering') : translate('loginBtn')}
          </Button>
        </form>
      </Form>
    </>
  );
}
