import React from 'react';
import UserList from './components/Users/UserList';
import styled from 'styled-components';

function App() {
  return (
    <AppStyled>
      <h1>Fetcher Dashboard</h1>

      <UserList />
    </AppStyled>
  );
}

export default App;

const AppStyled = styled.div`
  h1 {
    color: #fff;
  }
`;
