import React from "react";
import Seo from "../components/Seo";
import Video from "../components/Video";
import Carousel from "../components/Carousel";
import FeatureListSegement from "../components/FeatureListSegment";
import Jumbotron from "../components/Jumbotron";
import Supporters from "../components/Supporters";
import RecentBlogPosts from "../components/RecentBlogPosts";
import WhatIsJenkins from "../components/WhatIsJenkins";

const IndexPage = () => (
    <>
        <WhatIsJenkins />
        <Carousel />
        <FeatureListSegement />
        <div style={{ paddingLeft: "32px", paddingRight: "32px" }}>
            <Video />
        </div>
        <RecentBlogPosts />
        <div style={{ marginBottom: "3rem" }}>
            <center>
                <strong>
                    We thank the following organizations for their major commitments to support the
                    Jenkins project.
                </strong>
            </center>
        </div>
        <Jumbotron />
        <Supporters />
    </>
);

export const Head = () => <Seo title="Jenkins - Open source automation server" />;

export default IndexPage;
