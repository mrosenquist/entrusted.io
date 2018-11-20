module.exports = {
  siteMetadata: {
    title: 'Entrusted.io',
    author: 'Matt Rosenquist',
    description: 'A starter blog demonstrating what Gatsby can do.',
    siteUrl: 'https://entrustedio.netlify.com',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-sri',
      options: {
        hash: 'sha512',
      },
    },
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
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-feed`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          '/*': [
            'X-Frame-Options: DENY',
            'X-XSS-Protection: 1; mode=block',
            'X-Content-Type-Options: nosniff',
            'Referrer-Policy: no-referrer-when-downgrade',
            "Content-Security-Policy-Report-Only: default-src 'none'; form-action 'none'; frame-ancestors 'none';report-uri https://entrustedio.report-uri.com/r/d/csp/wizard",
            'Server: none',
            'Strict-Transport-Security: max-age=31536000; includeSubDomains; preload',
            'Report-To: {"group":"default","max_age":31536000,"endpoints":[{"url":"https://entrustedio.report-uri.com/a/d/g"}],"include_subdomains":true}',
            'NEL: {"report_to":"default","max_age":31536000,"include_subdomains":true}',
          ],
        }, // option to add more headers. `Link` headers are transformed by the below criteria
        allPageHeaders: [
          // "Link: </static/my-logo.png>; rel=preload; as=image",
        ],
      },
    },
  ],
};
