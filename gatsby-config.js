module.exports = {
  siteMetadata: {
    title: 'Entrusted.io',
    author: 'Matt Rosenquist',
    description: 'A starter blog demonstrating what Gatsby can do.',
    siteUrl: 'https://entrustedio.netlify.com',
  },
  plugins: [
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Entrusted.io`,
        short_name: `Entrusted`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#1d355a`,
        display: `minimal-ui`,
        icon: `static/images/entrusted-logo.png`, // This path is relative to the root of the site.
        legacy: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
        ignore: ['**/.*'],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 2000,
              withWebp: true,
              quality: 65,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-115020477-1',
        // Puts tracking script in the head instead of the body
        head: true,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-feed`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
  ],
};
