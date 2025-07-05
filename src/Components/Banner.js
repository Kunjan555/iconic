// src/pages/Home.js
import React from 'react';

const Banner = ({data}) => {
  return (
    <>
        <section className='banner position-relative' data-component-animation >
            <div className='banner-wrapper h-100 position-relative d-flex justify-content-center align-items-center'>
                <div className='banner-image w-100 h-100 position-absolute t-0 l-0'>
                    <img className='w-100 h-100 object-fit-cover' src={data.img} alt='banner' />
                </div>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-12 col-lg-6'>
                            <div className='banner-content position-relative z-1'>
                                <h1 className='banner-title' data-animate >{data.title}</h1> 
                                <h6 className='banner-description' data-animate data-animation-delay="500">{data.description1}</h6>
                                <h6 className='banner-description' data-animate data-animation-delay="500">{data.description2}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  );
};

export default Banner;
