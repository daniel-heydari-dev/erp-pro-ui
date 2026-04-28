"use client";

import type { FC } from "react";

import { Button } from "../../forms/button";
import { EllipsisVerticalIcon } from "../../icons/EllipsisVerticalIcon";
import { mergeClassNames } from "../../../utils";

export interface TopProductItem {
  id: string | number;
  name: string;
  category: string;
  soldCount: number;
  image?: string;
  rank: number;
}

export interface TopProductsCardProps {
  title?: string;
  items: TopProductItem[];
  className?: string;
  onMenuClick?: () => void;
}

const RankBadge: FC<{ rank: number }> = ({ rank }) => (
  <span
    className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border text-xs font-semibold"
    style={{
      borderColor: "var(--ds-color-accent)",
      color: "var(--ds-color-accent)",
    }}
    aria-label={`Rank ${rank}`}
  >
    {rank}
  </span>
);

const ProductImage: FC<{ src?: string; alt: string }> = ({ src, alt }) => {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className="h-11 w-11 shrink-0 rounded-md object-contain bg-ds-color-bg-utility p-1"
      />
    );
  }
  return (
    <div
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-ds-color-bg-utility text-ds-color-fg-subtle text-lg"
      aria-hidden="true"
    >
      □
    </div>
  );
};

export const TopProductsCard: FC<TopProductsCardProps> = ({
  title = "Top Products",
  items,
  className,
  onMenuClick,
}) => {
  return (
    <div
      className={mergeClassNames(
        "flex flex-col rounded-2xl border border-ds-border-2 bg-ds-surface-1 p-5",
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-ds-color-fg">{title}</span>
        <Button
          variant="tertiary"
          size="small"
          className="shrink-0 p-0.5! text-ds-color-fg-subtle"
          aria-label="More options"
          onClick={onMenuClick}
        >
          <EllipsisVerticalIcon width={18} height={18} />
        </Button>
      </div>

      <ul className="flex flex-col divide-y divide-ds-border-2" role="list">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
          >
            <ProductImage src={item.image} alt={item.name} />

            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="truncate text-sm font-semibold text-ds-color-fg">
                {item.name}
              </span>
              <span className="truncate text-xs text-ds-color-fg-subtle">
                {item.category} · {item.soldCount.toLocaleString()} sold
              </span>
            </div>

            <RankBadge rank={item.rank} />
          </li>
        ))}
      </ul>
    </div>
  );
};
