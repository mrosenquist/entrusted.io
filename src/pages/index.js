import React from 'react';
// import Link from 'gatsby-link'
import get from 'lodash/get';
import { Column, Columns, Box, Section } from 'bloomer';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../layouts';

const IndexPage = ({ data }) => (
  <Layout title={data.site.siteMetadata.title} isSize="medium">
    <Section>
      <Columns isMultiline isCentered>
        {data.allMarkdownRemark &&
          data.allMarkdownRemark.edges.map(e => {
            const featuredImage = get(e, 'node.frontmatter.featuredImage.childImageSharp.fluid');
            return (
              <Column isSize="full" key={e.node.id}>
                <Box>
                  <Link to={e.node.fields.slug}>{e.node.frontmatter.title}</Link>
                  {featuredImage && (
                    <Img
                      fluid={featuredImage}
                      style={{
                        maxHeight: '20vh',
                      }}
                    />
                  )}
                  <div>{e.node.excerpt}</div>
                  <div>
                    {e.node.frontmatter.date}
                    {e.node.frontmatter.tags}
                  </div>
                </Box>
              </Column>
            );
          })}
      </Columns>
    </Section>
  </Layout>
);

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
