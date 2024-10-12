module.exports = {
    siteMetadata: {
        title: "Jenkins",
        description:
            "Jenkins - an open source automation server which enables developers around the world to reliably build, test, and deploy their software",
        author: "@jenkinsci",
        twitterUsername: "@JenkinsCI",
        buildDate: new Date(),
        stable: "2.426.3",
        latest: "2.444",
    },
    plugins: [
        `gatsby-transformer-asciidoc`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `pages`,
                path: `${__dirname}/content`,
            },
        },
        `gatsby-transformer-asciidoc`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `steps`,
                path: `${__dirname}/steps`,
            },
        },
        `gatsby-transformer-asciidoc`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `upgrades`,
                path: `${__dirname}/upgrades`,
            },
        },
        `gatsby-transformer-asciidoc`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `authors`,
                path: `${__dirname}/authors`,
            },
        },
        `gatsby-transformer-asciidoc`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `events`,
                path: `${__dirname}/data/events`,
            },
        },
        `gatsby-transformer-yaml`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `changelogs`,
                path: `${__dirname}/data/changelogs`,
            },
        },
        `gatsby-transformer-yaml`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `roadmap`,
                path: `${__dirname}/data/roadmaps`,
            },
        },

        `gatsby-transformer-asciidoc`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `upgrades`,
                path: `${__dirname}/data/upgrades`,
            },
        },
        {
            resolve: `gatsby-transformer-asciidoc`,
            options: {
                attributes: {
                    imagesdir: `/images@`,
                },
            },
        },
        {
            resolve: `gatsby-plugin-typography`,
            options: {
                pathToConfigModule: `src/utils/typography`,
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: "Jenkins",
                short_name: "Jenkins",
                start_url: "/",
                background_color: "#6b37bf",
                theme_color: "#6b37bf",
                // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
                // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
                display: "standalone",
                icon: `../site/static/images/images/226px-Jenkins_logo.svg.png`, // This path is relative to the root of the site.
                // An optional attribute which provides support for CORS check.
                // If you do not provide a crossOrigin option, it will skip CORS for manifest.
                // Any invalid keyword or empty string defaults to `anonymous`
                crossOrigin: `use-credentials`,
            },
        },
    ],
};
