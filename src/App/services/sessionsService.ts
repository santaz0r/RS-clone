import { AxiosResponse } from 'axios';
import httpService from './httpService';
import { TSession } from '../types/types';

const sessionsEndpoint = 'sessions/';

const sessionsService = {
  getAll: async () => {
    const { data }: AxiosResponse<{ content: TSession[] }> = await httpService.get(sessionsEndpoint);
    return data;
  },
  create: async (payload: { [key: string]: string }) => {
    const { data } = await httpService.post(`${sessionsEndpoint}create/`, payload);
    return data;
  },
};

export default sessionsService;
