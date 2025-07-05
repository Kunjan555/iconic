import React from "react";
import data from "../utils/object.json";
import Form from "../Components/Form";
import Banner from "../Components/Banner";
function Contact() {
    return (
        <>
            <main className="inner-pages">
                <Banner data={data.contact.banner} />
                <Form />
            </main>
        </>
    );
}

export default Contact;