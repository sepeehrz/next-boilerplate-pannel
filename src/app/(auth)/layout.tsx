import {cn} from '@/lib';
import '../globals.css';
import {getConfig} from '@/utils';
import type {Metadata} from 'next';
import {Shabnam} from '@/lib/fonts';
import Providers from '@/providers/index';
import {Toaster} from '@/components/ui/sonner';
import {getLocaleFromCookie} from '@/utils/locale';
import {getMessages} from '@/utils/getMessageI18n';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocaleFromCookie();
  const config = await getConfig(locale);

  return {
    title: config.title,
    icons: {
      icon: config.favIcon,
      shortcut: config.favIcon
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
