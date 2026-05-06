"use client";

import { type FC, useEffect, useState } from 'react';

import { Button } from '../../forms/button';
import { Input } from '../../forms/input';
import { Select } from '../../forms/select';
import { Switch } from '../../forms/switch';
import { Textarea } from '../../forms/textarea';
import { Drawer } from '../../overlays/drawer/Drawer';

import { generateId } from './calendarUtils';
import { EVENT_LABEL_CONFIG, ALL_LABELS } from './types';
import type { CalendarEvent, EventLabel } from './types';

interface AddEventPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: CalendarEvent) => void;
  initialDate?: Date;
}

function toDateInput(d: Date): string {
  return d.toISOString().split('T')[0] ?? '';
}

const labelOptions = ALL_LABELS.map((l) => ({
  value: l,
  label: EVENT_LABEL_CONFIG[l].display,
}));

export const AddEventPanel: FC<AddEventPanelProps> = ({ isOpen, onClose, onSubmit, initialDate }) => {
  const [title, setTitle] = useState('');
  const [label, setLabel] = useState<EventLabel>('personal');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [allDay, setAllDay] = useState(true);
  const [url, setUrl] = useState('');
  const [guests, setGuests] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (isOpen) {
      const today = initialDate ?? new Date();
      setTitle('');
      setLabel('personal');
      setStartDate(toDateInput(today));
      setEndDate(toDateInput(today));
      setAllDay(true);
      setUrl('');
      setGuests('');
      setLocation('');
      setDescription('');
    }
  }, [isOpen, initialDate]);

  const handleSubmit = () => {
    if (!title.trim()) return;
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    const event: CalendarEvent = {
      id: generateId(),
      title: title.trim(),
      start,
      end,
      allDay,
      label,
      url: url.trim() || undefined,
      guests: guests.trim() || undefined,
      location: location.trim() || undefined,
      description: description.trim() || undefined,
    };
    onSubmit(event);
  };

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(o) => { if (!o) onClose(); }}
      title="Add Event"
      position="right"
      footer={
        <div className="flex gap-2">
          <Button variant="primary" className="flex-1" onClick={handleSubmit} disabled={!title.trim()}>
            Submit
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-ds-2">Title</label>
          <Input placeholder="Meeting with Jane" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-ds-2">Label</label>
          <Select
            options={labelOptions}
            value={label}
            onChange={(e) => setLabel(e.target.value as EventLabel)}
            placeholder="Select Event Label"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-ds-2">Start date</label>
            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-ds-2">End date</label>
            <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-ds-2">All day</span>
          <Switch checked={allDay} onChange={(e) => setAllDay(e.target.checked)} aria-label="All day event" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-ds-2">Event URL</label>
          <Input placeholder="https://event.com/meeting" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-ds-2">Guests</label>
          <Input placeholder="Select guests" value={guests} onChange={(e) => setGuests(e.target.value)} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-ds-2">Location</label>
          <Input placeholder="Meeting room" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-ds-2">Description</label>
          <Textarea
            placeholder="Add description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-24 resize-none"
          />
        </div>
      </div>
    </Drawer>
  );
};
