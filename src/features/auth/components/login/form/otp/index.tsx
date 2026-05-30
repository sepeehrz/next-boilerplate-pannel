import {useState} from 'react';
import {OtpComponent} from './otp-form';
import {useTranslations} from 'next-intl';
import {Mail, Smartphone} from 'lucide-react';
import {WithEmailOtpComponent} from './with-email';
import {WithMobileOtpComponent} from './with-mobile';
import {CompleteProfileComponent} from './complete-profile';
import type {LoginWithOtpRequestDTO} from '@/features/auth/types';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
export type mode = 'login' | 'otp' | 'complete-profile';

export function LoginWithOtpComponent() {
  const translate = useTranslations('loginPage');
  const [mode, setMode] = useState<mode>('login');
  const [contactValue, setContactValue] = useState<string>('');
  const [checkUserData, setCheckUserData] = useState<LoginWithOtpRequestDTO>({
    username: ''
  });

  return (
    <>
      {mode === 'login' ? (
        <WithMobileOtpComponent
          changeMode={setMode}
          passCheckUserData={setCheckUserData}
        />
      ) : mode === 'otp' ? (
        <OtpComponent
          checkUserData={checkUserData}
          changeMode={setMode}
          contactValueId={setContactValue}
        />
      ) : (
        <CompleteProfileComponent contactValueId={contactValue} />
      )}
    </>
  );
}
