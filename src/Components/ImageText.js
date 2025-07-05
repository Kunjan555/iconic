import React from 'react';

const ImageText = ({ IsLeftImg , data}) => {
  return (
    <section className="img-text module-wrapper" data-component-animation>
        <div className="container-fluid">
        <div className="img-text-wrapper">
          <div className="row row-gap-5 align-items-center">
            <div className={`col-12 col-lg-4 offset-lg-1 ${IsLeftImg ? 'order-2 order-lg-2' : 'order-2 order-lg-1'}`}>
              <div className="content-wrapper">
                <h4 className="title" data-animate>{data.title}</h4>
                <div
                  className="intro"
                  data-animate
                  data-animation-delay="500"
                    dangerouslySetInnerHTML={{ __html: data.description }}

                >
                </div>
              </div>
              <div className='cta-wrapper' data-animate data-animation-delay="1000">
                <a className='cta cta-primary' href={data.link}> {data.linktext}</a>
              </div>
            </div>

            <div className={`col-12 col-lg-5 offset-lg-1 ${IsLeftImg ? 'order-1 order-lg-1' : 'order-1 order-lg-2 '}`}>
              <div
                className="img-wrapper"
                data-animate
              >
                <img
                  className="w-100 h-100 object-fit-cover"
                  src={data.image}
                  alt="img-text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageText;
