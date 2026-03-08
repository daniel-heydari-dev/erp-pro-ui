import { Loading, Spinner, Dots, Pulse, Bars, Ring } from 'erp-pro-ui';
import DocsButtonBar from '../../docs/DocsButtonBar';

const LoadingDoc = () => {
  return (
    <section className="docs-section">
      <p className="docs-paragraph dim">
        The Loading component provides various loading indicators to show progress or waiting states.
      </p>

      <h3 className="docs-category-title">Preview</h3>

      <div className="docs-tool-item" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ textAlign: 'center' }}>
          <Spinner />
          <p style={{ color: '#666', marginTop: '0.5rem', fontSize: '12px' }}>Spinner</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Dots />
          <p style={{ color: '#666', marginTop: '0.5rem', fontSize: '12px' }}>Dots</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Pulse />
          <p style={{ color: '#666', marginTop: '0.5rem', fontSize: '12px' }}>Pulse</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Bars />
          <p style={{ color: '#666', marginTop: '0.5rem', fontSize: '12px' }}>Bars</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Ring />
          <p style={{ color: '#666', marginTop: '0.5rem', fontSize: '12px' }}>Ring</p>
        </div>
      </div>

      <h3 className="docs-category-title">Variants</h3>

      <ul className="docs-list">
        <li className="docs-list-item">
          <span className="docs-highlight">Spinner:</span> Classic spinning indicator
        </li>
        <li className="docs-list-item">
          <span className="docs-highlight">Dots:</span> Bouncing dots animation
        </li>
        <li className="docs-list-item">
          <span className="docs-highlight">Pulse:</span> Pulsing circle animation
        </li>
        <li className="docs-list-item">
          <span className="docs-highlight">Bars:</span> Animated bars
        </li>
        <li className="docs-list-item">
          <span className="docs-highlight">Ring:</span> Spinning ring indicator
        </li>
      </ul>

      <h3 className="docs-category-title">Props</h3>

      <ul className="docs-list">
        <li className="docs-list-item">
          <span className="docs-highlight">size:</span> 'small' | 'medium' | 'large'
        </li>
        <li className="docs-list-item">
          <span className="docs-highlight">color:</span> Custom color for the indicator
        </li>
      </ul>

      <DocsButtonBar
        previous={{ label: 'DataTable', route: '/ui-basics/datatable' }}
        next={{ label: 'Skeleton', route: '/ui-basics/skeleton' }}
      />
    </section>
  );
};

export default LoadingDoc;
