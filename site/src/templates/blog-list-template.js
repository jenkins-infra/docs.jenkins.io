import React from "react";
import { Link, graphql } from "gatsby";
import IndexPageLayout from "../layouts/index.js";
import { authorimagecontainer } from "../css/authorpost.module.css";
import {
    bloglisting,
    blogpost,
    blogtitle,
    blogteaser,
    blogauthorinfo,
    blogauthorimage,
} from "../css/blogpost.module.css";
import PageName from "../components/PageName";
import { formatDate, blogAuthorImage } from "../utils/index.js";

const BlogIndex = ({ pageContext, data }) => {
    const { currentPage, numPages, authors } = pageContext;
    const isFirst = currentPage === 1;
    const isLast = currentPage === numPages;
    const prevPage = currentPage - 1 === 1 ? "" : currentPage - 1;
    const nextPage = currentPage + 1;

    return (
        <IndexPageLayout>
            <PageName title={"The Jenkins Blog"} />
            <ul className={bloglisting}>
                {data.allFile.nodes.map(({ childrenAsciidoc }) => {
                    const authorList = blogAuthorImage(childrenAsciidoc[0].pageAttributes.author);

                    const formattedDate = formatDate(childrenAsciidoc[0].fields.slug);
                    const opengraphImageSource =
                        childrenAsciidoc[0].pageAttributes.opengraph ||
                        "../../static/images/gsoc/opengraph.png";

                    const htmlContent = childrenAsciidoc[0].html;
                    function extractTextNodes(element, textNodes) {
                        if (element.nodeType === Node.TEXT_NODE) {
                            textNodes.push(element.textContent.trim());
                        } else {
                            for (let childNode of element.childNodes) {
                                extractTextNodes(childNode, textNodes);
                            }
                        }
                    }
                    let blogTeaser = [];
                    if (typeof window !== "undefined") {
                        const parser = new DOMParser();
                        const parsedHtml = parser.parseFromString(htmlContent, "text/html");

                        const textNodes = [];
                        extractTextNodes(parsedHtml.body, textNodes);
                        blogTeaser = textNodes.join(" ");
                    }
                    return (
                        <li
                            key={`${childrenAsciidoc[0].fields.slug}-${childrenAsciidoc[0].document.title}`}
                            className={blogpost}
                        >
                            <Link
                                to={`/blog${childrenAsciidoc[0].fields.slug}`}
                                style={{
                                    textDecoration: "none",
                                    display: "flex",
                                    gap: "1.25rem",
                                    flexDirection: "column",
                                }}
                            >
                                <div className={{ authorimagecontainer }}>
                                    <img
                                        loading="lazy"
                                        src={opengraphImageSource}
                                        alt={childrenAsciidoc[0].document.title}
                                        height="250px"
                                        width="100%"
                                    />
                                </div>
                                <h5 className={blogtitle}>{childrenAsciidoc[0].document.title}</h5>
                                <div className={blogteaser}>
                                    <p>{blogTeaser}</p>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div className={blogauthorinfo}>
                                        {authorList.map((auth) => {
                                            return authors.map((node) => {
                                                return node.node.pageAttributes.github === auth ? (
                                                    <Link
                                                        className={blogauthorinfo}
                                                        to={`/author/${node.node.pageAttributes.github}`}
                                                    >
                                                        {node.node.pageAttributes.authoravatar ? (
                                                            <img
                                                                loading="lazy"
                                                                src={
                                                                    node.node.pageAttributes
                                                                        .authoravatar
                                                                }
                                                                className={blogauthorimage}
                                                                alt={
                                                                    node.node.pageAttributes.author
                                                                }
                                                            />
                                                        ) : (
                                                            <img
                                                                loading="lazy"
                                                                src="../../static/images/images/avatars/no_image.svg"
                                                                className={blogauthorimage}
                                                                alt={
                                                                    node.node.pageAttributes.author
                                                                }
                                                            />
                                                        )}
                                                        {authorList.length < 3 ? (
                                                            <p>
                                                                {
                                                                    node.node.pageAttributes
                                                                        .author_name
                                                                }
                                                            </p>
                                                        ) : null}
                                                    </Link>
                                                ) : null;
                                            });
                                        })}
                                    </div>
                                    <span>{formattedDate}</span>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>

            {/* pagination */}
            <ul
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "1.5rem",
                    alignItems: "center",
                    listStyle: "none",
                    padding: 0,
                }}
            >
                {!isFirst && (
                    <Link to={`/blog/${prevPage}`} rel="prev">
                        ← Previous Page
                    </Link>
                )}
                {!isLast && (
                    <Link to={`/blog/${nextPage}`} rel="next">
                        Next Page →
                    </Link>
                )}
            </ul>
        </IndexPageLayout>
    );
};

export default BlogIndex;

export const pageQuery = graphql`
    query BlogIndex($skip: Int!, $limit: Int!) {
        allFile(
            filter: {
                sourceInstanceName: { eq: "pages" }
                childrenAsciidoc: { elemMatch: { document: { title: { ne: "About the Author" } } } }
            }
            sort: { childrenAsciidoc: { fields: { slug: DESC } } }
            limit: $limit
            skip: $skip
        ) {
            nodes {
                childrenAsciidoc {
                    html
                    fields {
                        slug
                    }
                    document {
                        title
                    }
                    pageAttributes {
                        author
                        author_name
                        github
                        opengraph
                        linkedin
                        blog
                        twitter
                        medium
                        irc
                        description
                        authoravatar
                    }
                }
            }
        }
    }
`;
