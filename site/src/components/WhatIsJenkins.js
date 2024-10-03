import React from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "gatsby";

const WhatIsJenkins = () => (
    <section style={{ padding: "3rem 12rem", display: "flex" }}>
        <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ minWidth: "30rem" }}
        >
            <img
                src="../../images/images/logos/jenkins/Jenkins-stop-the-war.svg"
                style={{ width: "400px" }}
                alt={"Jenkins Logo"}
            />
        </Box>
        <Box display={"flex"} flexDirection={"column"}>
            <h1>Jenkins</h1>
            <h2>Build great things at any scale</h2>
            <p>
                The leading open source automation server, Jenkins provides hundreds of plugins to
                support building, deploying and automating any project.
                <br />
                <br />
                We stand with the people of Ukraine. Please assist humanitarian efforts for the
                Ukrainian people and those affected by the military invasion of Ukraine by
                supporting international aid organizations, including the{" "}
                <a href="https://redcross.org.ua/en/donate/">Ukrainian Red Cross</a>
            </p>
            <div
                style={{
                    display: "flex",
                    width: "fit-content",
                    justifyContent: "flex-start",
                    gap: "1rem",
                }}
            >
                <Link to="/download">
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "#616161", borderRadius: "0.5rem" }}
                    >
                        Download
                    </Button>
                </Link>
                <a href="https://vandit1604.github.io/jenkins-docs/user-docs/2.401.3/index.html">
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "#D32F2F", borderRadius: "0.5rem" }}
                    >
                        Documentation
                    </Button>
                </a>
            </div>
        </Box>
    </section>
);

export default WhatIsJenkins;
