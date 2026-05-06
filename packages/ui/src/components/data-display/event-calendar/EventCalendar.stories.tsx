import type { Meta, StoryObj } from '@storybook/react';

import { EventCalendar } from './EventCalendar';
import type { CalendarEvent } from './types';

const sampleEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Design Review',
    start: new Date(2026, 4, 5, 23, 35),
    end: new Date(2026, 4, 6, 23, 35),
    allDay: false,
    label: 'business',
  },
  {
    id: '2',
    title: 'Dart Game?',
    start: new Date(2026, 4, 18),
    end: new Date(2026, 4, 18, 23, 59, 59),
    allDay: true,
    label: 'etc',
  },
  {
    id: '3',
    title: 'Dinner',
    start: new Date(2026, 4, 18),
    end: new Date(2026, 4, 18, 23, 59, 59),
    allDay: true,
    label: 'family',
  },
  {
    id: '4',
    title: 'Meditation',
    start: new Date(2026, 4, 18),
    end: new Date(2026, 4, 18, 23, 59, 59),
    allDay: true,
    label: 'personal',
  },
  {
    id: '5',
    title: 'Product Review',
    start: new Date(2026, 4, 18),
    end: new Date(2026, 4, 18, 23, 59, 59),
    allDay: true,
    label: 'business',
  },
  {
    id: '6',
    title: "Doctor's Appointment",
    start: new Date(2026, 4, 20),
    end: new Date(2026, 4, 20, 23, 59, 59),
    allDay: true,
    label: 'personal',
  },
  {
    id: '7',
    title: 'Meeting With Client',
    start: new Date(2026, 4, 20),
    end: new Date(2026, 4, 20, 23, 59, 59),
    allDay: true,
    label: 'business',
  },
  {
    id: '8',
    title: 'Family Trip',
    start: new Date(2026, 4, 22),
    end: new Date(2026, 4, 23, 23, 59, 59),
    allDay: true,
    label: 'holiday',
  },
  {
    id: '9',
    title: 'Monthly Meeting',
    start: new Date(2026, 4, 31),
    end: new Date(2026, 4, 31, 23, 59, 59),
    allDay: true,
    label: 'business',
  },
];

const meta: Meta<typeof EventCalendar> = {
  title: 'Data Display/EventCalendar',
  component: EventCalendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof EventCalendar>;

export const Default: Story = {
  args: {
    initialEvents: sampleEvents,
    initialDate: new Date(2026, 4, 6),
    initialView: 'month',
  },
  render: (args) => (
    <div className="h-[700px] w-full p-4 bg-ds-canvas">
      <EventCalendar {...args} />
    </div>
  ),
};

export const WeekView: Story = {
  args: {
    initialEvents: sampleEvents,
    initialDate: new Date(2026, 4, 6),
    initialView: 'week',
  },
  render: (args) => (
    <div className="h-[700px] w-full p-4 bg-ds-canvas">
      <EventCalendar {...args} />
    </div>
  ),
};

export const DayView: Story = {
  args: {
    initialEvents: sampleEvents,
    initialDate: new Date(2026, 4, 6),
    initialView: 'day',
  },
  render: (args) => (
    <div className="h-[700px] w-full p-4 bg-ds-canvas">
      <EventCalendar {...args} />
    </div>
  ),
};

export const ListView: Story = {
  args: {
    initialEvents: sampleEvents,
    initialDate: new Date(2026, 4, 6),
    initialView: 'list',
  },
  render: (args) => (
    <div className="h-[700px] w-full p-4 bg-ds-canvas">
      <EventCalendar {...args} />
    </div>
  ),
};
