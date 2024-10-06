import React, { useEffect, useState } from "react";
import jenkinsLogo from "../../../docs/images/modules/ROOT/assets/images/logos/jenkins/jenkins.png";
import Seo from "../components/Seo";
import MajorEventCard from "../components/MajorEventCard";
import IndexPageLayout from "../layouts";
import typography from "../utils/typography";
import { graphql } from "gatsby";
const { rhythm } = typography;

const EventPage = ({ data }) => {
    const event = data.allFile.nodes[0].childrenAsciidoc;

    const [selectedTimeZone, setSelectedTimeZone] = useState(""); // State to store the selected time zone

    useEffect(() => {
        // Detect the user's device time zone
        const deviceTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setSelectedTimeZone(deviceTimeZone);
    }, []); // Run only once on component mount

    const handleTimeZoneChange = (event) => {
        setSelectedTimeZone(event.target.value);
    };

    // Generate the calendar iframe URL
    const calendarSrc = `https://calendar.google.com/calendar/b/1/embed?showCalendars=0&height=600&wkst=1&bgcolor=%23FFFFFF&mode=WEEK&src=4ss12f0mqr3tbp1t2fe369slf4%40group.calendar.google.com&color=%2329527A&ctz=${encodeURIComponent(
        selectedTimeZone || "auto",
    )}`;

    // To hide events after their ending date
    let currentDate = new Date();
    let eventDate = new Date(event[0].pageAttributes.eventstartdate);

    return (
        <IndexPageLayout>
            <h3
                style={{
                    color: `black`,
                    marginBottom: rhythm(1.5),
                    fontFamily: "Georgia,serif",
                    fontSize: "2.7rem",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    justifyContent: "center",
                    gap: "15px",
                }}
            >
                <img
                    src={jenkinsLogo}
                    alt="Jenkins Logo"
                    style={{
                        height: "5rem",
                    }}
                />{" "}
                Jenkins Events
            </h3>
            <p>
                There are many online and local Jenkins-related events: including conferences,
                meetups, webinars, hackathons, etc.
            </p>
            <ul>
                <li>
                    <a href="add link">Jenkins Online Meetup.</a> Our project has a virtual meetup
                    for users and developers. We organize regular events and webinars there.
                </li>
                <li>
                    <a href="add link">Local meetups.</a> Jenkins contributors organize many local
                    CI/CD and Jenkins meetups around the world. There might be one in your city!
                </li>
                <li>
                    <a href="add link">Contributor Summits.</a> We organize a few contributor
                    summits every year. It brings together current community members and future
                    contributors to learn, meet, and help shape the future of Jenkins.
                </li>
                <li>
                    <a href="add link">DevOps World.</a> CloudBees organizes the DevOps World
                    conference and includes Jenkins topics in the conference agenda.
                </li>
                <li>
                    <a href="add link">Hacktoberfest.</a> Jenkins project is participating to
                    Hacktoberfest.
                </li>
            </ul>
            <section>
                <h2>Major Events</h2>
                <div style={{ marginLeft: "2rem" }}>
                    {
                        // show events 30 days before the event date
                        currentDate < eventDate &&
                        Math.round(
                            (eventDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24),
                        ) < 30 ? (
                            <MajorEventCard
                                title={event[0].document.title}
                                location={event[0].pageAttributes.eventlocation}
                                date={event[0].pageAttributes.eventstartdate}
                                link={event[0].pageAttributes.eventlink}
                                description={
                                    <span dangerouslySetInnerHTML={{ __html: event[0].html }} />
                                }
                            />
                        ) : (
                            <p>
                                There are no upcoming major events registered in the database. If
                                you see that your event is missing, please submit a change to our
                                website.
                                <br />
                                <a href="https://github.com/jenkins-infra/jenkins.io/blob/master/CONTRIBUTING.adoc#adding-an-event">
                                    &gt; How to add an event to the Jenkins website?
                                </a>
                            </p>
                        )
                    }
                </div>
            </section>
            <section>
                <h2>Event Calendar</h2>
                <p>
                    We have a calendar which lists events related to Jenkins, including regular SIG
                    and project meetings. This calendar is also available in the ({" "}
                    <a href="https://calendar.google.com/calendar/ical/4ss12f0mqr3tbp1t2fe369slf4%40group.calendar.google.com/public/basic.ics">
                        .ics format
                    </a>{" "}
                    )
                </p>
                <iframe
                    src={calendarSrc}
                    style={{ border: 0, width: "100%", height: "600px" }}
                ></iframe>
                {/* Dropdown to select time zone */}
                <p>
                    View calendar using TimeZone:
                    <select
                        id="selected_timezone"
                        value={selectedTimeZone}
                        onChange={handleTimeZoneChange}
                    >
                        <option value="">(auto)</option>
                        <option value="GMT">GMT</option>
                        <option value="CET">CET</option>
                        <option value="America/New_York">US Eastern</option>
                        <option value="America/Los_Angeles">US Pacific</option>
                        <option value="Asia/Tokyo">Tokyo</option>
                        <option value="Asia/Shanghai">Shanghai</option>
                    </select>
                </p>
            </section>
        </IndexPageLayout>
    );
};

export const Head = () => <Seo title="Jenkins Events" />;

export default EventPage;

export const pageQuery = graphql`
    {
        allFile(
            filter: { sourceInstanceName: { eq: "events" }, extension: { eq: "adoc" } }
            sort: { childrenAsciidoc: { pageAttributes: { eventstartdate: DESC } } }
        ) {
            nodes {
                childrenAsciidoc {
                    document {
                        title
                    }
                    html
                    pageAttributes {
                        eventlocation
                        eventstartdate
                        eventlink
                    }
                }
            }
        }
    }
`;
