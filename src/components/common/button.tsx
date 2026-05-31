import {Loader2} from 'lucide-react';
import {type ButtonProps, Button as ButtonBase} from '../ui/button';

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

export function Button({
  loading = false,
  children,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <ButtonBase disabled={loading || disabled} {...props}>
      {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
      {children}
    </ButtonBase>
  );
}
