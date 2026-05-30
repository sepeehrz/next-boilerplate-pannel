import {useMutation} from '@tanstack/react-query';
import {getReferredUser} from '../service';

export const useGetContactRefer = () => {
  return useMutation({
    mutationFn: (id: string) => getReferredUser(id),
    onError: error => {
      console.error('Referral error:', error);
    }
  });
};
