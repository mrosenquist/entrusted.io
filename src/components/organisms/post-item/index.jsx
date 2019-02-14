import React from 'react';
import { Title } from 'bloomer';
import { Link } from 'gatsby';
import { get } from 'lodash';
import Img from 'gatsby-image';
import DotDate from '../../molecules/dot-date';
import Tags from '../../molecules/tags';

class PostItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      postStyle: {},
      imageStyle: {},
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
    const numberOfVW = 2;
    const adjust = Math.floor((window.innerWidth / 100) * (elementWidth / window.innerWidth) * numberOfVW);
    const postClipPath =
      adjust > 0 ? `polygon(-5% ${adjust}px, 105% 0, 105% calc(100% - ${adjust}px), -5% 100%)` : null;
    const imageClipPath = adjust > 0 ? `polygon(-5% 0px, 105% 0, 105% calc(100% - ${adjust}px), -5% 100%)` : null;
    this.setState({
      postStyle: {
        clipPath: postClipPath,
      },
      imageStyle: {
        clipPath: imageClipPath,
      },
    });
  };

  render() {
    const {
      frontmatter: { featuredImage, title, date, tags, description },
      fields: { slug },
      excerpt,
      id,
    } = this.props;
    const d = new Date(date);
    const now = new Date();

    const topDate =
      now.getFullYear() !== d.getFullYear()
        ? d.toLocaleDateString('en-GB', { month: 'short' })
        : d.toLocaleDateString('en-GB', { year: 'numeric' });

    const bottomDate =
      now.getFullYear() !== d.getFullYear()
        ? d.toLocaleDateString('en-GB', { day: 'numeric' })
        : d.toLocaleDateString('en-GB', { month: 'short' });

    const { postStyle, imageStyle } = this.state;
    const featuredImageToUse = get(featuredImage, 'childImageSharp.fluid');
    return (
      <Link to={slug}>
        <div className="post-item" style={postStyle} ref={this.ref} id={id}>
          {featuredImageToUse && (
            <Img className="post-item__image" post fluid={featuredImageToUse} style={imageStyle} />
          )}
          <DotDate top={topDate} bottom={bottomDate} className="post-item__date" />

          <div className="post-item__content">
            <Title tag="h2" isSize={4}>
              {title}
            </Title>
            <Tags tags={tags} />
            <p>{description || excerpt}</p>
          </div>
        </div>
      </Link>
    );
  }
}

export default PostItem;
