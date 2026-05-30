export type AuthMode = 'login' | 'otp';

export interface LoginWithEmailRequestDTO {
  captcha: string;
  password: string;
  username: string;
}

export interface LoginWithEmailResponseDTO {
  token: string;
}
export interface CaptchaResponseDTO {
  captchaImage: string;
}
export interface LoginOtpRequestDTO {
  username?: string;
  verifyCode: string;
}
export interface LoginWithOtpRequestDTO {
  username?: string;
  mobile?: string;
  email?: string;
  channel?: string | number;
}
