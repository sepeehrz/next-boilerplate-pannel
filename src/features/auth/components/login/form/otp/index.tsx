import {useState} from 'react';
import {OtpComponent} from './otp-form';
import {WithMobileOtpComponent} from './with-mobile';
import type {LoginWithOtpRequestDTO} from '@/features/auth/types';
export type mode = 'login' | 'otp' | 'complete-profile';

export function LoginWithOtpComponent() {
  const [mode, setMode] = useState<mode>('login');
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
      ) : (
        <OtpComponent checkUserData={checkUserData} changeMode={setMode} />
      )}
    </>
  );
}
