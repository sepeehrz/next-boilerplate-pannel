import {axiosInstance as $axios} from '@/lib';
import {
  CaptchaResponseDTO,
  LoginWithEmailRequestDTO,
  LoginWithOtpRequestDTO,
  LoginOtpRequestDTO
} from '../types';
import buildContactFetchXml from '../utils/buildContactFetchXml';

export async function login(data: LoginWithEmailRequestDTO): Promise<object> {
  const response = await $axios.post('/auth/Login', data);

  return response.data;
}

export async function generateCaptcha(): Promise<CaptchaResponseDTO> {
  const response = await $axios.post('/captcha');
  return response.data;
}
export async function confirmUser(data: LoginOtpRequestDTO): Promise<object> {
  const response = await $axios.post('/auth/ConfirmUser', data);

  return response.data;
}
export async function checkUser(data: LoginWithOtpRequestDTO): Promise<object> {
  const response = await $axios.post('/auth/CheckUser', data);

  return response.data;
}
export async function getReferredUser(
  id: string
): Promise<{contactid: string}> {
  const fetchXml = buildContactFetchXml(id);

  const response = await $axios.post(
    '/service-request/Fetch/contacts',
    fetchXml,
    {
      headers: {
        'Content-Type': 'application/xml'
      }
    }
  );

  return response.data.value[0];
}
