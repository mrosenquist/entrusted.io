import React from 'react';
import { Link } from 'gatsby';

const ItemFooter = post => (
  <>
    <hr />
    {/* // <Bio /> */}
    <div
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
          <Link
            to={previous.fields.slug}
            rel="prev"
            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '45%' }}
          >
            ← {previous.frontmatter.title}
          </Link>
        )}
      </li>
      <li>
        {next && (
          <Link
            to={next.fields.slug}
            rel="next"
            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '45%' }}
          >
            {next.frontmatter.title} →
          </Link>
        )}
      </li>
    </div>
  </>
);

export default ItemFooter;
