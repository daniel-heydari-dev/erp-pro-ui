import type { Meta, StoryObj } from '@storybook/react-vite';

import { StorySurface } from '../shared/storybook';
import { Audio } from './Audio';

const meta: Meta<typeof Audio> = {
  title: 'Feedback/Audio',
  component: Audio,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Equalizer-style loading indicator suitable for audio, streaming, and live-processing states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    fill: { control: 'color' },
    width: { control: 'number' },
    height: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fill: '#7367f0',
    width: 55,
    height: 80,
  },
  render: (args) => (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <div className="ui:flex ui:min-h-48 ui:items-center ui:justify-center ui:rounded-2xl ui:border ui:border-border ui:bg-card">
        <Audio {...args} />
      </div>
    </StorySurface>
  ),
};

export const StatusExamples: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-3xl">
      <div className="ui:grid ui:gap-4 md:ui:grid-cols-3">
        <div className="ui:flex ui:flex-col ui:items-center ui:justify-center ui:gap-3 ui:rounded-2xl ui:border ui:border-border ui:bg-card ui:p-6">
          <Audio fill="#7367f0" />
          <p className="ui:text-sm ui:text-muted-foreground">Uploading audio</p>
        </div>
        <div className="ui:flex ui:flex-col ui:items-center ui:justify-center ui:gap-3 ui:rounded-2xl ui:border ui:border-border ui:bg-card ui:p-6">
          <Audio fill="#00cfe8" />
          <p className="ui:text-sm ui:text-muted-foreground">
            Live transcription
          </p>
        </div>
        <div className="ui:flex ui:flex-col ui:items-center ui:justify-center ui:gap-3 ui:rounded-2xl ui:border ui:border-border ui:bg-card ui:p-6">
          <Audio fill="#28c76f" />
          <p className="ui:text-sm ui:text-muted-foreground">
            Signal processing
          </p>
        </div>
      </div>
    </StorySurface>
  ),
};
