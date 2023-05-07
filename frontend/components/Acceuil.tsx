import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

export default function Acceuil() {
  
  const { isLoading, error, data } = useQuery(["api"], () => {
    fetch("http://localhost:8000/api", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => res.json());
  });

 
  if (isLoading) return 'Loading...';
  if (error) return `Error: ${error.message}`;
  return (
    <div>
      <h1>Bonjour {data.email}</h1>
    </div>
  );
};
