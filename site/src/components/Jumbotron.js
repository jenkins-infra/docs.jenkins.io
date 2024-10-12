import React from "react";
import { sponsorsJumbotron } from "../css/index.module.css";

const Jumbotron = () => (
    <ul className={sponsorsJumbotron}>
        <li>
            <a href="https://cloudbees.com" rel="noopener noreferrer" target="_blank">
                <img
                    alt="CloudBees, Inc."
                    src="../../images/images/sponsors/cloudbees.svg"
                    title="CloudBees, Inc."
                />
            </a>
        </li>
        <li>
            <a href="https://osuosl.org" rel="noopener noreferrer" target="_blank">
                <img
                    alt="Oregon State University Open Source Lab"
                    src="../../images/images/sponsors/osuosl.svg"
                    title="Oregon State University Open Source Lab"
                />
            </a>
        </li>
        <li>
            <a href="https://cd.foundation/" rel="noopener noreferrer" target="_blank">
                <img
                    alt="Continuous Delivery Foundation"
                    src="../../images/images/sponsors/cdf.svg"
                    title="Continuous Delivery Foundation"
                />
            </a>
        </li>
        <li>
            <a href="https://aws.amazon.com/" rel="noopener noreferrer" target="_blank">
                <img alt="AWS" src="../../images/images/sponsors/aws.svg" title="AWS" />
            </a>
        </li>
        <li>
            <a href="https://github.com" rel="noopener noreferrer" target="_blank">
                <img
                    alt="GitHub, Inc."
                    src="../../images/images/sponsors/github.svg"
                    title="GitHub, Inc."
                />
            </a>
        </li>
        <li>
            <a href="https://jfrog.com" rel="noopener noreferrer" target="_blank">
                <img alt="JFrog" src="../../images/images/sponsors/jfrog.svg" title="JFrog" />
            </a>
        </li>
    </ul>
);

export default Jumbotron;
