'use client';

import {useLocale} from 'next-intl';
import {useRouter} from 'next/navigation';

type Locale = 'fa' | 'en';

export function useChangeLanguage() {
  const router = useRouter();
  const locale = useLocale();

  const changeLanguage = (newLocale: Locale) => {
    if (newLocale === locale) return;

    document.cookie = `lang=${newLocale}; path=/; samesite=lax`;
    router.refresh();
  };

  return {
    locale,
    changeLanguage
  };
}
