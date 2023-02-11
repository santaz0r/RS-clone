const USER_ID_KEY = 'user-id';
const USER_ROLE = 'user-role';

const localStorageService = {
  setUser: ({ id, role }: { id: string; role: string }) => {
    localStorage.setItem(USER_ID_KEY, id);
    localStorage.setItem(USER_ROLE, role);
  },
  removeAuth: () => {
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(USER_ROLE);
  },
  hasUser: () => {
    const key = localStorage.getItem(USER_ID_KEY);
    return !!key;
  },
  getUserId: () => {
    const id = localStorage.getItem(USER_ID_KEY);
    const role = localStorage.getItem(USER_ROLE);
    return { id, role };
  },
};
export default localStorageService;
