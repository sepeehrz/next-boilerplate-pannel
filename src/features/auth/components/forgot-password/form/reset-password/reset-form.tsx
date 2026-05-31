'use client';

import {useForm} from 'react-hook-form';
import {useRouter} from 'next/navigation';
import {useTranslations} from 'next-intl';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {useRef, useState, useEffect} from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import {
  ResetPasswordSchema,
  type ResetPasswordFormValues
} from '../../../../validations/resetPasswordShcema';

export function ResetFormComponent() {
  const translate = useTranslations('resetPassword.Form');
  const router = useRouter();
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [countDown, setCountDown] = useState(60);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      code: Array(6).fill(''),
      password: '',
      confirmPassword: ''
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
  }

  async function onSubmit(data: ResetPasswordFormValues) {
    const code = data.code.join('');

    const res = await fetch('/api/auth/confirm', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({code})
    });

    if (!res.ok) return;

    const result = await res.json();
    if (result.success) {
      router.push('/complete-profile/landing');
    }
  }

  function resendCode() {
    if (countDown === 0) {
      setCountDown(60);
    }
  }

  return (
    <>
      <div className='text-sm font-medium leading-none text-center text-foreground'>
        {translate('verificationCode')}
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
              const value = field.value ?? Array(6).fill('');

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
                          className='h-12 w-12 text-center rounded-sm'
                        />
                      </FormControl>
                    ))}
                  </div>
                  <FormMessage className='text-center' />
                </FormItem>
              );
            }}
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
            name='confirmPassword'
            render={({field}) => (
              <FormItem className='space-y-2'>
                <FormLabel>{translate('confirmPasswordInputTitle')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={translate('confirmPasswordInputPlaceholder')}
                    type='password'
                    autoComplete='off'
                    className='h-10 w-full'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='w-full h-10' variant='default'>
            {translate('btn')}
          </Button>
        </form>
      </Form>
    </>
  );
}
