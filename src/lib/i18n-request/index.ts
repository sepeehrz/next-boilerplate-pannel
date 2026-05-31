import {cookies} from 'next/headers';
import {defaultLocale} from '@/lib/i18n';
import {getRequestConfig} from 'next-intl/server';
import {getMessages} from '@/utils/getMessageI18n';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale =
    (cookieStore.get('lang')?.value as 'en' | 'fa') ?? defaultLocale;

  return {
    locale,
    messages: await getMessages(locale)
  };
});
