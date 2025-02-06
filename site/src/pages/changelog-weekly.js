import React, { useCallback, useEffect, useState } from "react";
import { graphql } from "gatsby";
import PageName from "../components/PageName";
import Seo from "../components/Seo";
import "../css/changelog.css";
import IndexPageLayout from "../layouts";

const ChangelogWeekly = ({ data }) => {
    const [ratingData, setRatingData] = useState({});

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch("https://rating.jenkins.io/rate/result.php");
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const scriptText = await response.text();
            const jsonData = parseDataFromScript(scriptText);
            setRatingData(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    const rate = useCallback((version, rating) => {
        let issue = "";
        if (rating <= 0) {
            issue = prompt("Please provide issue number from our JIRA causing trouble:", "");
            if (issue === null) return; // Cancelled
            if (issue === "") {
                issue = prompt(
                    "Are you sure you do not want to provide an issue reference? It really helps us improve Jenkins.\nEnter issue number, or leave empty to skip:",
                    "",
                );
                if (issue === null) return; // Cancelled
            }
        }

        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://rating.jenkins.io/rate/submit.php?version=${encodeURIComponent(
            version,
        )}&rating=${rating}&issue=${encodeURIComponent(issue)}`;
        script.onload = () => {
            alert("Thanks!");
            window.location.reload();
        };
        script.onreadystatechange = () => {
            // For IE
            if (script.readyState === "loaded" || script.readyState === "complete") {
                alert("Thanks!");
                window.location.reload();
            }
        };
        document.head.appendChild(script);
    }, []);

    const parseDataFromScript = (scriptText) => {
        const jsonString = scriptText.match(/\{.*\}/s)[0];
        const jsonData = JSON.parse(jsonString);
        return jsonData;
    };

    return (
        <IndexPageLayout>
            <PageName title={"Weekly Changelog"} />
            <div style={{ textAlign: "end" }}>
                <div className="iconlegend">
                    Legend:
                    <ul className="image">
                        <li className="security">security fix</li>
                        <li className="bug">major bug fix</li>
                        <li className="bug">bug fix</li>
                        <li className="rfe">major enhancement</li>
                        <li className="rfe">enhancement</li>
                    </ul>
                </div>
                <div style={{ margin: "10px 0", width: "100%" }}>
                    <div className="iconlegend">
                        Community feedback:
                        <ul className="feedback">
                            <li className="sunny">no major issues</li>
                            <li className="cloudy">notable issues</li>
                            <li className="storm">required rollback</li>
                        </ul>
                    </div>
                </div>
            </div>
            {data.allWeeklyYaml.edges.map(({ node }) => (
                <>
                    <h3>
                        What's new in {node.version} ({node.date}){" "}
                    </h3>
                    <div>
                        {ratingData[node.version] && (
                            <div style={{ display: "inline-block" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: "2px",
                                        marginLeft: "2rem",
                                    }}
                                >
                                    <p style={{ display: "inline" }}>
                                        {ratingData[node.version][0]}
                                    </p>
                                    <img
                                        className="rateoffset"
                                        src="../../images/images/changelog/sunny.svg"
                                        alt="Sunny"
                                        title="No major issue with this release"
                                        style={{ display: "inline" }}
                                        onClick={() => rate(node.version, 1)}
                                    />
                                    <p style={{ display: "inline" }}>
                                        {ratingData[node.version][1]}
                                    </p>
                                    <img
                                        className="rateoffset"
                                        src="../../images/images/changelog/cloudy.svg"
                                        alt="Cloudy"
                                        title="I experienced notable issues"
                                        style={{ display: "inline" }}
                                        onClick={() => rate(node.version, -1)}
                                    />
                                    <p style={{ display: "inline" }}>
                                        {ratingData[node.version][2]}
                                    </p>
                                    <img
                                        className="rateoffset"
                                        src="../../images/images/changelog/storm.svg"
                                        alt="Storm"
                                        title="I had to roll back"
                                        style={{ display: "inline" }}
                                        onClick={() => rate(node.version, -2)}
                                    />
                                </div>

                                {ratingData[node.version]
                                    .slice(3)
                                    .some((_, index) => index % 2 === 0) && (
                                    <div style={{ marginBottom: "1rem" }}>
                                        <span style={{ display: "inline" }}>
                                            Community reported issues:{" "}
                                        </span>
                                        {ratingData[node.version]
                                            .slice(3)
                                            .reduce((acc, value, index, array) => {
                                                if (index % 2 === 0) {
                                                    acc.push(
                                                        <React.Fragment key={value}>
                                                            {array[index + 1]} x
                                                            <a
                                                                href={
                                                                    "https://issues.jenkins.io/browse/JENKINS-" +
                                                                    value
                                                                }
                                                            >
                                                                JENKINS-{value}
                                                            </a>{" "}
                                                        </React.Fragment>,
                                                    );
                                                }
                                                return acc;
                                            }, [])}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    {node.banner ? (
                        <div className="banner">
                            <span dangerouslySetInnerHTML={{ __html: node.banner }} />
                        </div>
                    ) : null}
                    {node.lts_baseline && <h4> Changes since {node.lts_baseline}:</h4>}
                    <ul className="image">
                        {node.changes?.map((change, i) => (
                            <li
                                key={`${change}-${i}`}
                                className={`${change.type}`}
                                style={{ marginBottom: "5px" }}
                            >
                                <span dangerouslySetInnerHTML={{ __html: change.message }} />
                                {"("}
                                {change.references && change.references.length > 0 && (
                                    <>
                                        {change.references.map((ref, j) => (
                                            <span key={`${ref}-${j}`}>
                                                {ref.issue && (
                                                    <span>
                                                        <a
                                                            href={
                                                                "https://issues.jenkins.io/browse/JENKINS-" +
                                                                ref.issue
                                                            }
                                                        >
                                                            {" issue " + ref.issue}
                                                        </a>
                                                        {", "}
                                                    </span>
                                                )}
                                                {ref.url && (
                                                    <span>
                                                        <a href={ref.url}>{ref.title}</a>
                                                        {", "}
                                                    </span>
                                                )}
                                                {ref.pull && (
                                                    <span>
                                                        {", "}
                                                        <a
                                                            href={
                                                                "https://github.com/jenkinsci/jenkins/pull/" +
                                                                ref.pull
                                                            }
                                                        >
                                                            {" pull " + ref.pull}
                                                        </a>
                                                    </span>
                                                )}
                                            </span>
                                        ))}
                                    </>
                                )}
                                {(!change.references || change.references.length === 0) && (
                                    <>
                                        {change.issue && (
                                            <span>
                                                <a
                                                    href={
                                                        "https://issues.jenkins.io/browse/JENKINS-" +
                                                        change.issue
                                                    }
                                                >
                                                    {" issue " + change.issue}
                                                </a>
                                                {", "}
                                            </span>
                                        )}
                                        {change.url && (
                                            <span>
                                                <a href={change.url}>{change.title}</a>
                                                {", "}
                                            </span>
                                        )}
                                        {change.pull && (
                                            <span>
                                                <a
                                                    href={
                                                        "https://github.com/jenkinsci/jenkins/pull/" +
                                                        change.pull
                                                    }
                                                >
                                                    {" pull " + change.pull}
                                                </a>
                                                {", "}
                                            </span>
                                        )}
                                    </>
                                )}
                                {") "}
                            </li>
                        ))}
                    </ul>
                    {node.lts_changes && node.lts_changes.length > 0 && (
                        <h4>Notable changes since {node.lts_predecessor ?? ""}:</h4>
                    )}
                    <ul>
                        {node.lts_changes?.map((references, i) => (
                            <li key={`${references}-${i}`} style={{ marginBottom: "5px" }}>
                                <span dangerouslySetInnerHTML={{ __html: references.message }} />
                                {"( "}
                                {references.references && references.references.length > 0 ? (
                                    references.references.map((ref, j) => (
                                        <span key={`${ref}-${j}`}>
                                            {ref.issue && (
                                                <span>
                                                    <a
                                                        href={
                                                            "https://issues.jenkins.io/browse/JENKINS-" +
                                                            ref.issue
                                                        }
                                                    >
                                                        {" issue " + ref.issue + ", "}
                                                    </a>
                                                </span>
                                            )}
                                            {ref.url && (
                                                <span>
                                                    <a href={ref.url}>{ref.title},</a>
                                                </span>
                                            )}
                                            {ref.pull && (
                                                <span>
                                                    <a
                                                        href={
                                                            "https://github.com/jenkinsci/jenkins/pull/" +
                                                            ref.pull
                                                        }
                                                    >
                                                        {" pull " + ref.pull + ", "}
                                                    </a>
                                                </span>
                                            )}
                                        </span>
                                    ))
                                ) : (
                                    <>
                                        {references.issue && (
                                            <span>
                                                <a
                                                    href={
                                                        "https://issues.jenkins.io/browse/JENKINS-" +
                                                        references.issue
                                                    }
                                                >
                                                    {" issue " + references.issue + ", "}
                                                </a>
                                            </span>
                                        )}
                                        {references.url && (
                                            <span>
                                                <a href={references.url}>{references.title}, </a>
                                            </span>
                                        )}
                                        {references.pull && (
                                            <span>
                                                <a
                                                    href={
                                                        "https://github.com/jenkinsci/jenkins/pull/" +
                                                        references.pull
                                                    }
                                                >
                                                    {" pull " + references.pull + ", "}
                                                </a>
                                            </span>
                                        )}
                                    </>
                                )}
                                {" )"}
                            </li>
                        ))}
                    </ul>
                </>
            ))}
        </IndexPageLayout>
    );
};

export const Head = () => <Seo title="Jenkins Weekly Changelogs" />;

export default ChangelogWeekly;

export const pageQuery = graphql`
    query {
        allWeeklyYaml(sort: { date: DESC }, limit: 30) {
            edges {
                node {
                    date(formatString: "YYYY-MM-DD")
                    version
                    banner
                    changes {
                        type
                        category
                        pull
                        pr_title
                        message
                        issue
                        references {
                            url
                            title
                            issue
                            pull
                        }
                    }
                }
            }
        }
    }
`;
