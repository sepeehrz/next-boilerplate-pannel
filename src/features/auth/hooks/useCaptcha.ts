import {generateCaptcha} from '../service';
import {useQuery} from '@tanstack/react-query';

export const useCaptcha = () => {
  return useQuery({
    queryKey: ['generate-captcha'],
    queryFn: () => generateCaptcha()
  });
};
