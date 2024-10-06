import React from "react";

const Supporters = () => (
    <div className="supporters">
        <center>
            <strong>
                We thank the following organizations for their support of the Jenkins project
                through free and/or open source licensing programs.
            </strong>
        </center>
        <ul
            style={{
                fontWeight: "bold",
                display: "flex",
                justifyContent: "space-evenly",
                listStyle: "none",
                padding: "0rem 10rem",
            }}
        >
            <li>
                <a href="https://atlassian.com/">Atlassian</a>
            </li>
            <li>
                <a href="https://www.datadoghq.com/">Datadog</a>
            </li>
            <li>
                <a href="https://www.digitalocean.com/">Digital Ocean</a>
            </li>
            <li>
                <a href="https://www.discourse.org/">Discourse</a>
            </li>
            <li>
                <a href="https://www.fastly.com/">Fastly</a>
            </li>
            <li>
                <a href="https://www.ibm.com/">IBM</a>
            </li>
            <li>
                <a href="https://www.netlify.com/">Netlify</a>
            </li>
            <li>
                <a href="https://pagerduty.com/">Pagerduty</a>
            </li>
            <li>
                <a href="https://sentry.io/">Sentry</a>
            </li>
            <li>
                <a href="https://www.tsinghua.edu.cn/">Tsinghua University</a>
            </li>
            <li>
                <a href="https://xmission.com/">XMission</a>
            </li>
        </ul>
    </div>
);

export default Supporters;
