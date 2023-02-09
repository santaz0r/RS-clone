//  типы позже надо изменить
import { AxiosResponse } from 'axios';
import httpService from './httpService';

const doctorsEndpoint = 'doctors/';

const doctorsService = {
  get: async () => {
    const { data }: AxiosResponse<{ content: { [key: string]: string }[] }> = await httpService.get(doctorsEndpoint);
    return data;
  },
  remove: async (docId: string) => {
    const { data }: AxiosResponse<{ content: { [key: string]: string }[] }> = await httpService.delete(
      `${doctorsEndpoint}delete/${docId}`,
    );
    return data;
  },
  create: async (payload: { [key: string]: string }) => {
    const { data }: AxiosResponse<{ content: { [key: string]: string }[] }> = await httpService.post(
      `${doctorsEndpoint}register/`,
      payload,
    );
    return data;
  },
  update: async (payload: { [key: string]: string }) => {
    const { data }: AxiosResponse<{ content: { [key: string]: string } }> = await httpService.put(
      `${doctorsEndpoint}update/${payload._id}`,
      payload,
    );
    return data;
  },
};

export default doctorsService;
