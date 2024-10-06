const _ = require(`lodash`);
const path = require(`path`);
const { slash } = require(`gatsby-core-utils`);
const { createFilePath } = require(`gatsby-source-filesystem`);

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
exports.createPages = ({ graphql, actions }) => {
    const { createPage, createRedirect } = actions;

    createRedirect({
        fromPath: `/node/`,
        toPath: `/blog/`,
        isPermanent: true,
        redirectInBrowser: true,
        force: true,
    });

    createRedirect({
        fromPath: `/node`,
        toPath: `/blog/`,
        isPermanent: true,
        redirectInBrowser: true,
        force: true,
    });

    return graphql(`
        {
            allAsciidoc {
                edges {
                    node {
                        id
                        html
                        document {
                            title
                        }
                        fields {
                            slug
                        }
                        pageAttributes {
                            layout
                            author
                            tags
                            author_name
                            blog
                            description
                            github
                            irc
                            linkedin
                            medium
                            opengraph
                            twitter
                            authoravatar
                        }
                    }
                }
            }
        }
    `).then((result) => {
        if (result.errors) {
            throw result.errors;
        }

        const data = result.data.allAsciidoc.edges;

        // authors page | passing the authors info the pages via pageContext
        const authorPostTemplate = path.resolve(`src/templates/author-pages.js`);
        const authors = data.filter((author) => author.node.pageAttributes.layout === "author");
        authors.forEach(({ node }) => {
            createPage({
                path: `author/${node.pageAttributes.github}`,
                component: authorPostTemplate,
                context: {
                    // asterisk's as we're using inbuilt glob in gatsby
                    authorName: `*${node.pageAttributes.github}*`,
                    authors,
                },
            });
        });

        const upgrades = data.filter(
            (upgrade) => upgrade.node.pageAttributes.layout === "upgrades",
        );
        const upgradeTemplate = path.resolve("src/templates/step-template.js");
        upgrades.forEach(({ node }) => {
            createPage({
                path: `upgrade-guide/upgrades${node.fields.slug}`,
                component: upgradeTemplate,
                context: {
                    node,
                    id: node.id,
                },
            });
        });

        const steps = data.filter((step) => step.node.pageAttributes.layout === "pipelinesteps");
        const stepTemplate = path.resolve("src/templates/step-template.js");
        steps.forEach(({ node }) => {
            createPage({
                path: `steps${node.fields.slug}`,
                component: stepTemplate,
                context: {
                    id: node.id,
                },
            });
        });

        // Create blog-list pages
        const blogs = data.filter(
            (blog) =>
                blog.node.pageAttributes.layout !== "author" &&
                blog.node.pageAttributes.layout !== "blog",
        );
        const postsPerPage = 9;
        const numPages = Math.ceil(blogs.length / postsPerPage);
        Array.from({ length: numPages }).forEach((_, i) => {
            createPage({
                path: i === 0 ? `/blog` : `/blog/${i + 1}`,
                component: path.resolve("./src/templates/blog-list-template.js"),
                context: {
                    limit: postsPerPage,
                    skip: i * postsPerPage,
                    numPages,
                    currentPage: i + 1,
                    authors,
                },
            });
        });

        // Create blog article pages.
        const articleTemplate = path.resolve(`./src/templates/article.js`);
        const posts = data.filter(
            (post) =>
                post.node.pageAttributes.layout !== "author" &&
                post.node.pageAttributes.layout === "blog",
        );
        _.each(posts, (edge) => {
            // Gatsby uses Redux to manage its internal state.
            // Plugins and sites can use functions like "createPage"
            // to interact with Gatsby.
            createPage({
                // Each page is required to have a `path` as well
                // as a template component. The `context` is
                // optional but is often necessary so the template
                // can query data specific to each page.
                path: "blog" + edge.node.fields.slug,
                component: slash(articleTemplate),
                context: {
                    id: edge.node.id,
                    authorname: edge.node.pageAttributes.author_name,
                    author: edge.node.pageAttributes.author,
                    authors,
                },
            });
        });
    });
};

exports.onCreateNode = async ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    if (node.internal.type === `Asciidoc`) {
        const value = createFilePath({ node, getNode });
        createNodeField({
            name: `slug`,
            node,
            value,
        });
    }
};
