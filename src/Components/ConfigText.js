import React from 'react';

const ConfigText = ({ html }) => {
  console.log(html);
  return (
    <section className="module-wrapper config-text">
      <div className="config-text-wrapper">
            <div className="container-fluid">
                <div className='row justify-content-center'>
                    <div className='col-12 col-lg-12'>
                        <div className='config-text-content' data-animate data-animation="fade-up" dangerouslySetInnerHTML={{ __html: html }}></div>
                    </div>
                </div>
            </div>
      </div>
    </section>
  );
};

export default ConfigText;
