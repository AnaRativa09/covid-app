import React from 'react';

import Header from '../components/Header';
import Map from '../components/Map';

const Home = () => {
  const viewTitle = 'Home';

  return (
    <>
      <Header />
      <h1>{viewTitle}</h1>
      <Map />
    </>
  );
};

export default Home;
