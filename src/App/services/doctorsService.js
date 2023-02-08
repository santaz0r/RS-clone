// файл .js чтобы не писать типы, позже надо изменить
import configFile from '../config.json';

const doctorsEndpoint = 'doctors/';

const testService = {
  fetchAll: async () => {
    const data = await fetch(configFile.apiEndpoint + doctorsEndpoint)
      .then((res) => res.json())
      .then((list) => list);

    return data;
  },
  remove: async (docId) => {
    const data = await fetch(`${configFile.apiEndpoint}${doctorsEndpoint}/delete/${docId}`, {
      method: 'DELETE',
    });
    return data.ok;
  },
};

export default testService;
