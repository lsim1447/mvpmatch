import React, { useState, useEffect, FC } from 'react';
import { API_BASE_PATH } from '../constants';

export interface IUser {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}

type UserContextProps = {
  users: IUser[];
};

export const UserContext = React.createContext<UserContextProps>({ users: [] });

export const UserProvider: FC = ({ children }) => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    fetch(API_BASE_PATH + '/users', {
      method: 'get'
    })
      .then((response: any) => {
        return response.json();
      })
      .then((users) => {
        setUsers(users.data);
      });
  }, []);

  return (
    <UserContext.Provider value={{ users }}>{children}</UserContext.Provider>
  );
};
