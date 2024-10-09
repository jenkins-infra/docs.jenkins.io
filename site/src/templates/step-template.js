import React from "react";
import { graphql } from "gatsby";
import IndexPageLayout from "../layouts";

const StepPage = ({ data }) => {
    return (
        <IndexPageLayout>
            <h1>{data.asciidoc.document.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: data.asciidoc.html }} />
        </IndexPageLayout>
    );
};

export default StepPage;

export const pageQuery = graphql`
    query ($id: String!) {
        asciidoc(id: { eq: $id }) {
            html
            document {
                title
            }
            author {
                fullName
            }
            pageAttributes {
                author_name
                author
                tags
                opengraph
            }
        }
    }
`;
