import { api } from '../../../core/api/api.ts';
import { ICreateUserParams } from '../models/CreateUserDtos.ts';
import { ILoginParamsDto, ILoginResponseDto } from '../models/LoginDtos.ts';

export async function createUser(data: ICreateUserParams): Promise<void> {
  return api.post('/user', data);
}

export async function loginUser(
  data: ILoginParamsDto
): Promise<ILoginResponseDto> {
  const response = await api.post('/login', data);
  return response.data;
}
