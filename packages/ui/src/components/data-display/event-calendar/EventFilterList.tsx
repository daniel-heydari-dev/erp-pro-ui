"use client";

import type { FC } from 'react';

import { Checkbox } from '../../forms/checkbox';

import { EVENT_LABEL_CONFIG, ALL_LABELS } from './types';
import type { EventLabel } from './types';

interface EventFilterListProps {
  activeLabels: EventLabel[];
  onChange: (labels: EventLabel[]) => void;
}

const LABEL_COLOR: Record<EventLabel, string> = {
  personal: 'red',
  business: 'primary',
  family: 'yellow',
  holiday: 'green',
  etc: 'teal',
};

export const EventFilterList: FC<EventFilterListProps> = ({ activeLabels, onChange }) => {
  const allActive = activeLabels.length === ALL_LABELS.length;

  const toggleAll = () => {
    onChange(allActive ? [] : [...ALL_LABELS]);
  };

  const toggleLabel = (label: EventLabel) => {
    if (activeLabels.includes(label)) {
      onChange(activeLabels.filter((l) => l !== label));
    } else {
      onChange([...activeLabels, label]);
    }
  };

  return (
    <div className="flex flex-col gap-2.5">
      <Checkbox
        checked={allActive}
        onChange={toggleAll}
        label="View all"
        color="primary"
      />
      {ALL_LABELS.map((label) => {
        const cfg = EVENT_LABEL_CONFIG[label];
        return (
          <Checkbox
            key={label}
            checked={activeLabels.includes(label)}
            onChange={() => toggleLabel(label)}
            label={cfg.display}
            color={LABEL_COLOR[label]}
          />
        );
      })}
    </div>
  );
};
