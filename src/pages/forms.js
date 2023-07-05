import React from "react";
import { FormTemplate } from "../components/form";

export const Forms = () => {
    const FORMS_LIST = [
        "Water Pollution",
        "Air Pollution",
        "Climate Patterns",
        "Deforestation Rate",
    ];

    return (
        <section className="form-section">
            <h2 className="heading">Choose a Survey Form!</h2>
            <div className="forms-container">
                {FORMS_LIST.map((form, index) => (
                    <FormTemplate key={index} image={index} name={form} />
                ))}
            </div>
        </section>
    );
};
