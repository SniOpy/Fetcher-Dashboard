import { createContext } from 'react';
import { UserContextType } from '../types/UserContextType';

const defaultValue: UserContextType = {
  allUsers: [],
  setAllUsers: () => {},
  users: [],
  setUsers: () => {},
  search: '',
  setSearch: () => {},
};

const UserContext = createContext<UserContextType>(defaultValue);

export default UserContext;
