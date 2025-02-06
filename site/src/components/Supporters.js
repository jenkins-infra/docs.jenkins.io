import React from "react";

const Supporters = () => (
    <div
        className="supporters"
        style={{
            padding: "3rem",
        }}
    >
        <center>
            <p
                style={{
                    fontWeight: 500,
                    marginBottom: "1rem",
                }}
            >
                We thank the following organizations for their support of the Jenkins project
                through free and/or open source licensing programs.
            </p>
        </center>
        <ul
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                listStyleType: "none",
                textAlign: "center",
                margin: 0,
                gap: "1.5rem",
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
            <li>
                <a href="https://belnet.be/">Belnet</a>
            </li>
            <li>
                <a href="https://www.rwth-aachen.de/">RWTH Aachen University</a>
            </li>
            <li>
                <a href="https://hostico.ro/">Hostico</a>
            </li>
            <li>
                <a href="http://freedif.org/">FreeDif</a>
            </li>
            <li>
                <a href="https://servanamanaged.com/">Servana</a>
            </li>
            <li>
                <a href="https://www.yamagata-u.ac.jp/en/">Yamagata University</a>
            </li>
        </ul>
    </div>
);

export default Supporters;
