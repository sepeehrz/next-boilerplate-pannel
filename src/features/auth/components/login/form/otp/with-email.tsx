'use client';
import type {mode} from './index';
import {useForm} from 'react-hook-form';
import {useTranslations} from 'next-intl';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Channel} from '../../../../enums';
import {zodResolver} from '@hookform/resolvers/zod';
import {useCheckUser} from '@/features/auth/hooks/checkUser';
import {loginOtpEmailSchema} from '@/features/auth/validations/loginOtpEmailSchema';
import type {loginOtpEmailValues} from '@/features/auth/validations/loginOtpEmailSchema';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {CaptchaFieldComponent} from '../../captcha';
import type {LoginWithOtpRequestDTO} from '@/features/auth/types';

interface IProps {
  changeMode: (value: mode) => void;
  passCheckUserData: (value: LoginWithOtpRequestDTO) => void;
}
export function WithEmailOtpComponent({changeMode, passCheckUserData}: IProps) {
  const translate = useTranslations('loginPage.Form');
  const translateGlobal = useTranslations('global');
  const validationT = useTranslations('loginPage.validations.login');

  const {mutate: checkUser, isPending} = useCheckUser();

  const form = useForm<loginOtpEmailValues>({
    resolver: zodResolver(loginOtpEmailSchema(validationT)),
    defaultValues: {
      username: '',
      captcha: ''
    }
  });

  async function onSubmit(data: loginOtpEmailValues) {
    const payload = {
      username: data.username,
      email: data.username,
      captcha: data.captcha,
      channel: Channel.email
    };
    checkUser(payload, {
      onSuccess: () => {
        passCheckUserData({
          username: data.username,
          email: data.username,
          channel: Channel.sms
        });
        changeMode('otp');
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
