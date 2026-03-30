import type { Meta, StoryObj } from '@storybook/react-vite';

import { StorySurface } from '../../shared/storybook';
import { HoverCard } from './HoverCard';

const meta: Meta<typeof HoverCard> = {
  title: 'Layout/HoverCard',
  component: HoverCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Rich hover preview for people, entities, and metadata where a plain tooltip would be too small.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    position: { control: 'radio', options: ['top', 'bottom', 'left', 'right'] },
    align: { control: 'radio', options: ['start', 'center', 'end'] },
    openDelay: { control: 'number' },
    closeDelay: { control: 'number' },
    arrow: { control: 'boolean' },
    disabled: { control: 'boolean' },
    width: { control: 'text' },
    maxWidth: { control: 'text' },
    className: { control: false, description: 'Custom class for the card container.' },
    triggerClassName: { control: false, description: 'Custom class for the trigger wrapper.' },
    children: { control: false, description: 'Trigger element that opens the card on hover.' },
    content: { control: false, description: 'Content rendered inside the hover card.' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Default
 * Hover cards are large dynamic tooltips containing HTML elements. Commonly used to preview profiles or rich metadata.
 */
export const Default: Story = {
  render: (args) => (
    <StorySurface
      widthClassName="ui:w-full ui:max-w-lg"
      className="ui:min-h-56"
    >
      <HoverCard
        content={
          <div className="ui:w-64">
            <h4 className="ui:font-bold ui:text-lg">Next.js</h4>
            <p className="ui:text-sm ui:mt-1 ui:text-neutral-500">
              The React Framework for the Web. Created by Vercel.
            </p>
          </div>
        }
        {...args}
      >
        <span className="ui:font-medium ui:underline ui:cursor-pointer ui:text-blue-500">
          @nextjs
        </span>
      </HoverCard>
    </StorySurface>
  ),
};

/**
 * ## Team Member Preview
 * A realistic hover treatment for assignees or reviewers in tables and kanban boards.
 */
export const TeamMemberPreview: Story = {
  render: () => (
    <StorySurface
      widthClassName="ui:w-full ui:max-w-xl"
      className="ui:min-h-56"
    >
      <HoverCard
        position="right"
        align="start"
        content={
          <div className="ui:w-72 ui:space-y-3">
            <div>
              <h4 className="ui:text-base ui:font-semibold">Mina Chen</h4>
              <p className="ui:text-sm ui:text-muted-foreground">
                Inventory Operations Lead
              </p>
            </div>
            <div className="ui:grid ui:grid-cols-2 ui:gap-3 ui:text-sm">
              <div>
                <p className="ui:text-muted-foreground">Location</p>
                <p className="ui:font-medium">Berlin Hub</p>
              </div>
              <div>
                <p className="ui:text-muted-foreground">Open tasks</p>
                <p className="ui:font-medium">12</p>
              </div>
            </div>
            <p className="ui:text-sm ui:text-muted-foreground">
              Owns receiving audits, transfer approvals, and supplier escalation.
            </p>
          </div>
        }
      >
        <button className="ui:rounded-full ui:border ui:border-border ui:px-4 ui:py-2 ui:text-sm ui:font-medium">
          Hover Mina Chen
        </button>
      </HoverCard>
    </StorySurface>
  ),
};

/**
 * ## Delay And Width
 * Helps tune hover behavior in dense tables where accidental opens can be distracting.
 */
export const DelayAndWidth: Story = {
  args: {
    openDelay: 350,
    closeDelay: 100,
    arrow: false,
    width: '300px',
    maxWidth: '360px',
  },
  render: (args) => (
    <StorySurface
      widthClassName="ui:w-full ui:max-w-xl"
      className="ui:min-h-56"
    >
      <HoverCard
        {...args}
        content={
          <div className="ui:space-y-2">
            <h4 className="ui:text-base ui:font-semibold">Supplier Snapshot</h4>
            <p className="ui:text-sm ui:text-muted-foreground">
              Last shipment arrived 2 days ago. 97% on-time delivery this quarter.
            </p>
            <p className="ui:text-sm ui:text-muted-foreground">
              Next expected delivery: Friday, 10:30.
            </p>
          </div>
        }
      >
        <button className="ui:rounded-full ui:border ui:border-border ui:px-4 ui:py-2 ui:text-sm ui:font-medium">
          Hover Supplier #204
        </button>
      </HoverCard>
    </StorySurface>
  ),
};
