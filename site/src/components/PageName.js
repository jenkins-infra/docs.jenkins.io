import React from "react";
import { Link } from "gatsby";
import jenkinsLogo from "../../../docs/images/modules/ROOT/assets/images/logos/jenkins/jenkins.png";
import typography from "../utils/typography";
const { rhythm } = typography;

const PageName = ({ title }) => (
    <Link style={{ textDecoration: `none` }} to="/">
        <h3
            style={{
                marginBottom: rhythm(1.5),
                fontFamily: "Georgia,serif",
                fontSize: "2rem",
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                justifyContent: "center",
                gap: "15px",
                color: "hsl(240, 15%, 10%)" ? "white" : "black",
            }}
        >
            <img
                src={jenkinsLogo}
                alt="Jenkins Logo"
                style={{
                    height: "80px",
                }}
            />{" "}
            {title}
        </h3>
    </Link>
);

export default PageName;
