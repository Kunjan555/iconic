import React from 'react';
import Banner from '../Components/Banner';
import ImageText from '../Components/ImageText';
import data from '../utils/object.json';
const Home = () => {
  return (
    <>
      <Banner data={data.home.banner} />
      <ImageText IsLeftImg={false} data={data.home.imgText.about} />
      <ImageText IsLeftImg={true} data={data.home.imgText.product}  />
      <ImageText IsLeftImg={false} data={data.home.imgText.contact}  />
    </>
  );
};

export default Home;
