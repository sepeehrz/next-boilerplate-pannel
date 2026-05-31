import {FormComponent} from './form';
import {useTranslations} from 'next-intl';
import {LanguageSwitcher} from '../switchLang';

export function LoginComponent() {
  const translate = useTranslations('loginPage');

  return (
    <div className='flex'>
      <div className='w-full lg:w-2/5 min-h-screen bg-background flex items-center justify-center p-4'>
        <FormComponent />
      </div>
      <div className='hidden lg:flex lg:w-3/5 min-h-screen bg-linear-to-br from-primary/5 to-primary/10 items-center justify-center p-8 relative'>
        <div className='max-w-lg text-center space-y-6'>
          <div className='w-48 h-48 bg-primary/20 rounded-full mx-auto flex items-center justify-center'>
            <div className='w-32 h-32 bg-primary/30 rounded-full flex items-center justify-center'>
              <div className='w-16 h-16 bg-primary rounded-full'></div>
            </div>
          </div>
          <div className='space-y-4'>
            <h2 className='text-3xl font-bold text-foreground'>
              {translate('title')}
            </h2>
            <p className='text-lg text-muted-foreground'>
              {translate('description')}
            </p>
          </div>
          <div className='absolute top-4 ltr:right-4 rtl:left-4'>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}
