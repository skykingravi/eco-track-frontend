import React from "react";

export const Home = () => {
    const HEADING = "WANT TO UNCOVER THE ENVIRONMENTAL REALITIES OF OUR WORLD?";
    const ABOUT_CONTENT = [
        {
            heading: "User-Driven Data Collection",
            text: "Join the vibrant EcoTrack community that actively contributes to our comprehensive database. Your participation shapes the accuracy and impact of our predictions.",
        },
        {
            heading: "Interactive Maps",
            text: "Explore pollution and weather conditions with EcoTrack's immersive, user-friendly maps. Customize your experience by zooming, filtering, and toggling layers, unraveling localized insights that matter to you.",
        },
        {
            heading: "Real-Time Updates",
            text: "Stay one step ahead with EcoTrack's real-time updates on pollution and weather conditions. Our platform keeps you in sync with your environment, empowering proactive decision-making.",
        },
        {
            heading: "Advanced Prediction Algorithms",
            text: "EcoTrack employs cutting-edge algorithms to analyze vast datasets, delivering precise forecasts. Our sophisticated technology harnesses the power of data to provide actionable insights.",
        },
        {
            heading: "Reach Out to Us",
            text: "Connect with the EcoTrack team to share your feedback, suggestions, or concerns. Your voice matters to us, and we are dedicated to providing exceptional user support.",
        },
    ];

    const handleMouseOver = (event) => {
        event.target.style.color = "transparent";
        event.target.style.webkitTextStroke = "2px black";
    }
    
    const handleMouseLeave = (event) => {
        setTimeout(() => {
            event.target.style.color = "black";
            event.target.style.webkitTextStroke = "1px black";
        }, 1000);
    }

    return (
        <>
            <section className="hero-section">
                <h1 className="hero-section-heading">
                    {HEADING.split('').map((character, index) => {
                        return (<span className={`home-heading-character`} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} key={index}>{character}</span>)
                    })}
                </h1>
                <a href="#about" className="btn">
                    MORE INFO
                </a>
            </section>
            <section className="about-section" id="about">
                {ABOUT_CONTENT.map((content, index) => {
                    return (
                        <div className="about-card" key={index}>
                            <h1 className="about-heading">{content.heading}</h1>
                            <h3 className="about-text">{content.text}</h3>
                        </div>
                    );
                })}
            </section>
        </>
    );
};
