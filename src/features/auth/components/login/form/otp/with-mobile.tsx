'use client';
import type {mode} from './index';
import {useForm} from 'react-hook-form';
import {useTranslations} from 'next-intl';
import {Channel} from '../../../../enums';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {zodResolver} from '@hookform/resolvers/zod';
import {loginOtpMobileSchema} from '@/features/auth/validations/loginOtpMobileSchema';
import type {loginOtpMobileValues} from '@/features/auth/validations/loginOtpMobileSchema';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {useCheckUser} from '@/features/auth/hooks/checkUser';
import {CaptchaFieldComponent} from '../../captcha';
import type {LoginWithOtpRequestDTO} from '@/features/auth/types';

interface IProps {
  changeMode: (value: mode) => void;
  passCheckUserData: (value: LoginWithOtpRequestDTO) => void;
}
export function WithMobileOtpComponent({
  changeMode,
  passCheckUserData
}: IProps) {
  const translate = useTranslations('loginPage.otpForm');
  const validationT = useTranslations('loginPage.validations.login');
  const translateGlobal = useTranslations('global');

  const {mutate: checkUser, isPending} = useCheckUser();

  const form = useForm<loginOtpMobileValues>({
    resolver: zodResolver(loginOtpMobileSchema(validationT)),
    defaultValues: {
      mobile: '',
      captcha: ''
    }
  });

  async function onSubmit(data: loginOtpMobileValues) {
    const payload = {
      ...data,
      username: data.mobile,
      channel: Channel.sms
    };
    checkUser(payload, {
      onSuccess: () => {
        passCheckUserData({
          username: data.mobile,
          mobile: data.mobile,
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
            name='mobile'
            render={({field}) => (
              <FormItem className='space-y-2 '>
                <FormLabel className='text-left rtl:text-right'>
                  {translate('mobile')}
                </FormLabel>
                <FormControl>
                  <Input
                    id='mobile'
                    {...field}
                    placeholder={'+971 50 123 4567'}
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
            {isPending ? translateGlobal('loading') : translate('sendOtp')}
          </Button>
        </form>
      </Form>
    </>
  );
}
