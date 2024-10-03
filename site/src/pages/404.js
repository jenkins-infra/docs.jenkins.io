import React from "react";
import { Link } from "gatsby";

import Layout from "../layouts";
import Seo from "../components/Seo";

const NotFound = () => (
    <Layout>
        <center>
            <img src="../../images/images/fire-jenkins.svg" alt={""} />
            <p style={{ fontSize: "2rem", fontWeight: "700" }}>
                The page you requested could not be found.
            </p>
            <p>
                <Link to="/">Back to Home page</Link>
            </p>
        </center>
    </Layout>
);

export const Head = () => <Seo title="Jenkins 404 Page" />;

export default NotFound;
