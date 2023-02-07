const specializationService = {
  fetchAll: async () => {
    const data = await fetch('https://rs-clone-real-server-production.up.railway.app/specializations')
      .then((res) => res.json())
      .then((list) => list);
    return data;
  },
};

export default specializationService;
