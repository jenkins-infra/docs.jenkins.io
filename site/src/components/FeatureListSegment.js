import React from "react";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import ExtensionOutlinedIcon from "@mui/icons-material/ExtensionOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import MergeTypeIcon from "@mui/icons-material/MergeType";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SocialDistanceOutlinedIcon from "@mui/icons-material/SocialDistanceOutlined";
import { box, container, featureInfo } from "../css/index.module.css";
import { Box } from "@mui/material";

const FeatureListSegement = () => (
    <div style={{ padding: 36 }}>
        <div className={container}>
            <div className={box}>
                <div>
                    <Box
                        className={featureInfo}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem",
                        }}
                    >
                        <MergeTypeIcon style={{ fontSize: "2rem" }} />
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                justifyContent: "center",
                            }}
                        >
                            <h4>Continuous Integration and Continuous Delivery</h4>
                        </Box>
                    </Box>
                    <p>
                        As an extensible automation server, Jenkins can be used as a simple CI
                        server or turned into the continuous delivery hub for any project.
                    </p>
                </div>
            </div>
            <div className={box}>
                <div>
                    <Box
                        className={featureInfo}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem",
                        }}
                    >
                        <FileDownloadOutlinedIcon style={{ fontSize: "2rem" }} />
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                justifyContent: "center",
                            }}
                        >
                            <h4>Easy installation</h4>
                        </Box>
                    </Box>
                    <p>
                        Jenkins is a self-contained Java-based program, ready to run out-of-the-box,
                        with packages for Windows, Linux, macOS and other Unix-like operating
                        systems.
                    </p>
                </div>
            </div>
            <div className={box}>
                <div>
                    <Box
                        className={featureInfo}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem",
                        }}
                    >
                        <SettingsOutlinedIcon style={{ fontSize: "2rem" }} />
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                justifyContent: "center",
                            }}
                        >
                            <h4>Easy configuration</h4>
                        </Box>
                    </Box>
                    <p>
                        Jenkins can be easily set up and configured via its web interface, which
                        includes on-the-fly error checks and built-in help.
                    </p>
                </div>
            </div>
            <div className={box}>
                <div>
                    <Box
                        className={featureInfo}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem",
                        }}
                    >
                        <AppsOutlinedIcon style={{ fontSize: "2rem" }} />
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                justifyContent: "center",
                            }}
                        >
                            <h4>Plugins</h4>
                        </Box>
                    </Box>
                    <p>
                        With hundreds of plugins in the Update Center, Jenkins integrates with
                        practically every tool in the continuous integration and continuous delivery
                        toolchain.
                    </p>
                </div>
            </div>
            <div className={box}>
                <div>
                    <Box
                        className={featureInfo}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem",
                        }}
                    >
                        <ExtensionOutlinedIcon style={{ fontSize: "2rem" }} />
                        <ion-icon
                            name="extension-puzzle-outline"
                            role="img"
                            className="md hydrated"
                        ></ion-icon>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                justifyContent: "center",
                            }}
                        >
                            <h4>Extensible</h4>
                        </Box>
                    </Box>
                    <p>
                        Jenkins can be extended via its plugin architecture, providing nearly
                        infinite possibilities for what Jenkins can do.
                    </p>
                </div>
            </div>
            <div className={box}>
                <div>
                    <Box
                        className={featureInfo}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem",
                        }}
                    >
                        <SocialDistanceOutlinedIcon style={{ fontSize: "2rem" }} />
                        <ion-icon
                            name="git-network-outline"
                            role="img"
                            className="md hydrated"
                        ></ion-icon>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                justifyContent: "center",
                            }}
                        >
                            <h4>Distributed</h4>
                        </Box>
                    </Box>
                    <p>
                        Jenkins can easily distribute work across multiple machines, helping drive
                        builds, tests and deployments across multiple platforms faster.
                    </p>
                </div>
            </div>
        </div>
    </div>
);

export default FeatureListSegement;
