import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import UserContext from '../context/UserContext';

export default function Form() {
  //! state
  const { allUsers, search, setSearch, setUsers } = useContext(UserContext);

  useEffect(() => {
    if (!allUsers.length) return;

    if (search.trim().length < 3) {
      setUsers(allUsers); // Réinitialise si moins de 3 lettres
      return;
    }

    const filtered = allUsers.filter(
      (user) =>
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
        user.first_name.toLowerCase().includes(search.toLowerCase()) ||
        user.last_name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    setUsers(filtered);
  }, [search, allUsers]);

  //! comportements

  const handleReset = () => {
    setUsers(allUsers);
    setSearch('');
  };
  //! affichage
  return (
    <FormStyled>
      <InputSearch
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder="Recherche un utilisateur"
      />
      <FormButton type="button" onClick={handleReset}>
        Réinitialiser
      </FormButton>
    </FormStyled>
  );
}

const FormStyled = styled.form`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const InputSearch = styled.input`
  padding: 10px 15px;
  border: none;
  border-radius: 12px;
  background-color: #1c2541;
  color: #f0f0f0;
  font-size: 16px;
  width: 250px;
  box-shadow: 0 0 8px rgba(88, 166, 255, 0.2);
  transition: all 0.3s ease;

  &::placeholder {
    color: #a0aec0;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 12px rgba(88, 166, 255, 0.5);
  }
`;

const FormButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 12px;
  background-color: #58a6ff;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3a8bd7;
  }
`;
