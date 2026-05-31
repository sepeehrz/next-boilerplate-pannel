import {getReferredUser} from '../service';
import {useMutation} from '@tanstack/react-query';

export const useGetContactRefer = () => {
  return useMutation({
    mutationFn: (id: string) => getReferredUser(id),
    onError: error => {
      console.error('Referral error:', error);
    }
  });
};
