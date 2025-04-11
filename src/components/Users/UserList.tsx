import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { fakeUsers } from '../../data/fakeUsers';

export default function UserList() {
  const [users, setUsers] = useState(fakeUsers);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://reqres.in/api/users');
        const result = await response.json();

        if (!result) {
          throw new Error('network response not ok');
        }
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

      <form action="">
        <input type="text" />
      </form>

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
