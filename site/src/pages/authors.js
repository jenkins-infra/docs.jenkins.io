import GitHubIcon from "@mui/icons-material/GitHub";
import Avatar from "@mui/material/Avatar";
import { blue, indigo, cyan } from "@mui/material/colors";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import React from "react";
import Seo from "../components/Seo";
import PageName from "../components/PageName";
import { Link, graphql } from "gatsby";
import IndexPageLayout from "../layouts";
import {
    authorlisting,
    authorpost,
    authorname,
    authorinfo,
    github,
    linkedin,
    twitter,
    blog,
    authoravatar,
} from "../css/authorpost.module.css";

const AuthorPage = ({ data }) => (
    <IndexPageLayout>
        <PageName title={"Jenkins Community Blog Contributors"} />
        <ul className={authorlisting}>
            {data.allFile.nodes.map(({ childrenAsciidoc }) => (
                <li key={childrenAsciidoc[0].fields.slug} className={authorpost}>
                    <Link
                        to={`/author/${childrenAsciidoc[0].pageAttributes.github}`}
                        style={{ textDecoration: "none" }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "1rem",
                            }}
                        >
                            <center>
                                <span className={authorname}>
                                    {childrenAsciidoc[0].pageAttributes.author_name}
                                </span>
                            </center>
                            <img
                                className={authoravatar}
                                src={
                                    childrenAsciidoc[0].pageAttributes.authoravatar
                                        ? childrenAsciidoc[0].pageAttributes.authoravatar
                                        : "../../images/images/avatars/no_image.svg"
                                }
                                alt={childrenAsciidoc[0].document.title}
                            />
                        </div>
                        <div className={authorinfo}>
                            {childrenAsciidoc[0].pageAttributes.github ? (
                                <a
                                    href={
                                        "https://github.com/" +
                                        childrenAsciidoc[0].pageAttributes.github
                                    }
                                >
                                    <Avatar sx={{ bgcolor: "rgb(60, 60, 60)" }}>
                                        {" "}
                                        <GitHubIcon className={github} />
                                    </Avatar>
                                </a>
                            ) : null}
                            {childrenAsciidoc[0].pageAttributes.linkedin ? (
                                <a
                                    href={
                                        "https://linkedin.com/in/" +
                                        childrenAsciidoc[0].pageAttributes.linkedin
                                    }
                                >
                                    <Avatar sx={{ bgcolor: blue[700] }}>
                                        <LinkedInIcon className={linkedin} />
                                    </Avatar>
                                </a>
                            ) : null}
                            {childrenAsciidoc[0].pageAttributes.twitter ? (
                                <a
                                    href={
                                        "https://twitter.com/" +
                                        childrenAsciidoc[0].pageAttributes.twitter
                                    }
                                >
                                    <Avatar sx={{ bgcolor: cyan[50] }}>
                                        {" "}
                                        <TwitterIcon className={twitter} />
                                    </Avatar>
                                </a>
                            ) : null}
                            {childrenAsciidoc[0].pageAttributes.blog ? (
                                <a href={childrenAsciidoc[0].pageAttributes.blog}>
                                    <Avatar sx={{ bgcolor: indigo[50] }}>
                                        <ImportContactsIcon className={blog} />
                                    </Avatar>
                                </a>
                            ) : null}
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    </IndexPageLayout>
);

export const Head = () => <Seo title="Jenkins Blog Contributors" />;

export default AuthorPage;

export const pageQuery = graphql`
    query AuthorPage {
        allFile(
            filter: {
                sourceInstanceName: { eq: "authors" }
                childrenAsciidoc: { elemMatch: { document: { title: { eq: "About the Author" } } } }
            }
            sort: { modifiedTime: DESC }
        ) {
            nodes {
                childrenAsciidoc {
                    fields {
                        slug
                    }
                    document {
                        title
                    }
                    pageAttributes {
                        author_name
                        author
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
