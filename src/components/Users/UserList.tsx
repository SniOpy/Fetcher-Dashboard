import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CardContainer from '../CardContainer';
import Form from '../Form';

export default function UserList() {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

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
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Wrapper>
      <Title> Liste des utilisateurs</Title>
      <Form allUsers={allUsers} search={search} />

      <br />
      <CardContainer users={users} />
    </Wrapper>
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
