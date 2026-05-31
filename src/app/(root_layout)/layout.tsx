import '../globals.css';
import {cn} from '@/lib';
import {Metadata} from 'next';
import {Shabnam} from '@/lib/fonts';
import Providers from '@/providers/index';
import {Toaster} from '@/components/ui/sonner';
import {getTranslations} from 'next-intl/server';
import {AppSidebar} from '@/components/app-sidebar';
import {SidebarProvider} from '@/components/ui/sidebar';
import {AppHeader} from '@/components/app-header/index';
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
export default async function RootLayout({
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
          'bg-background min-h-screen',
          locale === 'fa' ? Shabnam.className : 'font-latin'
        )}>
        <Providers locale={locale} messages={messages}>
          <SidebarProvider>
            <div className='flex min-h-screen w-full'>
              <AppSidebar />

              <main className='flex-1 min-w-0 '>
                <AppHeader />
                {children}
                <Toaster richColors position='bottom-center' />
              </main>
            </div>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
