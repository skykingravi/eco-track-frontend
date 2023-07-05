import React, { useEffect, useState } from "react";
import worldMap from "../images/world_map.jpeg";
import axios from "axios";
import { useGetBaseUrl } from "../hooks/useGetBaseUrl";

export const Data = () => {
    const [size, setSize] = useState({
        width: 2.00661 * window.innerHeight,
        height: window.innerHeight,
    });
    const [showMap, setShowMap] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [dataFetchedTime, setDataFetchedTime] = useState("");
    const [formSelected, setFormSelected] = useState("Water Pollution Data");
    const [data, setData] = useState([]);

    const BASE_URL = useGetBaseUrl();

    useEffect(() => {
        window.addEventListener("resize", myFunc);
        window.addEventListener("load", myFunc);
        return () => {
            window.removeEventListener("resize", myFunc);
            window.removeEventListener("load", myFunc);
        };
    });

    const SECRET = process.env.SECRET;

    const DATA_OPTIONS = [
        "Water Pollution Data",
        "Air Pollution Data",
        "Climate Patterns Data",
        "Deforestation Rate Data",
    ];

    const myFunc = () => {
        const WIDTH = 2.00661 * window.innerHeight;
        const HEIGHT = window.innerHeight;

        setSize({ ...size, width: WIDTH, height: HEIGHT });
    };

    const getMapPosition = (longitude, latitude) => {
        const left = ((longitude + 180) * (size.width / 360)).toString() + "px";
        const top = ((90 - latitude) * (size.height / 180)).toString() + "px";
        return { left, top };
    };

    const getCurrentTime = () => {
        const dt = new Date();
        const time = `${dt.getHours().toString(10).padStart(2, "0")}:${dt
            .getMinutes()
            .toString(10)
            .padStart(2, "0")}`;
        const date = `${dt.getDate().toString(10).padStart(2, "0")}-${dt
            .getMonth()
            .toString(10)
            .padStart(2, "0")}-${dt.getFullYear()}`;
        return `${time}, ${date}`;
    };

    const getUrl = (name) => {
        if (name === "Water Pollution Data") {
            return BASE_URL + "/forms/waterPollutionForm";
        } else if (name === "Air Pollution Data") {
            return BASE_URL + "/forms/airPollutionForm";
        } else if (name === "Climate Patterns Data") {
            return BASE_URL + "/forms/climatePatternsForm";
        } else if (name === "Deforestation Rate Data") {
            return BASE_URL + "/forms/deforestationRateForm";
        }
    };

    const handleClick = async () => {
        setIsLoading(true);

        try {
            const response = await axios.get(
                `${getUrl(formSelected)}/data/${SECRET}`
            );
            if (!response.data.message) {
                setData(response.data);
            }
            else {
                alert(response.data.message);
            }
            setDataFetchedTime(getCurrentTime);
            setShowMap(true);
        } catch (error) {
            console.error("Something went wrong! Please reload the page.");
        }

        setIsLoading(false);
    };

    return (
        <section className="data-section">
            <h1 className="heading">Want to See the Real-Time Updates?</h1>
            <div className="fields-container">
                <select
                    className="select-form"
                    value={formSelected}
                    onChange={(event) => setFormSelected(event.target.value)}
                >
                    {DATA_OPTIONS.map((value, index) => {
                        return (
                            <option key={index} value={value}>
                                {value}
                            </option>
                        );
                    })}
                </select>
                <button
                    onClick={handleClick}
                    type="button"
                    className="show-btn"
                >
                    Show
                </button>
            </div>
            {showMap &&
                (data?.length !== 0 ? (
                    <>
                        <h4 className="time-message">
                            Last Data Fetched at {dataFetchedTime}
                        </h4>
                        <div
                            className={
                                !isLoading && !isImageLoading
                                    ? "map-wrapper"
                                    : "map-wrapper loading"
                            }
                        >
                            <img
                                src={worldMap}
                                alt="Not Found"
                                id="interactive-map"
                                onLoad={() => setIsImageLoading(false)}
                            />
                            {data?.map((value) => {
                                return (
                                    <div
                                        key={value.key}
                                        className="dot"
                                        title={`${value.city.toUpperCase()}, ${value.country.toUpperCase()}\n(${
                                            value.text
                                        })`}
                                        style={{
                                            top: getMapPosition(
                                                value.longitude,
                                                value.latitude
                                            ).top,
                                            left: getMapPosition(
                                                value.longitude,
                                                value.latitude
                                            ).left,
                                            backgroundColor: `var(--${value.color})`,
                                        }}
                                    ></div>
                                );
                            })}
                        </div>
                        <table className="data-table">
                            <caption>Data Table</caption>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Data Provider</th>
                                    <th>City</th>
                                    <th>Country</th>
                                    <th>Danger Level</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((value, index) => {
                                    return (
                                        <tr key={value.key}>
                                            <td>{index + 1}</td>
                                            <td>{value.user}</td>
                                            <td>{value.city.toUpperCase()}</td>
                                            <td>
                                                {value.country.toUpperCase()}
                                            </td>
                                            <td
                                                style={{
                                                    borderRight: `5px solid var(--${value.color})`,
                                                }}
                                            >
                                                {value.level}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <h1 className="empty-heading">No Data to be Shown!</h1>
                ))}
        </section>
    );
};
