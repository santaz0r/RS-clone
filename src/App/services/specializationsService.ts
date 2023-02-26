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
  create: async (payload: { [key: string]: string }) => {
    const { data }: AxiosResponse<{ content: { [key: string]: string }[] }> = await httpService.post(
      `${specializationEndpoint}create/`,
      payload,
    );
    return data;
  },
  update: async (payload: { [key: string]: string }) => {
    const { data }: AxiosResponse<{ content: { [key: string]: string } }> = await httpService.put(
      `${specializationEndpoint}update/${payload._id}`,
      payload,
    );
    return data;
  },
  remove: async (specId: string) => {
    const { data }: AxiosResponse<{ content: { [key: string]: string }[] }> = await httpService.delete(
      `${specializationEndpoint}delete/${specId}`,
    );
    return data;
  },
};

export default specializationService;
