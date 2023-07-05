import React, { useState } from "react";
import axios from 'axios';
import { useGetBaseUrl } from "../hooks/useGetBaseUrl";

export const Contact = () => {

    const BASE_URL = useGetBaseUrl();
    const [messageFormat, setMessageFormat] = useState({
        email: "",
        message: ""
    });

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            const response = await axios.post(BASE_URL + "/message", messageFormat);
            alert(response.data.message);
            setMessageFormat({
                email: "",
                message: ""
            });
        } catch (error) {
            console.error("Something went wrong! Please reload the page.");
        }
    }

    return (
        <section className="contact-section">
            <h2 className="heading">Say Hi! or Give Us Feedback here.</h2>
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-box">
                    <input placeholder="Email" name="email" id="email" value={messageFormat.email} onChange={(event) => setMessageFormat({...messageFormat, email: event.target.value})} type="email" required autoComplete="off"/>
                </div>
                <div className="form-box">
                    <input placeholder="Message" name="message" id="message" value={messageFormat.message} onChange={(event) => setMessageFormat({...messageFormat, message: event.target.value})} type="text" required autoComplete="off"/>
                </div>
                <button type="submit" className="send-btn">Send</button>
            </form>
        </section>
    );
};
