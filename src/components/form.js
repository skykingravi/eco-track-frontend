import React, { useState } from "react";
import axios from "axios";
import water_pollution from "../images/water-pollution.jpg";
import air_pollution from "../images/air-pollution.jpg";
import climate_patterns from "../images/climate-patterns.jpg";
import deforestation_rate from "../images/deforestation-rate.jpg";
import { useGetBaseUrl } from "../hooks/useGetBaseUrl";

export const FormTemplate = ({ image, name }) => {
    const [showForm, setShowForm] = useState(false);
    const [geolocationErrorMessage, setGeolocationErrorMessage] = useState("");
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [CurrentQuestion, setCurrentQuestion] = useState(0);
    const [response, setResponse] = useState({
        email: "",
        location: [],
        optionsArray: [],
    });

    const BASE_URL = useGetBaseUrl();

    const IMAGES = [
        water_pollution,
        air_pollution,
        climate_patterns,
        deforestation_rate,
    ];

    const DATA = [
        {
            formName: "Water Pollution",
            formQuestions: [
                {
                    question:
                        "What color of the water you commonly observe in your tap water or in any water body nearby you, if it is?",
                    options: [
                        "Clear Transparent",
                        "Blue/Dark Blue",
                        "Orange/Brown",
                        "Green/Dark Green",
                    ],
                },
                {
                    question:
                        "What amount or level of unwanted substances like garbage etc you see in any water body nearby you?",
                    options: [
                        "No water body nearby",
                        "Very less",
                        "Intermediate Level",
                        "Very high level",
                    ],
                },
                {
                    question:
                        "Have you noticed any dead fish, or plant or body of acquatic animals in any of the nearby water body to you?",
                    options: [
                        "No water body nearby",
                        "No, I havent seen anything like this",
                        "Sometimes",
                        "yes , very frequently",
                    ],
                },
                {
                    question:
                        "Have you heard anyone in your surrounding, who is having any of the following diseases or related?",
                    options: [
                        "None of any",
                        "Typhoid or Dysentry",
                        "Cholera",
                        "Gastroentritis or Hepatitis A",
                    ],
                },
                {
                    question:
                        "How will you overall rate the pollution level in water you see or use?",
                    options: ["0-3", "3-6", "6-8", "8-10"],
                },
            ],
        },
        {
            formName: "Air Pollution",
            formQuestions: [
                {
                    question:
                        "While going to your work or school, how far you are able to see the road clearly without any smog or fog or any air particles?",
                    options: [
                        "Almost 5km and above",
                        "almost between 2km and 5km",
                        "almost between 1km and 2km",
                        "Less than 1km",
                    ],
                },

                {
                    question:
                        "While breathing in open air, do you smell any unsual odour or anything?",
                    options: [
                        "No there is no such smell",
                        "Yes , but not aware of what kind",
                        "Some irritating smell",
                        "Yes, like burning plastic, or kind of choking odour.",
                    ],
                },
                {
                    question:
                        "Do you feel irritating with your eyes in open air?",
                    options: [
                        "No , I dont feel irritating",
                        "Sometimes",
                        "Yes i feel",
                        "Yes very much and daily",
                    ],
                },
                {
                    question:
                        "Have you diagnosed any of the following diseases in your surroundings?",
                    options: [
                        "None of the below diseases",
                        "Allergies or Immune system disorder",
                        "Chronic Respiratory",
                        "Chronic Cardiovascular",
                    ],
                },
                {
                    question:
                        "How will you overall rate the pollution level in air you see?",
                    options: ["0-3", "3-6", "6-8", "8-10"],
                },
            ],
        },
        {
            formName: "Climate Patterns",
            formQuestions: [
                {
                    question:
                        "Have you observed any changes in weather patterns in your area over past few years?",
                    options: [
                        "No possible change",
                        "Not sure",
                        "Yes, slight changes",
                        "Yes, significant changes",
                    ],
                },
                {
                    question:
                        "Have you experienced any extreme weather conditon like extreme heat or cold?",
                    options: [
                        "No",
                        "Extreme rain",
                        "Extreme cold",
                        "Extreme heat",
                    ],
                },
                {
                    question:
                        "Do every shift in weather takes place on time or you feel its not on time as always?",
                    options: [
                        "No change in time",
                        "Not aware ",
                        "Slight change",
                        "Very unsual shifting",
                    ],
                },
                {
                    question:
                        "At your nearby places , have you experienced loss due to weather conditions like extreme hot etc?",
                    options: [
                        "No",
                        "No aware",
                        "Slight loss",
                        "Very much loss",
                    ],
                },
                {
                    question:
                        "Have you experienced any natural disaster recently?",
                    options: [
                        "No such disasteer",
                        "not aware",
                        "Yes , but its wasnt very harmful",
                        "yes , it was very harmful ",
                    ],
                },
            ],
        },
        {
            formName: "Deforestation Rate",
            formQuestions: [
                {
                    question:
                        "How would you describe the current state of forests in this area?",
                    options: [
                        "Thriving and dense",
                        "Unchanged over time",
                        "Declining and sparse",
                        "I don't know",
                    ],
                },
                {
                    question:
                        "Have you observed any signs of deforestation in this area?",

                    options: [
                        " No, no signs of deforestation",
                        " I don't know",
                        " Yes, minor tree cutting",
                        "Yes, significant tree cutting",
                    ],
                },
                {
                    question:
                        "What percentage of forested area do you estimate has been lost in this region?",
                    options: [
                        "Less than 20%",
                        "20% to 40%",
                        "40% to 60%",
                        "More than 60%",
                    ],
                },
                {
                    question:
                        "Which of the following factors do you think contribute to deforestation?",
                    options: [
                        "Agricultural expansion",
                        "Logging and timber extraction",
                        "Urbanization and infrastructure development",
                        "All of the above",
                    ],
                },
                {
                    question:
                        "Do you believe that the deforestation rate in this area is increasing, decreasing, or stable?                        ",
                    options: [
                        "Decreasing",
                        "Stable",
                        "Not aware",
                        "Increasing",
                    ],
                },
            ],
        },
    ];

    const getFormQuestions = (name) => {
        const filteredArray = DATA.filter((value) => value.formName === name);
        return filteredArray[0].formQuestions;
    };

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, (error) =>
                setGeolocationErrorMessage("You've denied Geolocation.")
            );
        } else {
            setGeolocationErrorMessage(
                "Your Browser doesn't support Geolocation."
            );
        }
    }

    function showPosition(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setResponse({ ...response, location: [longitude, latitude] });
    }

    const getText = () => {
        if (CurrentQuestion === 0) {
            return "VERIFY";
        } else if (CurrentQuestion === getFormQuestions(name).length) {
            return "SUBMIT";
        } else {
            return "NEXT";
        }
    };

    const handleLeftButtonClick = () => {
        if (CurrentQuestion === 0) {
            clearStates();
        } else {
            setCurrentQuestion(CurrentQuestion - 1);
        }
    };

    const getUrl = (name) => {
        if (name === "Water Pollution") {
            return BASE_URL + "/forms/waterPollutionForm";
        } else if (name === "Air Pollution") {
            return BASE_URL + "/forms/airPollutionForm";
        } else if (name === "Climate Patterns") {
            return BASE_URL + "/forms/climatePatternsForm";
        } else if (name === "Deforestation Rate") {
            return BASE_URL + "/forms/deforestationRateForm";
        }
    };

    const handleRightButtonClick = async () => {
        if (CurrentQuestion === 0) {
            setIsLoading(true);
            try {
                const res = await axios.get(
                    getUrl(name) + "/" + response.email
                );
                if (res.data.message !== "Use another email please.") {
                    setEmailErrorMessage("");
                    setCurrentQuestion(CurrentQuestion + 1);
                } else {
                    setEmailErrorMessage(res.data.message);
                }
            } catch (error) {
                setEmailErrorMessage("Something went wrong!");
                console.error("Something went wrong! Please reload the page.");
            }
            setIsLoading(false);
        } else if (CurrentQuestion === getFormQuestions(name).length) {
            setIsLoading(true);
            try {
                const res = await axios.post(getUrl(name), response);
                alert(res.data.message);
            } catch (error) {
                console.error("Something went wrong! Please reload the page.");
            }
            clearStates();
        } else {
            setCurrentQuestion(CurrentQuestion + 1);
        }
    };

    const handleShowingForm = () => {
        setShowForm(true);
        getUserLocation();
    };

    const clearStates = () => {
        setCurrentQuestion(0);
        setResponse({
            email: "",
            location: [],
            optionsArray: [],
        });
        setEmailErrorMessage("");
        setGeolocationErrorMessage("");
        setIsLoading(false);
        setShowForm(false);
    };
    const handleKeyPress = (event) => {
        if (
            event.key === "Enter" &&
            !(
                !isValidEmail(response.email) ||
                geolocationErrorMessage !== "" ||
                emailErrorMessage !== ""
            )
        ) {
            handleRightButtonClick();
        }
    };

    return (
        <>
            <div className="form-heading" onClick={handleShowingForm}>
                {name}
            </div>
            {showForm && (
                <div
                    className={isImageLoading ? "form-wrapper loading" : "form-wrapper"}
                >
                    <img
                                src={IMAGES[image]}
                                alt="Not Found"
                                onLoad={() => setIsImageLoading(false)}
                                onError={() => setIsImageLoading(true)}
                            />
                    <div className={isLoading ? "form loading" : "form"}>
                        {CurrentQuestion === 0 ? (
                            <>
                                <h1 className="question">
                                    Enter your Email here
                                </h1>
                                <input
                                    className="email-input"
                                    type="email"
                                    placeholder="ex- ravi123@gmail.com"
                                    value={response.email}
                                    onKeyDown={handleKeyPress}
                                    onChange={(event) => {
                                        setEmailErrorMessage("");
                                        setResponse({
                                            ...response,
                                            email: event.target.value,
                                        });
                                    }}
                                ></input>
                                {geolocationErrorMessage && (
                                    <h4 className="error-message">
                                        {geolocationErrorMessage}
                                    </h4>
                                )}
                                {emailErrorMessage && (
                                    <h4 className="error-message">
                                        {emailErrorMessage}
                                    </h4>
                                )}
                            </>
                        ) : (
                            <>
                                <h4 className="progress-text">
                                    {`${name} Question ${CurrentQuestion}/${
                                        getFormQuestions(name).length
                                    }`}
                                </h4>
                                <h1 className="question">
                                    {
                                        getFormQuestions(name)[
                                            CurrentQuestion - 1
                                        ].question
                                    }
                                </h1>

                                {getFormQuestions(name)[
                                    CurrentQuestion - 1
                                ].options.map((option, index) => {
                                    return (
                                        <h3
                                            key={index}
                                            className={
                                                response.optionsArray[
                                                    CurrentQuestion - 1
                                                ] === index
                                                    ? "option clicked"
                                                    : "option"
                                            }
                                            onClick={() =>
                                                setResponse({
                                                    ...response,
                                                    optionsArray: [
                                                        ...response.optionsArray.splice(
                                                            0,
                                                            CurrentQuestion - 1
                                                        ),
                                                        index,
                                                        ...response.optionsArray.splice(
                                                            CurrentQuestion
                                                        ),
                                                    ],
                                                })
                                            }
                                        >
                                            {option}
                                        </h3>
                                    );
                                })}
                            </>
                        )}
                        <button
                            type="button"
                            className="left-btn"
                            onClick={handleLeftButtonClick}
                        >
                            {CurrentQuestion === 0 ? "CANCEL" : "BACK"}
                        </button>
                        <button
                            type="button"
                            className="right-btn"
                            onClick={handleRightButtonClick}
                            disabled={
                                !isValidEmail(response.email) ||
                                geolocationErrorMessage !== "" ||
                                emailErrorMessage !== "" ||
                                (CurrentQuestion !== 0 &&
                                    response.optionsArray[
                                        CurrentQuestion - 1
                                    ] === undefined)
                            }
                        >
                            {getText()}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
