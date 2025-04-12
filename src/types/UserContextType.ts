import { User } from './user';

export type UserContextType = {
  allUsers: User[];
  setAllUsers: (users: User[]) => void;
  users: User[];
  setUsers: (users: User[]) => void;
  search: string;
  setSearch: (value: string) => void;
};
