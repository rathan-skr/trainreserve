// pages/404.tsx
import React from 'react';
import Router from 'next/router';

const NotFoundPage: React.FC = () => {
  if (typeof window !== 'undefined') {
    Router.replace('/Authentication/Login'); // Redirect to login page for any unauthorized access
  }

  return <p>Loading...</p>;
};

export default NotFoundPage;
