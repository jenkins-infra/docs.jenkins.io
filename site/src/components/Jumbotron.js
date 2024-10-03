import React from "react";
import { sponsorsJumbotron } from "../css/index.module.css";

const Jumbotron = () => (
    <ul className={sponsorsJumbotron}>
        <li>
            <a href="https://cloudbees.com" rel="noopener noreferrer" target="_blank">
                <img
                    alt="CloudBees, Inc."
                    src="../../images/images/sponsors/cloudbees.png"
                    title="CloudBees, Inc."
                />
            </a>
        </li>
        <li>
            <a href="https://osuosl.org" rel="noopener noreferrer" target="_blank">
                <img
                    alt="Oregon State University Open Source Lab"
                    src="../../images/images/sponsors/osuosl.png"
                    title="Oregon State University Open Source Lab"
                />
            </a>
        </li>
        <li>
            <a href="https://cd.foundation/" rel="noopener noreferrer" target="_blank">
                <img
                    alt="Continuous Delivery Foundation"
                    src="../../images/images/sponsors/cdf.png"
                    title="Continuous Delivery Foundation"
                />
            </a>
        </li>
        <li>
            <a href="https://redhat.com" rel="noopener noreferrer" target="_blank">
                <img
                    alt="Red Hat, Inc."
                    src="../../images/images/sponsors/redhat.png"
                    title="Red Hat, Inc."
                />
            </a>
        </li>
        <li>
            <a href="https://aws.amazon.com/" rel="noopener noreferrer" target="_blank">
                <img alt="AWS" src="../../images/images/sponsors/aws.png" title="AWS" />
            </a>
        </li>
        <li>
            <a href="https://github.com" rel="noopener noreferrer" target="_blank">
                <img
                    alt="GitHub, Inc."
                    src="../../images/images/sponsors/github.png"
                    title="GitHub, Inc."
                />
            </a>
        </li>
        <li>
            <a href="https://jfrog.com" rel="noopener noreferrer" target="_blank">
                <img alt="JFrog" src="../../images/images/sponsors/jfrog.png" title="JFrog" />
            </a>
        </li>
    </ul>
);

export default Jumbotron;
