import {cn} from '@/lib';
import '../globals.css';
import type {Metadata} from 'next';
import {Shabnam} from '@/lib/fonts';
import Providers from '@/providers/index';
import {Toaster} from '@/components/ui/sonner';
import {getTranslations} from 'next-intl/server';
import {getLocaleFromCookie} from '@/lib/i18n-request/locale';
import {getMessages} from '@/lib/i18n-request/getMessageI18n';

export async function generateMetadata(): Promise<Metadata> {
  const translate = await getTranslations('global');

  return {
    title: translate('title'),
    icons: {
      icon: '../../../public/favicon.webp',
      shortcut: '../../../public/favicon.webp'
    }
  };
}
export default async function LoginLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocaleFromCookie();

  const dir = locale === 'fa' ? 'rtl' : 'ltr';
  const messages = await getMessages(locale);

  return (
    <html lang={locale} dir={dir}>
      <body
        className={cn(
          'bg-background min-h-screen  ',
          locale === 'fa' ? Shabnam.className : 'font-latin'
        )}>
        <Providers locale={locale} messages={messages}>
          {children}
          <Toaster richColors position='bottom-center' />
        </Providers>
      </body>
    </html>
  );
}
