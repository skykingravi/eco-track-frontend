import React from "react";

export const Home = () => {
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

    return (
        <>
            <section className="hero-section">
                <svg
                    id="clouds"
                    width="250"
                    height="129"
                    viewBox="0 0 250 129"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M129.178 0.0581791C128.804 0.0974578 127.563 0.234933 126.421 0.352769C116.122 1.45257 105.587 5.73395 97.0797 12.3328C94.697 14.1789 90.798 17.9496 88.6712 20.4635C84.6147 25.2555 80.9519 31.7168 79.0812 37.3926C78.7858 38.296 78.4511 39.0227 78.3526 39.0227C78.2541 39.0227 77.7421 38.8066 77.2302 38.5513C71.0862 35.4876 62.7959 36.2732 57.1049 40.4956C55.7264 41.5169 53.5012 43.8736 52.497 45.4055C50.5671 48.3121 49.5235 51.3365 49.2872 54.6752C49.2281 55.6768 49.1099 56.5017 49.0508 56.5017C48.9918 56.5017 47.7315 56.3249 46.2743 56.1089C32.1551 54.0271 17.7208 58.0139 8.56402 66.557C2.1838 72.4881 -0.868469 80.3439 0.214593 88.0425C1.04166 93.9539 4.56653 100.042 9.70616 104.343C18.0556 111.354 29.28 114.831 41.6663 114.222C48.0859 113.908 54.1117 112.435 59.5861 109.823L61.7719 108.801L62.4217 110.392C66.0057 119.308 73.8431 125.809 83.4922 127.91C86.0522 128.48 92.7475 128.441 95.2287 127.851C100.723 126.516 105.153 124.159 108.934 120.546L110.864 118.7L112.459 119.426C121.636 123.609 132.84 123.983 142.234 120.408C144.577 119.505 148.2 117.619 149.894 116.382C150.622 115.852 151.292 115.42 151.351 115.42C151.43 115.42 152.198 116.107 153.084 116.952C160.449 123.963 171.141 128.401 182.051 128.932C192.783 129.462 202.412 126.909 210.998 121.213C213.598 119.505 217.004 116.598 218.796 114.615C219.879 113.397 222.4 110.196 222.872 109.43C222.971 109.273 223.581 109.233 224.783 109.312C229.213 109.587 233.368 108.801 237.149 106.955C246.542 102.36 251.583 92.3239 249.555 82.2293C249.142 80.1671 248.61 78.6942 247.507 76.5338C244.14 69.9743 237.661 65.3983 230.099 64.22C227.638 63.8468 223.7 63.9843 221.474 64.5342L219.938 64.9073L218.028 62.9434C211.274 55.9911 201.94 51.258 192.153 49.8243L190.44 49.569L190.322 48.6656C189.475 41.9686 188.018 36.9802 185.202 31.2651C182.464 25.6875 179.156 21.0723 174.785 16.732C165.805 7.81573 154.305 2.21851 141.367 0.431327C139.26 0.136737 130.753 -0.118575 129.178 0.0581791Z"
                        fill="white"
                    />
                </svg>
                <h1 className="hero-section-heading">
                    WANT TO UNCOVER THE ENVIRONMENTAL REALITIES OF OUR WORLD?
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
