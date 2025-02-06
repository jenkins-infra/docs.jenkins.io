import React from "react";
import { graphql, Link } from "gatsby";
import IndexPageLayout from "../layouts";
import Seo from "../components/Seo";
import PageName from "../components/PageName";

const UpgradeGuide = ({ data }) => {
    const upgrades = data.allFile.nodes;

    return (
        <IndexPageLayout>
            <Seo title="Jenkins Upgrade Guide" />
            <PageName title={"Jenkins Upgrade Guide"} />
            <p>
                This section highlights important changes for administrators upgrading{" "}
                <Link to="/download/">Jenkins LTS</Link>. Each section covers the upgrade from the
                previous LTS release, sections on versions x.y.1 cover the upgrade from the last
                release of the previous LTS line. If you are skipping LTS releases when upgrading,
                it is recommended to read the sections for all releases in between.
            </p>
            <ul style={{ marginLeft: "2rem" }}>
                {upgrades.map(({ childrenAsciidoc }) => (
                    <li key={childrenAsciidoc[0].fields.slug}>
                        <Link to={`/upgrade-guide/upgrades${childrenAsciidoc[0].fields.slug}`}>
                            Upgrading to Jenkins{" "}
                            {childrenAsciidoc[0].fields.slug.replace(/-/g, ".").slice(1, -1)}
                        </Link>
                    </li>
                ))}
            </ul>
        </IndexPageLayout>
    );
};

export const pageQuery = graphql`
    query {
        allFile(filter: { sourceInstanceName: { eq: "upgrades" } }, sort: { name: DESC }) {
            nodes {
                childrenAsciidoc {
                    document {
                        title
                    }
                    fields {
                        slug
                    }
                    pageAttributes {
                        layout
                    }
                }
            }
        }
    }
`;

export default UpgradeGuide;
