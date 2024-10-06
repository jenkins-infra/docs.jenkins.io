import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Link } from "gatsby";
import { authorimagecontainer } from "../css/authorpost.module.css";
import {
    blogauthor,
    blogauthorimage,
    blogauthorinfo,
    bloglisting,
    blogpost,
    blogteaser,
    blogtitle,
} from "../css/blogpost.module.css";
import IndexPageLayout from "../layouts";
import { blogAuthorImage, formatDate, getImageSrc } from "../utils/index.js";

const RecentBlogPosts = () => {
    const data = useStaticQuery(graphql`
        {
            allFile(
                filter: {
                    sourceInstanceName: { eq: "pages" }
                    childrenAsciidoc: {
                        elemMatch: { document: { title: { ne: "About the Author" } } }
                    }
                }
                sort: { childrenAsciidoc: { fields: { slug: DESC } } }
                limit: 9
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
    `);
    return (
        <IndexPageLayout>
            <h2>Recent Posts</h2>
            <ul className={bloglisting}>
                {data.allFile.nodes.map(({ childrenAsciidoc }) => {
                    // formats
                    const formats = ["jpg", "png", "jpeg"];
                    const authorList = blogAuthorImage(childrenAsciidoc[0].pageAttributes.author);
                    // date
                    const formattedDate = formatDate(childrenAsciidoc[0].fields.slug);
                    const opengraphImageSource =
                        childrenAsciidoc[0].pageAttributes.opengraph ||
                        "../../images/gsoc/opengraph.png";

                    const htmlContent = childrenAsciidoc[0].html;
                    const parser = new DOMParser();
                    const parsedHtml = parser.parseFromString(htmlContent, "text/html");
                    function extractTextNodes(element, textNodes) {
                        if (element.nodeType === Node.TEXT_NODE) {
                            textNodes.push(element.textContent.trim());
                        } else {
                            for (let childNode of element.childNodes) {
                                extractTextNodes(childNode, textNodes);
                            }
                        }
                    }
                    const textNodes = [];
                    extractTextNodes(parsedHtml.body, textNodes);
                    const blogTeaser = textNodes.join(" ");

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
                                            const imageSrc = getImageSrc(auth, formats);
                                            return imageSrc ? (
                                                <img
                                                    src={imageSrc}
                                                    className={blogauthorimage}
                                                    loading="lazy"
                                                    alt={""}
                                                />
                                            ) : (
                                                <img
                                                    src="../../images/images/avatars/no_image.svg"
                                                    className={blogauthorimage}
                                                    loading="lazy"
                                                    alt={""}
                                                />
                                            );
                                        })}{" "}
                                        {authorList.length < 3 && (
                                            <p className={blogauthor}>
                                                {childrenAsciidoc[0].pageAttributes.author}
                                            </p>
                                        )}
                                    </div>
                                    <span>{formattedDate}</span>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </IndexPageLayout>
    );
};

export default RecentBlogPosts;
