import React from "react";
import Banner from "../Components/Banner";
import data from "../utils/object.json";
import products from "../utils/products.json";
import ProductCards from "../Components/productCards";
const Products = () => {
    return (
        <>
            <main className="inner-pages">
                <Banner data={data.products.banner} />
                <ProductCards data={products} />
            </main>
        </>
    );
};

export default Products;