import {useQuery} from '@tanstack/react-query';
import {generateCaptcha} from '../service';

export const useCaptcha = () => {
  return useQuery({
    queryKey: ['generate-captcha'],
    queryFn: () => generateCaptcha()
  });
};
