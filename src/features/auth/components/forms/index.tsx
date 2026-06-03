'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {OtpFormComponent} from './otpForm';
import {LoginFormComponent} from './loginForm';
import {useDirection} from '@/hooks/useDirection';
import {RegisterFormComponent} from './registerForm';
import {ForgotPasswordFormComponent} from './forgotPasswordForm';
import {LogIn, KeyRound, UserPlus, Smartphone} from 'lucide-react';
import {Tabs, TabsList, TabsContent, TabsTrigger} from '@/components/ui/tabs';

type AuthTab = 'login' | 'otp' | 'signup' | 'forgot';

export function FormComponent() {
  const [tab, setTab] = useState<AuthTab>('login');
  const t = useTranslations('auth.cardForm');
  const {dir} = useDirection();

  const titles: Record<AuthTab, {title: string; subtitle: string}> = {
    login: {
      title: t('login.title'),
      subtitle: t('login.subtitle')
    },
    otp: {
      title: t('otp.title'),
      subtitle: t('otp.subtitle')
    },
    signup: {
      title: t('signup.title'),
      subtitle: t('signup.subtitle')
    },
    forgot: {
      title: t('forgot.title'),
      subtitle: t('forgot.subtitle')
    }
  };

  const {title, subtitle} = titles[tab];

  return (
    <div className='space-y-6 p-6'>
      <div className='space-y-1.5'>
        <h1 className='text-2xl font-semibold tracking-tight text-foreground'>
          {title}
        </h1>
        <p className='text-sm text-muted-foreground'>{subtitle}</p>
      </div>

      {tab === 'forgot' ? (
        <ForgotPasswordFormComponent onBack={() => setTab('login')} />
      ) : (
        <Tabs
          value={tab}
          onValueChange={v => setTab(v as AuthTab)}
          className='space-y-5'
          dir={dir}>
          <TabsList className='grid w-full grid-cols-3 bg-muted/60 p-1'>
            <TabsTrigger value='login' className='cursor-pointer gap-1.5'>
              <LogIn className='h-3.5 w-3.5' />
              <span className='hidden sm:inline'>{t('tabs.login')}</span>
            </TabsTrigger>

            <TabsTrigger value='otp' className='cursor-pointer gap-1.5'>
              <Smartphone className='h-3.5 w-3.5' />
              <span className='hidden sm:inline'>{t('tabs.otp')}</span>
            </TabsTrigger>

            <TabsTrigger value='signup' className='cursor-pointer gap-1.5'>
              <UserPlus className='h-3.5 w-3.5' />
              <span className='hidden sm:inline'>{t('tabs.signup')}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value='login' className='mt-0'>
            <LoginFormComponent onForgot={() => setTab('forgot')} />
          </TabsContent>

          <TabsContent value='otp' className='mt-0'>
            <OtpFormComponent />
          </TabsContent>

          <TabsContent value='signup' className='mt-0'>
            <RegisterFormComponent />
          </TabsContent>
        </Tabs>
      )}

      {tab !== 'forgot' && (
        <div className='flex items-center justify-center gap-1 text-xs text-muted-foreground'>
          <KeyRound className='h-3 w-3' />
          {t('footer')}
        </div>
      )}
    </div>
  );
}
