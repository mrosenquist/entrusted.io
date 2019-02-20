import React from 'react';
import { Title} from 'bloomer';
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
      fields: {
        slug,
        readingTime: { text: readTime },
      },
      excerpt,
      id,
    } = this.props;

    const { postStyle, imageStyle } = this.state;
    const featuredImageToUse = get(featuredImage, 'childImageSharp.fluid');
    return (
      <Link to={slug}>
        <div className="post-item" style={postStyle} ref={this.ref} id={id}>
          {featuredImageToUse && (
            <Img className="post-item__image" post fluid={featuredImageToUse} style={imageStyle} />
          )}
          <DotDate date={date} className="post-item__date" />

          <div className="post-item__content">
            <Title tag="h2" isSize={4}>
              {title}
            </Title>
            <Tags tags={tags} />
            <p>{description || excerpt}</p>
          </div>
          <hr style={{ padding: 0, margin: '0 0 0.5rem', height: '1px', color: 'lightgrey' }} />
          {/* // <Bio /> */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              transformOrigin: 'left top',
              transform: 'skewY(-1.1deg)',
              paddingBottom: '0.25rem',
            }}
          >
            <span className="post-item__readtime" style={{ fontSize: '0.8rem' }}>{readTime}</span>
          </div>
        </div>
      </Link>
    );
  }
}

export default PostItem;
