export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface RegisterResponse {
  data: {
    status: boolean;
    message: string;
  };
}
