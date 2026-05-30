import {checkUser} from '../service';
import {useMutation} from '@tanstack/react-query';

export const useCheckUser = () => {
  return useMutation({
    mutationFn: checkUser
  });
};
