import '../globals.css';
import {cn} from '@/lib';
import {getConfig} from '@/utils';
import type {Metadata} from 'next';
import Providers from '@/providers/index';
import {Toaster} from '@/components/ui/sonner';
import {Shabnam} from '@/lib/fonts';
import {AppHeader} from '@/components/app-header/index';
import {getLocaleFromCookie} from '@/utils/locale';
import {getMessages} from '@/utils/getMessageI18n';
import {AppSidebar} from '@/components/app-sidebar';
import {SidebarProvider} from '@/components/ui/sidebar';

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
