module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
    author: 'Matt Rosenquist',
    description: 'A starter blog demonstrating what Gatsby can do.',
    // siteUrl: 'https://gatsbyjs.github.io/gatsby-starter-blog/',
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/posts`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
  ],
};
