import { graphql, Link } from "gatsby"; // Import Link component from Gatsby
import React, { useState, useEffect } from "react";
import PageName from "../components/PageName";
import Seo from "../components/Seo";
import { TextField } from "@mui/material";
import "../css/changelog.css";
import IndexPageLayout from "../layouts";

const PipelineReference = ({ data }) => {
    const [searchInput, setSearchInput] = useState("");
    const [filteredSteps, setFilteredSteps] = useState([]);

    useEffect(() => {
        // Filter steps based on search input
        const filtered = data.allFile.edges.filter(({ node }) => {
            const title = node.childrenAsciidoc[0].document.title.toLowerCase();
            return title.includes(searchInput.toLowerCase());
        });

        setFilteredSteps(filtered);
    }, [searchInput, data.allFile.edges]);

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    return (
        <IndexPageLayout>
            <Seo title="Jenkins Pipeline Step Reference" />
            <PageName title={"Jenkins Pipeline Step Reference"} />
            <p>
                {" "}
                The following plugins offer Pipeline-compatible steps. Each plugin link offers more
                information about the parameters for each step.
            </p>
            <p>
                Read more about how to integrate steps into your Pipeline in the Steps section of
                the Pipeline Syntax page.{" "}
            </p>
            <TextField
                id="filter"
                label="Filter Steps"
                variant="outlined"
                autoFocus
                value={searchInput}
                onChange={handleSearchInputChange}
                fullWidth
                size="small"
                style={{ marginBottom: "1rem" }}
            />
            <div>
                <ul>
                    {filteredSteps.map(({ node }) => (
                        <li key={node.childrenAsciidoc[0].document.title}>
                            <Link
                                to={`/steps${node.childrenAsciidoc[0].fields.slug}`}
                                style={{ textDecoration: "none" }}
                            >
                                {node.childrenAsciidoc[0].document.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </IndexPageLayout>
    );
};

export default PipelineReference;

export const pageQuery = graphql`
    {
        allFile(
            filter: { sourceInstanceName: { eq: "steps" } }
            sort: { childrenAsciidoc: { document: { main: ASC } } }
        ) {
            edges {
                node {
                    childrenAsciidoc {
                        document {
                            title
                        }
                        fields {
                            slug
                        }
                        html
                    }
                }
            }
        }
    }
`;
