import configFile from '../config.json';

const specializationService = {
  fetchAll: async () => {
    const data = await fetch(`${configFile.apiEndpoint}specializations`)
      .then((res) => res.json())
      .then((list) => list);
    return data;
  },
};

export default specializationService;
