import {confirmUser} from '../service';
import {useMutation} from '@tanstack/react-query';

export const useConfirmUser = () => {
  return useMutation({
    mutationFn: confirmUser,

    onError: error => {
      console.error('Login error:', error);
    }
  });
};
