import React from "react";

const MajorEventCard = ({ title, location, date, link, description }) => {
    // Create a new Date object using the provided ISO 8601 formatted date
    const eventDate = new Date(date);

    // Extract day, month, and day of the week from the event date
    const eventDay = eventDate.getDate();
    const eventMonth = eventDate.toLocaleString("en-us", { month: "long" });
    const eventDayOfWeek = eventDate.toLocaleString("en-us", { weekday: "long" });

    // Extract the time from the event date
    const eventTime = eventDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

    return (
        <a href={link} target="_blank" rel="noreferrer noopener" style={{ width: "6rem" }}>
            <div
                style={{
                    width: "6rem",
                    height: "6rem",
                    margin: "10px 0",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    display: "flex",
                    justifyContent: "center",
                    color: "#fff",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        height: "100%",
                        width: "100%",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                        background: "rgb(176 19 58)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div className="date" style={{ fontSize: ".75rem" }}>
                        {eventMonth} {eventDay}
                    </div>
                </div>
                <div
                    className="date"
                    style={{
                        width: "100%",
                        height: "100%",
                        background: "rgb(85 127 183)",
                        borderBottomLeftRadius: "10px",
                        borderBottomRightRadius: "10px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div className="time" style={{ fontSize: "1.2rem", marginTop: "10px" }}>
                        {eventTime}
                    </div>
                    <div className="day-of-week">{eventDayOfWeek}</div>
                </div>
            </div>
            <div
                className="eventInfo"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    width: "6rem",
                }}
            >
                <h5 className="title" style={{ fontSize: "1.5rem" }}>
                    <span
                        style={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            color: "#000",
                            textWrap: "nowrap",
                        }}
                    >
                        {title}
                    </span>
                </h5>
                <p style={{ fontSize: "1rem", textWrap: "nowrap" }}>{location}</p>
                <p style={{ fontStyle: "italic", fontSize: "1.1rem" }}>{description}</p>
            </div>
        </a>
    );
};

export default MajorEventCard;
