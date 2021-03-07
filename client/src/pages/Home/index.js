import React, { useEffect } from 'react';

const Home = (props) => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      props.history.push('/login');
    } else {
      props.history.push('/dashboard');
    }
  }, []);

  return <div>Home</div>;
};

export default Home;
