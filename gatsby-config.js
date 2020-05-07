const path = require(`path`);

const config = require(`./src/utils/siteConfig`);
const generateRSSFeed = require(`./src/utils/rss/generate-feed`);
/**
 * This is the place where you can tell Gatsby which plugins to use
 * and set them up the way you want.
 *
 * Further info 👉🏼 https://www.gatsbyjs.org/docs/gatsby-config/
 *
 */
const gatsbyConfig = {
    siteMetadata: {
        siteUrl: config.siteUrl,
        title: config.siteTitleMeta,
        description: config.siteDescriptionMeta,
    },
    mapping: {
        "MarkdownRemark.frontmatter.tags": `MarkdownRemark.frontmatter.tag_id`,
        "MarkdownRemark.frontmatter.author": `MarkdownRemark.frontmatter.author_id`,
    },
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: path.join(__dirname, `src`, `posts`),
                name: `posts`,
            },
        },
        {
            resolve: "gatsby-plugin-mailchimp",
            options: {
                endpoint: config.mailChimpEndpoint, // add your MC list endpoint here; see instructions below
            },
        },
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 740,
                            quality: 90,
                            withWebp: true,
                        },
                    },
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            // Class prefix for <pre> tags containing syntax highlighting;
                            // defaults to 'language-' (eg <pre class="language-js">).
                            // If your site loads Prism into the browser at runtime,
                            // (eg for use with libraries like react-live),
                            // you may use this to prevent Prism from re-processing syntax.
                            // This is an uncommon use-case though;
                            // If you're unsure, it's best to use the default value.
                            classPrefix: "language-",
                            // This is used to allow setting a language for inline code
                            // (i.e. single backticks) by creating a separator.
                            // This separator is a string and will do no white-space
                            // stripping.
                            // A suggested value for English speakers is the non-ascii
                            // character '›'.
                            inlineCodeMarker: null,
                            // This lets you set up language aliases.  For example,
                            // setting this to '{ sh: "bash" }' will let you use
                            // the language "sh" which will highlight using the
                            // bash highlighter.
                            aliases: {},
                            // This toggles the display of line numbers globally alongside the code.
                            // To use it, add the following line in src/layouts/index.js
                            // right after importing the prism color scheme:
                            //  `require("prismjs/plugins/line-numbers/prism-line-numbers.css");`
                            // Defaults to false.
                            // If you wish to only show line numbers on certain code blocks,
                            // leave false and use the {numberLines: true} syntax below
                            showLineNumbers: false,
                            // If setting this to true, the parser won't handle and highlight inline
                            // code used in markdown i.e. single backtick code like `this`.
                            noInlineHighlight: false,
                        },
                    },
                    {
                        resolve: `gatsby-remark-external-links`,
                        options: {
                            target: `_blank`,
                            rel: null,
                        },
                    },
                ],
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: path.join(__dirname, `src`, `tags`),
                name: `tags`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: path.join(__dirname, `src`, `authors`),
                name: `authors`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: path.join(__dirname, `src`, `pages`),
                name: `pages`,
            },
        },
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-force-trailing-slashes`,
    ],
};
if (process.env.NODE_ENV === `production`) {
    const plugins = [
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: config.googleAnalyticsId,
            },
        },
        {
            resolve: `gatsby-plugin-ghost-manifest`,
            options: {
                short_name: config.shortTitle,
                start_url: `/`,
                background_color: config.backgroundColor,
                theme_color: config.themeColor,
                display: `minimal-ui`,
                icon: `static/${config.siteIcon}`,
                name: config.siteTitleMeta,
                description: config.siteDescriptionMeta,
            },
        },
        {
            resolve: `gatsby-plugin-feed`,
            options: {
                query: `
                {
                    site {
                      siteMetadata {
                        title
                        description
                        siteUrl
                        site_url: siteUrl
                      }
                    }
                  }
              `,
                feeds: [generateRSSFeed(config)],
            },
        },
        {
            resolve: `gatsby-plugin-advanced-sitemap`,
            options: {
                query: `
                {
                    allPosts: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/posts/"}}) {
                      edges: nodes {
                        node: frontmatter {
                          slug
                          updated_at
                          id:slug
                        }
                      }
                    }
                    allAuthors: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/authors/"}}) {
                      edges: nodes {
                        id
                        node: frontmatter {
                          slug
                          updated_at
                          id:slug
                        }
                      }
                    }
                    allTags: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/tags/"}}) {
                      edges: nodes {
                        id
                        node: frontmatter {
                          slug
                          updated_at
                          id:slug
                        }
                      }
                    },
                    allPages: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/pages/"}}) {
                      edges: nodes {
                        id
                        node: frontmatter {
                          slug
                          updated_at
                          id:slug
                        }
                      }
                    }
                  }
                  `,
                mapping: {
                    allPosts: {
                        sitemap: `posts`,
                    },
                    allAuthors: {
                        sitemap: `authors`,
                    },
                    allTags: {
                        sitemap: `tags`,
                    },
                    allPages: {
                        sitemap: `pages`,
                    },
                },
                exclude: [
                    `/dev-404-page`,
                    `/404`,
                    `/404.html`,
                    `/offline-plugin-app-shell-fallback`,
                ],
                createLinkInHead: true,
            },
        },
    ];

    // adding plugins
    gatsbyConfig.plugins = gatsbyConfig.plugins.concat(plugins);
}
module.exports = gatsbyConfig;
