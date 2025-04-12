import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CardContainer from '../CardContainer';
import Form from '../Form';
import UserContext from '../../context/UserContext';
import { User } from '../../types/user';

export default function UserList() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>('');

  const userContextValue = {
    allUsers,
    setAllUsers,
    users,
    setUsers,
    search,
    setSearch,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://reqres.in/api/users');
        const result = await response.json();
        if (!result) {
          throw new Error('network response not ok');
        }
        setAllUsers(result.data);
        setUsers(result.data);
      } catch (error) {
        console.error((error as Error).message);
      }
    };

    fetchData();
  }, []);

  return (
    <UserContext.Provider value={userContextValue}>
      <Wrapper>
        <Title> Liste des utilisateurs</Title>
        <Form />

        <br />
        <CardContainer />
      </Wrapper>
    </UserContext.Provider>
  );
}

const Wrapper = styled.div`
  padding: 60px 20px;
  background-color: #0b132b; /* Bleu nuit profond */
  min-height: 100vh;
  color: #f0f0f0;
`;

const Title = styled.h2`
  font-size: 32px;
  text-align: center;
  color: #58a6ff;
  margin-bottom: 40px;
`;
