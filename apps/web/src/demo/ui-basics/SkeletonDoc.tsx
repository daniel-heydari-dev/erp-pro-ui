import { SkeletonComponent as Skeleton } from 'erp-pro-ui';
import DocsButtonBar from '../../docs/DocsButtonBar';

const SkeletonDoc = () => {
  return (
    <section className="docs-section">
      <p className="docs-paragraph dim">
        The Skeleton component displays placeholder content while data is loading, preventing layout shift.
      </p>

      <h3 className="docs-category-title">Preview</h3>

      <div className="docs-tool-item" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <Skeleton width="100%" height={20} />
        <Skeleton width="80%" height={20} />
        <Skeleton width="60%" height={20} />
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <Skeleton width={60} height={60} variant="circular" />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Skeleton width="100%" height={16} />
            <Skeleton width="70%" height={16} />
          </div>
        </div>
      </div>

      <h3 className="docs-category-title">Props</h3>

      <ul className="docs-list">
        <li className="docs-list-item">
          <span className="docs-highlight">width:</span> Width of the skeleton (px or %)
        </li>
        <li className="docs-list-item">
          <span className="docs-highlight">height:</span> Height of the skeleton (px)
        </li>
        <li className="docs-list-item">
          <span className="docs-highlight">variant:</span> 'text' | 'circular' | 'rectangular' | 'rounded'
        </li>
        <li className="docs-list-item">
          <span className="docs-highlight">animation:</span> 'pulse' | 'shimmer' | 'none'
        </li>
      </ul>

      <DocsButtonBar
        previous={{ label: 'Loading', route: '/ui-basics/loading' }}
      />
    </section>
  );
};

export default SkeletonDoc;
