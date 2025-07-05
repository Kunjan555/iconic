import React from "react";
import Banner from "../Components/Banner";
import ConfigText from "../Components/ConfigText";
import data from "../utils/object.json";

const About = () => {
    return (
       <>
        <main className="inner-pages">
              <Banner data={data.about.banner} />
              <ConfigText html={data.about.content} />
        </main>
       </>
    );
};

export default About;