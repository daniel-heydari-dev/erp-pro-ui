import { Carousel } from '@erp-pro/ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const CarouselDoc = () => {
  const images = [
    {
      id: '1',
      image: 'https://picsum.photos/1200/600?random=10',
      title: 'Majestic Peaks',
      description: 'Explore the highest mountains in the world.'
    },
    {
      id: '2',
      image: 'https://picsum.photos/1200/600?random=11',
      title: 'Ocean Breeze',
      description: 'The calmest waters for your next vacation.'
    },
    {
      id: '3',
      image: 'https://picsum.photos/1200/600?random=12',
      title: 'Urban Jungle',
      description: 'Modern architecture meet classic city vibes.'
    },
    {
      id: '4',
      image: 'https://picsum.photos/1200/600?random=13',
      title: 'Forest Retreat',
      description: 'Unwind in the heart of nature.'
    }
  ];

  const contentItems = [
    {
      id: '1',
      content: <div className="h-full w-full bg-blue-500/10 flex items-center justify-center text-2xl font-bold">Custom Slide 1</div>
    },
    {
      id: '2',
      content: <div className="h-full w-full bg-purple-500/10 flex items-center justify-center text-2xl font-bold">Custom Slide 2</div>
    },
    {
      id: '3',
      content: <div className="h-full w-full bg-green-500/10 flex items-center justify-center text-2xl font-bold">Custom Slide 3</div>
    }
  ];

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Carousel</h1>
      <p className="docs-paragraph">
        A versatile slider component with support for images, custom content, and multiple transition animations.
      </p>

      {/* Basic Usage */}
      <h2 className="docs-category-subtitle">Basic Image Slider</h2>
      <div className="docs-showcase-card h-auto p-0 overflow-hidden border-none shadow-2xl">
        <Carousel items={images} showArrows showDots height={400} animation="slide" />
      </div>

      <CodeBlock code={`import { Carousel } from '@erp-pro/ui';

const items = [
  { id: '1', image: 'url1.jpg', title: 'Mountain' },
  { id: '2', image: 'url2.jpg', title: 'Ocean' },
];

<Carousel items={items} showArrows showDots />`} />

      {/* Animations */}
      <h2 className="docs-category-subtitle">Transitions</h2>
      <p className="docs-paragraph">
        Choose from unique transitions like <code>cube</code>, <code>cards</code>, <code>flip</code>, and <code>scale</code>.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold px-2">Cube Transition</h4>
          <div className="docs-showcase-card h-auto p-0 overflow-hidden border-none rounded-xl">
            <Carousel items={images} animation="cube" height={250} autoPlay={4000} />
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold px-2">Cards Transition</h4>
          <div className="docs-showcase-card h-auto p-0 overflow-hidden border-none rounded-xl">
            <Carousel items={images} animation="cards" height={250} autoPlay={4500} />
          </div>
        </div>
      </div>

      <CodeBlock code={`<Carousel animation="cube" />
<Carousel animation="cards" />
<Carousel animation="flip" />`} />

      {/* Custom Content */}
      <h2 className="docs-category-subtitle">Custom Content</h2>
      <div className="docs-showcase-card h-auto p-0 overflow-hidden border-none rounded-2xl">
        <Carousel items={contentItems} variant="glass" height={250} animation="fade" />
      </div>

      <CodeBlock code={`const items = [
  { id: '1', content: <MyCustomComponent /> },
  { id: '2', content: <div>Text content</div> },
];

<Carousel items={items} animation="fade" />`} />

      {/* Props Reference */}
      <h2 className="docs-category-subtitle">Props</h2>
      <div className="overflow-x-auto">
        <table className="docs-props-table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="docs-prop-name">items</td>
              <td><span className="docs-prop-type">CarouselItem[]</span></td>
              <td>-</td>
              <td>Array of slides with id, image, title, content, etc.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">animation</td>
              <td><span className="docs-prop-type">CarouselAnimation</span></td>
              <td>'slide'</td>
              <td>slide, fade, scale, flip, cube, cards</td>
            </tr>
            <tr>
              <td className="docs-prop-name">autoPlay</td>
              <td><span className="docs-prop-type">number</span></td>
              <td>0</td>
              <td>Interval in ms (0 to disable)</td>
            </tr>
            <tr>
              <td className="docs-prop-name">variant</td>
              <td><span className="docs-prop-type">'default' | 'glass' | 'minimal'</span></td>
              <td>'glass'</td>
              <td>Visual theme of the container</td>
            </tr>
            <tr>
              <td className="docs-prop-name">height</td>
              <td><span className="docs-prop-type">number | string</span></td>
              <td>400</td>
              <td>Carousel height</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: 'Sun To Moon Button', route: '/ui-basics/sun-to-moon-button' }}
        next={{ label: 'Preview Showcase', route: '/ui-basics/preview' }}
      />
    </section>
  );
};

export default CarouselDoc;
