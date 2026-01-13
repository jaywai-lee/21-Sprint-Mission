export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user: {
    id: number;
    email: string;
    nickname: string;
  };
}

export interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
  passwordConfirmation: string;
}
