// src/app/users/page.tsx
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

type User = {
  id: number;
  name: string;
  email: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        setUsers(res.data);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Users (Axios)</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.id}. {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
