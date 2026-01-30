export type ApiError = {
  status?: number;
  message: string;
  details?: unknown;
};

export type TokenResponse = {
  accessToken: string;
  expiresIn: string | number;
};
