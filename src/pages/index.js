import React from 'react';
// import Link from 'gatsby-link'
import get from 'lodash/get';
import { Column, Columns, Title, Section } from 'bloomer';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../layouts';

class IndexPage extends React.PureComponent {
  columnSize(index, total) {
    if (index === 0) {
      return 'full';
    }

    return '';
  }

  render = () => {
    const { data } = this.props;
    return (
      <Layout title={data.site.siteMetadata.title} isSize="medium">
        <Section>
          <Columns isMultiline isCentered>
            {data.allMarkdownRemark &&
              data.allMarkdownRemark.edges.map((e, i) => {
                const featuredImage = get(e, 'node.frontmatter.featuredImage.childImageSharp.fluid');
                return (
                  <Column isSize={this.columnSize(i, data.allMarkdownRemark.edges.length)} key={e.node.id}>
                    <div className="post-item">
                      {featuredImage && (
                        <Img
                          className="post-item__image"
                          post
                          fluid={featuredImage}
                          style={{
                            maxHeight: '20vh',
                          }}
                        />
                      )}
                      <div className="post-item__content">
                        <Title tag="h2" isSize={4}>
                          <Link to={e.node.fields.slug}>{e.node.frontmatter.title}</Link>
                        </Title>
                        <p>{e.node.excerpt}</p>
                        <div>
                          {e.node.frontmatter.date}
                          {e.node.frontmatter.tags}
                        </div>
                      </div>
                    </div>
                  </Column>
                );
              })}
          </Columns>
        </Section>
      </Layout>
    );
  };
}

export default IndexPage;

// eslint-disable-next-line prettier/prettier
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { published: { eq: true } }, fields: { slug: { regex: "//posts/.*/" } } }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 1500) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
