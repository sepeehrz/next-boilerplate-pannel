'use client';
import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {LoginWithOtpComponent} from './otp';
import {WithEmailFormComponent} from './with-email-form';

import Link from 'next/link';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {GoogleLoginComponent} from './googleLogin';
import {Button} from '@/components/ui/button';

export type ILoginMode = 'password' | 'otp';

export function FormComponent() {
  const translate = useTranslations('loginPage');
  const [loginMode, setLoginMode] = useState<ILoginMode>('password');

  return (
    <>
      <Card className='w-full max-w-md bg-background border-border rounded-lg shadow-lg p-6'>
        <CardHeader className='text-center'>
          <CardTitle className='text-primary text-2xl font-bold '>
            {translate('Form.title')}
          </CardTitle>
          <CardDescription className='text-sm text-muted-foreground'>
            {translate('loginWithOtp')}
          </CardDescription>
        </CardHeader>

        <LoginWithOtpComponent />

        {/* {loginMode === 'password' ? (
          <WithEmailFormComponent />
        ) : (
          <LoginWithOtpComponent />
        )} */}

        {/* <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-border'></div>
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='bg-background px-2 text-muted-foreground'>
              {translate('Form.orContinue')}
            </span>
          </div>
        </div> */}
        {/* <Button
          type='button'
          variant='outline'
          onClick={() =>
            loginMode === 'password'
              ? setLoginMode('otp')
              : setLoginMode('password')
          }>
          {loginMode === 'password'
            ? translate('loginWithOtp')
            : translate('loginWithPassword')}
        </Button> */}
        {/* <GoogleLoginComponent /> */}
        {/* <div className='text-center'>
          <span className='text-sm text-muted-foreground'>
            {translate('Form.haveAccount')}
          </span>
          <span
            className='text-sm text-primary hover:text-primary/80 hover:underline font-medium ltr:ml-1 rtl:mr-1 cursor-pointer'
            onClick={() => setLoginMode('otp')}>
            {translate('Form.register')}
          </span>
        </div> */}
      </Card>
    </>
  );
}
