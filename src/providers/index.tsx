'use client';

import dynamic from 'next/dynamic';
import {ReactNode, useState} from 'react';
import {NextIntlClientProvider} from 'next-intl';
import {DialogProvider} from './dialog-provider';
import {ConfirmDialogProvider} from './alert-dialog-provider';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const ThemeProvider = dynamic(
  () => import('./theme-provider').then(mod => mod.ThemeProvider),
  {ssr: false}
);

interface IProps {
  children: ReactNode;
  locale: 'en' | 'fa';
  messages: Record<string, any>;
}

export default function Providers({children, locale, messages}: IProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false
          }
        }
      })
  );

  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='light'
      enableSystem
      disableTransitionOnChange>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <QueryClientProvider client={queryClient}>
          <DialogProvider>
            <ConfirmDialogProvider>{children}</ConfirmDialogProvider>
          </DialogProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
