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
    const {
      data: { allMarkdownRemark },
    } = this.props;
    return (
      <Layout isSize="medium">
        <Section>
          <Columns isMultiline isCentered>
            {allMarkdownRemark &&
              allMarkdownRemark.edges.map((e, i) => (
                <Column isSize={this.columnSize(i, allMarkdownRemark.edges.length)} key={e.node.id}>
                  <Post {...e.node} id={i} />
                </Column>
              ))}
          </Columns>
        </Section>
      </Layout>
    );
  };
}

class Post extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      style: {},
    };
    this.ref = React.createRef();
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    if (process.browser) {
      this.updateDimensions();
      window.addEventListener('load', this.updateDimensions);
      window.addEventListener('resize', this.updateDimensions);
    }
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    if (process.browser) {
      window.addEventListener('load', this.updateDimensions);
      window.removeEventListener('resize', this.updateDimensions);
    }
  }

  updateDimensions = () => {
    const elementWidth = this.ref.current.offsetWidth;
    const numberOfVW = 4;
    const adjust = Math.floor((window.innerWidth / 100) * (elementWidth / window.innerWidth) * numberOfVW);
    const clipPath = adjust > 0 ? `polygon(-5% ${adjust}px, 105% 0, 105% calc(100% - ${adjust}px), -5% 100%)` : null;
    this.setState({
      style: {
        clipPath,
      },
    });
  };

  render() {
    const {
      frontmatter: { featuredImage, title, date, tags },
      fields: { slug },
      excerpt,
      id,
    } = this.props;
    const { style } = this.state;
    const featuredImageToUse = get(featuredImage, 'childImageSharp.fluid');
    return (
      <div className="post-item" style={style} ref={this.ref} id={id}>
        {featuredImageToUse && (
          <Img
            className="post-item__image"
            post
            fluid={featuredImageToUse}
            style={{
              ...style,
              height: '30vmin',
              maxHeight: '30vh',
            }}
          />
        )}
        <div className="post-item__content">
          <Title tag="h2" isSize={4}>
            <Link to={slug}>{title}</Link>
          </Title>
          <p>{excerpt}</p>
          <div>
            {date}
            {tags}
          </div>
        </div>
      </div>
    );
  }
}

export default IndexPage;

// eslint-disable-next-line prettier/prettier
export const pageQuery = graphql`
  query {
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
