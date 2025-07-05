import React, { useState } from "react";
import emailjs from 'emailjs-com';

function Form() {
    const [value, updateValue] = useState({ name: "", email: "", phone: "", productName: "" });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        // First name validation: only letters, min 2 characters, no spaces
        if (!value.name.trim()) newErrors.name = "First name is required";
        else if(!/^[A-Za-z][A-Za-z\s'-]{1,}$/.test(value.name.trim())) newErrors.name = "Enter valid name";

        if (!value.email.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) newErrors.email = "Invalid email format";

        if (!value.phone.trim()) newErrors.phone = "Phone number is required";
        else if (!/^\d{10}$/.test(value.phone)) newErrors.phone = "Phone must be 10 digits";

        if (!value.productName.trim()) newErrors.productName = "Product name is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleBlur = (e) => {
        const { name, value: fieldValue } = e.target;
        const fieldErrors = {};

        switch (name) {
            case "name":
                if (!fieldValue.trim()) fieldErrors.name = "Name is required";
               else if (!/^[A-Za-z][A-Za-z\s'-]{1,}$/.test(fieldValue.trim())) fieldErrors.name = "Enter valid name";
                break;
            case "email":
                if (!fieldValue.trim()) fieldErrors.email = "Email is required";
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValue)) fieldErrors.email = "Invalid email format";
                break;
            case "phone":
                if (!fieldValue.trim()) fieldErrors.phone = "Phone number is required";
                else if (!/^\d{10}$/.test(fieldValue)) fieldErrors.phone = "Phone must be 10 digits";
                break;
            case "productName":
                if (!fieldValue.trim()) fieldErrors.productName = "Product name is required";
                break;
            default:
                break;
        }

        setErrors(prev => ({ ...prev, ...fieldErrors }));
    };

    const handleChange = (e) => {
        const { name, value: fieldValue } = e.target;
        updateValue(prev => ({ ...prev, [name]: fieldValue }));

        // Clear error when user types
        setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const formData = {
            ...value,
            time: new Date().toLocaleString(),
        };

        emailjs.send('service_h7hnzve', 'template_bjgodnl', formData, 'zsnPkukI4-_Rz89dx')
            .then(() => {
                alert("Submitted successfully");
                updateValue({ name: "", email: "", phone: "", productName: "" });
                setErrors({});
            })
            .catch((error) => {
                alert("Try again");
                console.error('Email sending failed:', error.text);
            });
    };

    return (
        <div className="form-container">
            <form id="firstForm" onSubmit={handleSubmit} noValidate className="form-box">
                <h1 className="form-heading">Contact Form</h1>

                {["name", "email", "phone", "productName"].map((field) => (
                    <div key={field} className="form-group">
                        <label className="form-label">
                            {field === "productName" ? "Product Name" :
                                field.charAt(0).toUpperCase() + field.slice(1)}:
                        </label>
                        <input
                            type={field === "email" ? "email" : "text"}
                            name={field}
                            value={value[field]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`form-input ${errors[field] ? 'input-error' : ''}`}
                        />
                        {errors[field] && <p className="error-text">{errors[field]}</p>}
                    </div>
                ))}

                <div className="form-button-wrapper">
                    <button type="submit" className="submit-button">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Form;
