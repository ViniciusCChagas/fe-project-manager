export interface ILoginParamsDto {
  email: string;
  password: string;
}

export interface ILoginResponseDto {
  user: {
    name: string;
    email: string;
  };
}
