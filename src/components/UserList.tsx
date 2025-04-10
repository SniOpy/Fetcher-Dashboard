import React, { useState } from 'react';
import { fakeUsers } from '../data/fakeUsers';

export default function UserList() {
  const [users, setUsers] = useState(fakeUsers);

  return (
    <div>
      <h2>Liste des utilisateurs </h2>

      <ul>
        {users.map((user) => {
          return <li key={user.id}>{user.name}</li>;
        })}
      </ul>
    </div>
  );
}
