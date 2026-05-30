import {useLocale} from 'next-intl';

export function useDirection() {
  const locale = useLocale();
  const isRTL = locale === 'fa';
  const isPersian = locale === 'fa';

  return {
    locale,
    dir: isRTL ? 'rtl' : 'ltr',
    isRTL,
    isPersian
  };
}
