import 'server-only';

import {cookies} from 'next/headers';
import {defaultLocale} from '@/lib';

export const SUPPORTED_LOCALES = ['fa', 'en'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export async function getLocaleFromCookie(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('lang')?.value;

  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  return defaultLocale;
}
