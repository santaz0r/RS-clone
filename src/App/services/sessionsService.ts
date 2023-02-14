import { AxiosResponse } from 'axios';
import httpService from './httpService';
import { TSession } from '../types/types';

const sessionsEndpoint = 'sessions/';

const sessionsService = {
  getAll: async () => {
    const { data }: AxiosResponse<{ content: TSession[] }> = await httpService.get(sessionsEndpoint);
    return data;
  },
};

export default sessionsService;
