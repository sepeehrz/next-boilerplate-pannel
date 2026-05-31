export type LoginMode = 'otp' | 'password' | 'both';

export const appConfig = {
  appName: 'My Next 16 App',
  defaultLocale: 'fa',
  auth: {
    loginMode: 'otp' as LoginMode,
    allowRegister: true
  },
  ui: {
    direction: 'rtl' as 'rtl' | 'ltr',
    theme: 'light' as 'light' | 'dark'
  }
};
