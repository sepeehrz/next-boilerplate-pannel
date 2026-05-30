import Link from 'next/link';
import {useTranslations} from 'next-intl';
import {Checkbox} from '@/components/ui/checkbox';

export function RememberForgetComponent() {
  const translate = useTranslations('loginPage.Form');
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center space-x-1'>
        <Checkbox className='leading-none mb-0.5 rounded-full border-primary cursor-pointer' />
        <p className='text-sm leading-none font-medium '>
          {translate('rememberMeText')}
        </p>
      </div>
      <Link
        href='/forgot-password'
        className='text-sm text-primary hover:text-primary/80 hover:underline'>
        {translate('forgetPasswordText')}
      </Link>
    </div>
  );
}
