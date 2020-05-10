module.exports = {
    siteUrl: `https://joshuah-vaughn.com`, // Site domain. Do not include a trailing slash!

    postsPerPage: 12, // Number of posts shown on paginated pages (changes this requires sometimes to delete the cache)

    siteTitleMeta: `Joshua Vaughn`, // This allows an alternative site title for meta data for pages.
    siteDescriptionMeta: `Learn all the things!`, // This allows an alternative site description for meta data for pages.
    siteTwitterHandle: `@J_Vaughn_Dev`,
    // siteFacebookHandle: `joshuavaughn`,
    language: `en`,

    shareImageWidth: 1000, // Change to the width of your default share image
    shareImageHeight: 523, // Change to the height of your default share image

    shortTitle: `Personal Blog`, // Used for App manifest e.g. Mobile Home Screen
    siteIcon: `favicon.png`, // Logo in /static dir used for SEO, RSS, and App manifest
    backgroundColor: `#e9e9e9`, // Used for Offline Manifest
    themeColor: `#15171A`, // Used for Offline Manifest
    cover_image: ``,

    logo: `/images/devvco.png`,

    navigation: [
        {
            label: `Posts`,
            url: `/`,
        },
        {
            label: `About me`,
            url: `/about`,
        },
    ],

    googleAnalyticsId: "UA-165828576-1", // ADD_COMPLETE_TRACKING_ID => UA-151385213-1

    // disqusShortname: "joshua-vaughn", // ADD_SHORT_NAME => https://help.disqus.com/en/articles/1717111-what-s-a-shortname
    mailChimpEndpoint:
        "https://joshua-vaughn.us19.list-manage.com/subscribe/post?u=6820041d67b0824333986e5bf&amp;id=07d5eaa76f",
};
