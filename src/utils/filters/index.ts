import dayjs from '@/lib/day';

export function toPersianDigits(input: string | number): string {
  const str = String(input);
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.replace(/[0-9]/g, digit => persianDigits[+digit]);
}

export function currencyFormat(item: number) {
  return new Intl.NumberFormat().format(item);
}

export function formatDate(
  input: string | number,
  locale: string = 'fa'
): string | undefined {
  if (!input) {
    return undefined;
  }
  if (locale === 'en') {
    const jalaliDate = dayjs(input).format('YYYY/MM/DD');
    return jalaliDate;
  }
  const jalaliDate = dayjs(input).calendar('jalali').format('YYYY/MM/DD');
  return jalaliDate;
}

export function formatDateWithFormat(
  input: string | number,
  locale: string = 'fa',
  format: string = 'YYYY/MM/DD HH:mm'
): string | undefined {
  if (!input) return undefined;

  const date = dayjs.utc(input).tz('Asia/Tehran');

  if (locale === 'en') {
    return date.format(format);
  }

  return date.calendar('jalali').format(format);
}
