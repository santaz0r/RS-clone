const USER_ID_KEY = 'user-id';
const USER_ROLE = 'user-role';
const USER_NAME = 'user-name';

const localStorageService = {
  setUser: ({ _id, role, username }: { _id: string; role: string; username: string }) => {
    localStorage.setItem(USER_ID_KEY, _id);
    localStorage.setItem(USER_ROLE, role);
    localStorage.setItem(USER_NAME, username);
  },
  removeAuth: () => {
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(USER_ROLE);
    localStorage.removeItem(USER_NAME);
  },
  hasUser: () => {
    const key = localStorage.getItem(USER_ID_KEY);
    return !!key;
  },
  getUserData: () => {
    const id = localStorage.getItem(USER_ID_KEY);
    const role = localStorage.getItem(USER_ROLE);
    const username = localStorage.getItem(USER_NAME);
    return { id, role, username };
  },
};
export default localStorageService;
