import { createContext } from 'react';

export default createContext({
  allUsers: [],
  setAllUsers: () => {},
  users: [],
  setUsers: () => {},
  search: '',
  setSearch: () => {},
});
