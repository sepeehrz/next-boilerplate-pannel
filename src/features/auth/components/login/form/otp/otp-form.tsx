'use client';

import {mode} from './index';
import {ArrowLeft} from 'lucide-react';
import {useForm} from 'react-hook-form';
import {useRouter} from 'next/navigation';
import {useTranslations} from 'next-intl';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/common/button';
import {Channel} from '@/features/auth/enums';
import {farazPortalUser} from '@/services/index';
import {useEffect, useRef, useState} from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {useQueryClient} from '@tanstack/react-query';
import {useConfirmUser} from '@/features/auth/hooks/confirmUser';
import type {LoginWithOtpRequestDTO} from '@/features/auth/types';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';

import {OtpSchema, type OtpFormValues} from '../../../../validations/otpSchema';
import {convertPasswordToSha1} from '@/features/auth/helpers/convertToSha1';
import {useCheckUser} from '@/features/auth/hooks/checkUser';

interface IProps {
  checkUserData: LoginWithOtpRequestDTO;
  contactValueId: (value: string) => void;
  changeMode: (value: mode) => void;
}
export function OtpComponent({
  checkUserData,
  changeMode,
  contactValueId
}: IProps) {
  const queryClient = useQueryClient();
  const translate = useTranslations('otpPage.Form');
  const router = useRouter();
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [countDown, setCountDown] = useState(120);

  const {mutate: checkUser, isPending: isPendingCheckUser} = useCheckUser();
  const {mutate: confirmUser, isPending} = useConfirmUser();

  const form = useForm<OtpFormValues>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      code: Array(4).fill('')
    },
    mode: 'onSubmit'
  });

  useEffect(() => {
    if (countDown <= 0) return;

    const timer = setTimeout(() => {
      setCountDown(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countDown]);

  function handleChange(
    value: string,
    index: number,
    fieldValue: string[],
    onChange: (v: string[]) => void
  ) {
    const digit = value.replace(/[^0-9]/g, '');
    if (!digit) return;

    const newValue = [...fieldValue];
    newValue[index] = digit[0];
    onChange(newValue);

    if (index === 3) {
      form.handleSubmit(onSubmit)();
      return;
    }

    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    fieldValue: string[],
    onChange: (v: string[]) => void
  ) {
    if (e.key === 'Backspace') {
      e.preventDefault();

      const newValue = [...fieldValue];
      newValue[index] = '';
      onChange(newValue);

      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
    if (index === 3) {
      form.handleSubmit(onSubmit)();
      return;
    }
  }

  async function onSubmit(data: OtpFormValues) {
    const code = data.code.join('');
    const channelCheck =
      checkUserData.channel === Channel.sms
        ? {mobile: checkUserData.mobile}
        : {email: checkUserData.email};

    const payload = {
      username: checkUserData.mobile,
      ...channelCheck,
      verifyCode: (await convertPasswordToSha1(code)).toUpperCase(),
      channel: checkUserData.channel
    };

    confirmUser(payload, {
      onSuccess: async () => {
        const faraz = await queryClient.fetchQuery({
          queryKey: ['faraz-portal-user'],
          queryFn: farazPortalUser
        });
        if (!faraz.agreementstatus) {
          contactValueId(faraz._faraz_contact_value);
          changeMode('complete-profile');
          return;
        }
        router.replace('/');
      }
    });
  }

  function resendCode() {
    if (countDown === 0) {
      checkUser(
        {
          username: checkUserData.mobile,
          mobile: checkUserData.mobile,
          channel: Channel.sms
        },
        {
          onSuccess: () => {
            setCountDown(120);
          }
        }
      );
    }
  }

  return (
    <>
      <div className='text-sm font-medium leading-none text-center text-foreground'>
        {translate('enterCode')}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'
          dir='ltr'>
          <FormField
            control={form.control}
            name='code'
            render={({field}) => {
              const value = field.value ?? Array(4).fill('');

              return (
                <FormItem>
                  <div className='flex justify-center space-x-2'>
                    {value.map((digit, index) => (
                      <FormControl key={index}>
                        <Input
                          ref={el => {
                            inputRefs.current[index] = el!;
                          }}
                          value={digit}
                          inputMode='numeric'
                          autoComplete='off'
                          maxLength={1}
                          onWheel={e => e.currentTarget.blur()}
                          onChange={e =>
                            handleChange(
                              e.target.value,
                              index,
                              value,
                              field.onChange
                            )
                          }
                          onKeyDown={e =>
                            handleKeyDown(e, index, value, field.onChange)
                          }
                          className='h-13 w-13 text-center rounded-sm'
                        />
                      </FormControl>
                    ))}
                  </div>
                  <FormMessage className='text-center' />
                </FormItem>
              );
            }}
          />

          <div className='text-center'>
            <Button
              type='button'
              variant='link'
              disabled={countDown !== 0 || isPendingCheckUser}
              onClick={resendCode}
              className={countDown !== 0 ? 'opacity-55' : ''}>
              {translate('resend')} {countDown}
            </Button>
          </div>

          <Button
            type='submit'
            className='w-full h-10'
            variant='default'
            disabled={countDown === 0 || isPending}
            loading={isPending}>
            {translate('verifyBtn')}
          </Button>
          <Button
            type='button'
            className='w-full h-10 border-none flex items-center'
            variant='outline'
            onClick={() => changeMode('login')}>
            <ArrowLeft className=' mb-1' />
            {translate('backBtn')}
          </Button>
        </form>
      </Form>
    </>
  );
}
