const devMode = (process.env.ACTIVE_ENV || process.env.NODE_ENV || 'development') === 'development';

module.exports = {
  siteMetadata: {
    title: 'Entrusted',
    author: 'Matt Rosenquist',
    description: 'Blog and Profile site that focuses on security, development and parasitism.',
    siteUrl: 'https://test.entrusted.io',
    devMode,
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
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: false,
              // If setting this to true, the parser won't handle and highlight inline
              // code used in markdown i.e. single backtick code like `this`.
              noInlineHighlight: false,
            },
          },
          'gatsby-remark-reading-time',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-115020477-1',
        head: true,
        anonymize: true,
        respectDNT: true,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-feed`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-sri`,
      options: {
        hash: 'sha256',
      },
    },
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
            'Server: none',
            'Strict-Transport-Security: max-age=31536000; includeSubDomains; preload',
            `Content-Security-Policy: ${[
              "default-src 'self' https://*.cloudfront.net",
              "connect-src 'self' https://*.cloudfront.net",
              "font-src data: 'self' https://*.cloudfront.net",
              "img-src data: https://*.cloudfront.net 'self'",
              // "prefetch-src: 'self'",
              "script-src 'unsafe-inline' 'self' https://www.google-analytics.com",
              "style-src 'unsafe-inline' 'self'",
              'report-uri https://entrustedio.report-uri.com/r/d/csp/enforce',
            ].join('; ')}`,
            `Feature-Policy: ${[
              "sync-xhr 'self'",
              "fullscreen 'self'",
              "geolocation 'none'",
              "geolocation 'none'",
              "midi 'none'",
              "microphone 'none'",
              "camera 'none'",
              "magnetometer 'none'",
              "gyroscope 'none'",
              "speaker 'none'",
              "payment 'none'",
            ].join('; ')}`,
            'Report-To: {"group":"default","max_age":31536000,"endpoints":[{"url":"https://entrustedio.report-uri.com/a/d/g"}],"include_subdomains":true}',
            'NEL: {"report_to":"default","max_age":31536000,"include_subdomains":true}',
            // "Content-Security-Policy-Report-Only: default-src 'none'; form-action 'none'; frame-ancestors 'none'; connect-src 'self'; font-src 'self'; img-src 'self'; script-src 'self' www.google-analytics.com; style-src 'self' ''; require-sri-for script style; report-uri https://entrustedio.report-uri.com/r/d/csp/enforce",
            // "Feature-Policy: usermedia '*'; sync-xhr 'self'; fullscreen 'self';  vibrate 'none'; geolocation 'none'; midi 'none'; notifications 'none'; push 'none'; microphone 'none'; camera 'none'; magnetometer 'none'; gyroscope 'none'; speaker 'none'; vibrate 'none'; payment 'none' ",
          ],
        }, // option to add more headers. `Link` headers are transformed by the below criteria
        allPageHeaders: [
          'Link: </images/entrusted-logo.png>; rel=preload; as=image',
          'Link: </images/noisy-texture.png>; rel=preload; as=image',
          'Link: </images/header-background.png>; rel=preload; as=image',
        ],
      },
    },
  ],
};
