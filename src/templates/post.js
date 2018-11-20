import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import get from 'lodash/get';

// import Bio from '../components/Bio'
import { Section, Content, Title } from 'bloomer';
import Layout from '../layouts';

// import { rhythm, scale } from '../utils/typography'

class PostTemplate extends React.PureComponent {
  render() {
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    const {
      pageContext: { previous, next },
      location,
      data: { markdownRemark: post },
    } = this.props;
    const description = post.excerpt;
    const featuredImage = get(post, 'frontmatter.featuredImage.childImageSharp.fluid');

    return (
      <Layout location={location} isSize="small" title={`${post.frontmatter.title} | ${siteTitle}`}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: description }]}
          title={`${post.frontmatter.title} | ${siteTitle}`}
        />
        <Section className="section--post">
          <Title className="title--post_main">{post.frontmatter.title}</Title>
          {featuredImage && <Img className="image--post_main" fluid={featuredImage} />}
          <Content>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </Content>
          <hr
            style={
              {
                // marginBottom: rhythm(1),
              }
            }
          />
          {/* // <Bio /> */}
          <div
            style={{
              position: 'absolute',
              bottom: '3rem',
            }}
          >
            {post.frontmatter.date}
          </div>
          <ul
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              listStyle: 'none',
              padding: 0,
              // transformOrigin: 'right top',
              transform: 'skewY(-1.1deg)',
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </Section>
      </Layout>
    );
  }
}

export default PostTemplate;

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 1500) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
    }
  }
`;
