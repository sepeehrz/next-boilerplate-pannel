import {cookies} from 'next/headers';
import {defaultLocale} from '@/lib/i18n';
import {getMessages} from './getMessageI18n';
import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale =
    (cookieStore.get('lang')?.value as 'en' | 'fa') ?? defaultLocale;

  return {
    locale,
    messages: await getMessages(locale)
  };
});
