'use client';

import {useRef} from 'react';
import {useTranslations} from 'next-intl';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/common/button';
import {RefreshCw, ShieldCheck} from 'lucide-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from '@/components/ui/input-group';

interface IProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function CaptchaFieldComponent({value = '', onChange}: IProps) {
  const t = useTranslations('auth.captcha');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // const [captchaCode, setCaptchaCode] = useState('');

  function refreshCaptcha() {}

  return (
    <div className='space-y-2'>
      <Label htmlFor='captcha'>{t('securityCode')}</Label>

      <div className='flex items-center gap-3'>
        <canvas
          ref={canvasRef}
          width={180}
          height={56}
          className='rounded-md border border-border'
          aria-label={t('captchaImage')}
        />

        <Button
          onClick={refreshCaptcha}
          className='inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'
          aria-label={t('refreshCaptcha')}
          title={t('refreshCaptcha')}>
          <RefreshCw className='h-3.5 w-3.5' />
          {t('refresh')}
        </Button>
      </div>

      <InputGroup>
        <InputGroupInput
          id='captcha'
          placeholder={t('enterCaptchaCode')}
          autoComplete='off'
          className='px-0'
          value={value}
          onChange={e => onChange?.(e.target.value)}
        />
        <InputGroupAddon className='ps-1.5'>
          <ShieldCheck />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
