import { AxiosResponse } from 'axios';
import httpService from './httpService';

const specializationEndpoint = 'specializations/';

const specializationService = {
  get: async () => {
    const { data }: AxiosResponse<{ content: { _id: string; name: string }[] }> = await httpService.get(
      specializationEndpoint,
    );
    return data;
  },
};

export default specializationService;
