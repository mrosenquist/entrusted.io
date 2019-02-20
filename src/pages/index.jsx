import React from 'react';
import { Column, Columns, Section } from 'bloomer';
import { graphql } from 'gatsby';
import Fade from 'react-reveal/Fade';
import config from 'react-reveal/globals';
import Layout from '../components/templates/base';
import PostItem from '../components/organisms/post-item';

config({ ssrFadeout: true });

const IndexPage = props => {
  const {
    data: {
      allMarkdownRemark,
      site: {
        siteMetadata: { devMode },
      },
    },
  } = props;

  const size = { mobile: 'full', tablet: '2/3', desktop: '1/3', widescreen: '2/5' };
  return (
    <Layout isSize={false}>
      <Section>
        <Columns isMultiline isCentered>
          {allMarkdownRemark &&
            allMarkdownRemark.edges
              .filter(e => devMode || e.node.frontmatter.published)
              .map((e, i) => (
                <Column isSize={size} key={e.node.id}>
                  <Fade bottom>
                    <PostItem {...e.node} id={i} />
                  </Fade>
                </Column>
              ))}
        </Columns>
      </Section>
    </Layout>
  );
};

export default IndexPage;

// eslint-disable-next-line prettier/prettier
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        devMode
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { published: { eq: true } }, fields: { slug: { regex: "//posts/.*/" } } }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 100)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
            published
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
            readingTime {
              text
            }
          }
        }
      }
    }
  }
`;
