const { get } = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

const devMode = (process.env.ACTIVE_ENV || process.env.NODE_ENV || 'development') === 'development';

console.log(devMode, process.env.NODE_ENV);
// const { attachFields } = require('gatsby-plugin-node-fields');
// TODO: https://github.com/gatsbyjs/gatsby/blob/master/docs/docs/adding-tags-and-categories-to-blog-posts.md
// TODO: https://www.gatsbyjs.org/docs/add-seo-component/
// TODO: https://www.gatsbyjs.org/docs/custom-html/
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const postComponent = path.resolve('./src/components/templates/post/index.jsx');
    const pageComponent = path.resolve('./src/components/templates/page/index.jsx');
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 10000
              ${devMode ? '' : 'filter: { frontmatter: { published: { eq: true } } }'}
            ) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                    author
                    tags
                    description
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const postFilePaths = get(result, 'data.allFile.edges', []).reduce(
          (a, i) => Object.assign(a, { [i.node.absolutePath]: i.node }),
          {}
        );

        const findPublicImage = (imgPath, absPagePath) => {
          if (!imgPath) {
            return null;
          }

          const page = postFilePaths[absPagePath];
          if (!page) {
            return null;
          }

          const absImagePath = path.join(page.dir, imgPath);

          const image = postFilePaths[absImagePath];
          if (!image) {
            return null;
          }

          return image.publicURL;
        };

        // Create blog posts pages.
        const posts = get(result, 'data.allMarkdownRemark.edges', []).filter(
          post => post.node.fields.slug.substr(0, 6) === '/posts'
        );

        posts.forEach((post, index) => {
          const previous = get(posts, `[${index + 1}].node`, null);
          const next = index > 0 ? get(posts[index - 1], 'node', null) : null;
          const { fields } = post.node;
          const { slug } = fields;
          createPage({
            path: slug,
            component: postComponent,
            context: {
              slug,
              previous,
              next,
            },
          });
        });

        const pages = get(result, 'data.allMarkdownRemark.edges', []).filter(
          page => page.node.fields.slug.substr(0, 6) !== '/posts'
        );

        pages.forEach(page => {
          const { fields } = page.node;
          const { slug } = fields;
          // const image = findPublicImage(frontmatter.image, fileAbsolutePath);
          createPage({
            path: slug,
            component: pageComponent,
            context: {
              slug,
              // image,
            },
          });
        });
      })
    );
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
