import {RefreshCcw} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {useCaptcha} from '../../hooks/useCaptcha';
interface IProps {
  value?: string;
  onChange?: (value: string) => void;
}
export function CaptchaFieldComponent({value, onChange}: IProps) {
  const {
    data: captchaData,
    refetch,
    isLoading,
    isFetching,
    isPending,
    error
  } = useCaptcha();

  const translate = useTranslations('captcha');
  const loadingTranslate = useTranslations('global');

  function refreshCaptcha() {
    refetch();
    onChange?.('');
  }
  return (
    <div className='flex items-center bg-background rounded-md mb-4 border border-input focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20'>
      <Input
        value={value}
        onChange={e => onChange?.(e.target.value)}
        className='focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-none text-center border-none'
        placeholder={translate('captcha')}
      />
      <div className='w-1/2'>
        {(isLoading || isPending || isFetching) && (
          <span className='text-xs '>
            {loadingTranslate('loading') + '...'}
          </span>
        )}
        {error && (
          <span className='text-sm'>{translate('captchaUnAvailable')}</span>
        )}
        {!isFetching && captchaData && (
          <img
            src={`data:image/png;base64,${captchaData.captchaImage}`}
            alt='captcha'
            className='h-full'
          />
        )}
      </div>
      <Button
        type='button'
        variant='outline'
        className=' rtl:rounded-tr-none rtl:rounded-br-none ltr:rounded-tl-none  ltr:rounded-bl-none'
        onClick={refreshCaptcha}>
        <RefreshCcw />
      </Button>
    </div>
  );
}
