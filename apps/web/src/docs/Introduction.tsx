import { useEffect } from 'react';
import DocsButtonBar from './DocsButtonBar';

const Introduction = () => {
  const scrollToTop = () => window.scrollTo(0, 0);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <section className="docs-section">
      <p className="docs-paragraph dim">
        <strong>erp-pro-ui</strong> is a professional React component library built for the <strong>erp-pro</strong> SaaS ecosystem—the ultimate management solution for tools stores.
      </p>

      <h3 className="docs-category-title">Core Mission</h3>
      <p className="docs-paragraph">
        We provide high-performance, visually stunning components designed to handle complex inventory workflows, stock management, and high-speed store operations.
      </p>

      <ul className="docs-list">
        <li className="docs-list-item"><span className="docs-highlight">Business First:</span> Optimized for ERP workflows and data-heavy interfaces.</li>
        <li className="docs-list-item"><span className="docs-highlight">Premium Design:</span> Modern aesthetics for a professional tools store experience.</li>
        <li className="docs-list-item"><span className="docs-highlight">Full Control:</span> Fully typed components with extensive customization via props.</li>
      </ul>

      <h3 className="docs-category-title">Performance</h3>
      <p className="docs-paragraph dim">
        Every component is optimized for speed. For the best erp-pro-ui experience, keep your interfaces clean and focus on data efficiency.
      </p>

      <DocsButtonBar next={{ label: 'Installation', route: '/get-started/installation' }} />
    </section>
  );
};

export default Introduction;
