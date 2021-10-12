import React from 'react';

import Header from '../components/Header';

const Home = () => {
  const viewTitle = 'Home';

  return (
    <>
      <Header />
      <h1>{viewTitle}</h1>
    </>
  );
};

export default Home;
