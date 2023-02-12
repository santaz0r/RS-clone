import { AxiosResponse } from 'axios';
import httpService from './httpService';

const loginEndpoint = 'login/';

const authService = {
  login: async ({ username, password }: { username: string; password: string }) => {
    const { data }: AxiosResponse<{ content: { id: string; role: string } }> = await httpService.post(loginEndpoint, {
      username,
      password,
    });
    return data;
  },
  registerClient: async (payload: { [key: string]: string }) => {
    const { data } = await httpService.post('clients/register', payload);
    return data;
  },
};

export default authService;
