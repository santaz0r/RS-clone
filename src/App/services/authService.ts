import { AxiosResponse } from 'axios';
import httpService from './httpService';

const loginEndpoint = 'login/';

type TAuthResponse = {
  content: { _id: string; role: string; username: string };
};

const authService = {
  login: async ({ username, password }: { username: string; password: string }) => {
    const { data }: AxiosResponse<TAuthResponse> = await httpService.post(loginEndpoint, {
      username,
      password,
    });
    return data;
  },
  registerClient: async (payload: { [key: string]: string }) => {
    const { data }: AxiosResponse<TAuthResponse> = await httpService.post('clients/register', payload);
    return data;
  },
};

export default authService;
