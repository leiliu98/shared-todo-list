'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/hello')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(error => {
        //console.error('Failed to fetch message:', error);
        //setMessage('Failed to connect to backend');
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Hello World</h1>
      <p className="text-xl">{message}</p>
    </main>
  );
}