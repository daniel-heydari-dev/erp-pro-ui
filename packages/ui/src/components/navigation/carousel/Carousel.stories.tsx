import type { Meta, StoryObj } from '@storybook/react-vite';

import { StorySurface } from '../../shared/storybook';
import { Carousel } from './Carousel';

const imageItems = [
  {
    id: '1',
    image: 'https://picsum.photos/1200/600?random=10',
    title: 'Majestic Peaks',
    description: 'Explore the highest mountains in the world.',
  },
  {
    id: '2',
    image: 'https://picsum.photos/1200/600?random=11',
    title: 'Ocean Breeze',
    description: 'The calmest waters for your next vacation.',
  },
  {
    id: '3',
    image: 'https://picsum.photos/1200/600?random=12',
    title: 'Urban Jungle',
    description: 'Modern architecture meet classic city vibes.',
  },
  {
    id: '4',
    image: 'https://picsum.photos/1200/600?random=13',
    title: 'Forest Retreat',
    description: 'Unwind in the heart of nature.',
  },
];

const contentItems = [
  {
    id: '1',
    content: (
      <div className="ui:flex ui:h-full ui:w-full ui:items-center ui:justify-center ui:bg-blue-500/10 ui:text-2xl ui:font-bold">
        Custom Slide 1
      </div>
    ),
  },
  {
    id: '2',
    content: (
      <div className="ui:flex ui:h-full ui:w-full ui:items-center ui:justify-center ui:bg-purple-500/10 ui:text-2xl ui:font-bold">
        Custom Slide 2
      </div>
    ),
  },
  {
    id: '3',
    content: (
      <div className="ui:flex ui:h-full ui:w-full ui:items-center ui:justify-center ui:bg-green-500/10 ui:text-2xl ui:font-bold">
        Custom Slide 3
      </div>
    ),
  },
];

const minimalCards = [
  {
    id: 'ops-1',
    content: (
      <div className="ui:flex ui:h-full ui:w-full ui:items-center ui:justify-center ui:rounded-2xl ui:border ui:border-border ui:bg-card ui:p-8 ui:text-center">
        <div>
          <p className="ui:text-sm ui:uppercase ui:tracking-[0.2em] ui:text-muted-foreground">
            Utilization
          </p>
          <p className="ui:mt-3 ui:text-4xl ui:font-bold">94%</p>
          <p className="ui:mt-2 ui:text-sm ui:text-muted-foreground">
            Average picking zone occupancy
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'ops-2',
    content: (
      <div className="ui:flex ui:h-full ui:w-full ui:items-center ui:justify-center ui:rounded-2xl ui:border ui:border-border ui:bg-card ui:p-8 ui:text-center">
        <div>
          <p className="ui:text-sm ui:uppercase ui:tracking-[0.2em] ui:text-muted-foreground">
            Order Throughput
          </p>
          <p className="ui:mt-3 ui:text-4xl ui:font-bold">1,284</p>
          <p className="ui:mt-2 ui:text-sm ui:text-muted-foreground">
            Orders processed in the last 24h
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'ops-3',
    content: (
      <div className="ui:flex ui:h-full ui:w-full ui:items-center ui:justify-center ui:rounded-2xl ui:border ui:border-border ui:bg-card ui:p-8 ui:text-center">
        <div>
          <p className="ui:text-sm ui:uppercase ui:tracking-[0.2em] ui:text-muted-foreground">
            Pending Approvals
          </p>
          <p className="ui:mt-3 ui:text-4xl ui:font-bold">27</p>
          <p className="ui:mt-2 ui:text-sm ui:text-muted-foreground">
            Transfers awaiting release
          </p>
        </div>
      </div>
    ),
  },
];

const meta: Meta<typeof Carousel> = {
  title: 'Layout/Carousel',
  component: Carousel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Displays image or custom-content slides with autoplay, drag navigation, arrows, dots, and multiple transition styles.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    animation: {
      control: 'select',
      options: ['slide', 'fade', 'scale', 'flip', 'cube', 'cards'],
    },
    variant: { control: 'radio', options: ['default', 'glass', 'minimal'] },
    autoPlay: { control: 'number' },
    height: { control: 'number' },
    showArrows: { control: 'boolean' },
    showDots: { control: 'boolean' },
    infinite: { control: 'boolean' },
    pauseOnHover: { control: 'boolean' },
    draggable: { control: 'boolean' },
    animationDuration: { control: 'number' },
    items: {
      control: false,
      description: 'Slides with image metadata or custom content.',
    },
    renderArrow: { control: false, description: 'Custom arrow renderer.' },
    renderDot: { control: false, description: 'Custom dot renderer.' },
    onSlideChange: {
      control: false,
      description: 'Called when the active slide changes.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Basic Image Slider
 * Standard marketing or gallery carousel with arrows and dots.
 */
export const BasicImageSlider: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-5xl">
      <Carousel
        items={imageItems}
        showArrows
        showDots
        height={400}
        animation="slide"
      />
    </StorySurface>
  ),
};

/**
 * ## Transition Gallery
 * Compare cube and cards transitions side by side.
 */
export const TransitionGallery: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl" className="ui:block">
      <div className="ui:grid ui:grid-cols-1 ui:gap-8 md:ui:grid-cols-2">
        <div className="ui:space-y-2">
          <h4 className="ui:px-2 ui:text-sm ui:font-semibold">
            Cube Transition
          </h4>
          <Carousel
            items={imageItems}
            animation="cube"
            height={250}
            autoPlay={4000}
          />
        </div>
        <div className="ui:space-y-2">
          <h4 className="ui:px-2 ui:text-sm ui:font-semibold">
            Cards Transition
          </h4>
          <Carousel
            items={imageItems}
            animation="cards"
            height={250}
            autoPlay={4500}
          />
        </div>
      </div>
    </StorySurface>
  ),
};

/**
 * ## Custom Content
 * Slides can render arbitrary content, not just images.
 */
export const CustomContent: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <Carousel
        items={contentItems}
        variant="glass"
        height={250}
        animation="fade"
      />
    </StorySurface>
  ),
};

/**
 * ## Dashboard Cards
 * KPI-oriented carousel for compact dashboards.
 */
export const DashboardCards: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <Carousel
        items={minimalCards}
        variant="minimal"
        height={280}
        animation="scale"
        autoPlay={5000}
        pauseOnHover
      />
    </StorySurface>
  ),
};
