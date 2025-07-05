import React from "react";

const ProductCards = ({ data }) => {
    return (
        <section className="module-wrapper product-cards">
            <div className="product-cards-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        {data.map((item) => (
                            <div className="col-12 col-lg-3">
                                <div key={item.itemID} className="card">
                                   <div className="card-wrapper">
                                        <div className="img-wrapper">
                                            <img className="w-100 h-100 object-fit-cover" src={item.img} alt={item.title} />
                                        </div>
                                        <div className="card-content">
                                            <h5 className="card-title">{item.title}</h5>
                                        </div>
                                        
                                   </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

    );
};

export default ProductCards;
