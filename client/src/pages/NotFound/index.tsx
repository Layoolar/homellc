import React from 'react';
import { Link } from 'react-router-dom';
import '../NotFound/notFound.scss'

const Index = () => {
  return (
    <div className="not-found">
      <h1>404 Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/login">Go Home</Link>
    </div>
  );
}


export default Index;
