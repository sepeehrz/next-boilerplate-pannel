import {login} from '../service';
import {useRouter} from 'next/navigation';
import {useMutation} from '@tanstack/react-query';

export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      router.replace('/');
    },
    onError: error => {
      console.error('Login error:', error);
    }
  });
};
