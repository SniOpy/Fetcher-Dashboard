import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!search) return;

    // on filtre les utilisateurs selon le prénom, le nom ou l'email
    const filtered = allUsers.filter(
      (user) =>
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
        user.first_name.toLowerCase().includes(search.toLowerCase()) ||
        user.last_name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    setUsers(filtered);
  };

  const handleReset = () => {
    setUsers(allUsers);
    setSearch('');
  };

  return (
    <Wrapper>
      <Title> Liste des utilisateurs</Title>
      <Form onSubmit={handleSubmit}>
        <InputSearch
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Recherche un utilisateur"
        />
        <FormButton type="submit">Rechercher</FormButton>
        <FormButton type="button" onClick={handleReset}>
          Réinitialiser
        </FormButton>
      </Form>

      <br />
      <CardContainer>
        {users.map((user) => (
          <UserCardStyled key={user.id}>
            <img src={user.avatar} alt="Photo de profil" />
            <h2>{user.first_name + ' ' + user.last_name}</h2>
            <div className="user-info">
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          </UserCardStyled>
        ))}
      </CardContainer>
    </Wrapper>
  );
}

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.04);
  }
`;
const Form = styled.form`
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

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  justify-content: center;
`;

const UserCardStyled = styled.div`
  background: linear-gradient(145deg, #1c2541, #3a506b);
  border-radius: 18px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  width: 280px;
  padding: 30px 20px;
  text-align: center;
  animation: ${fadeInUp} 0.8s ease forwards;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(88, 166, 255, 0.25);
  }

  img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 15px;
    animation: ${pulse} 5s infinite;
    transition: transform 0.3s ease;
    border: 2px solid #58a6ff;

    &:hover {
      transform: scale(1.08) rotate(1deg);
    }
  }

  h2 {
    font-size: 20px;
    margin-bottom: 10px;
    color: #ffffff;
  }

  .user-info {
    text-align: left;
    margin-top: 15px;
    font-size: 14px;

    p {
      margin: 6px 0;
      color: #d1d5db;
    }

    strong {
      display: inline-block;
      width: 70px;
      color: #58a6ff;
    }
  }
`;
