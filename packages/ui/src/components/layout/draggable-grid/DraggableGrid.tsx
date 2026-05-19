"use client";

import { useState, useCallback, useEffect, type ReactNode } from "react";

import { Button } from "../../forms/button";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// ── Types ─────────────────────────────────────────────────────────────────────

export type DraggableGridItemSize = "small" | "medium" | "large";

export interface DraggableGridItem {
  id: string;
  component: ReactNode;
  size?: DraggableGridItemSize;
  title?: string;
  variant?: "default" | "bare";
}

export interface DraggableGridProps {
  items: DraggableGridItem[];
  editMode?: boolean;
  storageKey?: string;
  onItemsChange?: (items: DraggableGridItem[]) => void;
  onItemSizeChange?: (id: string, size: DraggableGridItemSize) => void;
  showItemMenu?: boolean;
  className?: string;
}

// ── Size classes ──────────────────────────────────────────────────────────────

const sizeClasses: Record<DraggableGridItemSize, string> = {
  small:  "w-full md:w-[calc(50%-12px)] 2xl:w-[calc(25%-12px)] min-h-[360px]",
  medium: "w-full xl:w-[calc(50%-12px)] min-h-[420px]",
  large:  "w-full min-h-[560px]",
};

const SIZE_CHIPS: { key: DraggableGridItemSize; label: string }[] = [
  { key: "small",  label: "S" },
  { key: "medium", label: "M" },
  { key: "large",  label: "L" },
];

// ── Shell wrapper ─────────────────────────────────────────────────────────────

function Shell({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="bg-ds-surface-1 border border-ds-border-2 rounded-md p-4 h-full w-full flex flex-col overflow-hidden">
      {title && (
        <div className="font-semibold text-base truncate text-ds-1 mb-4">
          {title}
        </div>
      )}
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}

// ── Drag handle icon ──────────────────────────────────────────────────────────

function DragHandleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="9"  cy="5"  r="1.5" />
      <circle cx="15" cy="5"  r="1.5" />
      <circle cx="9"  cy="12" r="1.5" />
      <circle cx="15" cy="12" r="1.5" />
      <circle cx="9"  cy="19" r="1.5" />
      <circle cx="15" cy="19" r="1.5" />
    </svg>
  );
}

// ── SortableItem ──────────────────────────────────────────────────────────────

interface SortableItemProps {
  item: DraggableGridItem;
  size: DraggableGridItemSize;
  editMode: boolean;
  showItemMenu: boolean;
  onSizeChange: (id: string, size: DraggableGridItemSize) => void;
}

function SortableItem({ item, size, editMode, showItemMenu, onSizeChange }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1,
  };

  const content =
    item.variant === "default" ? (
      <Shell title={item.title}>{item.component}</Shell>
    ) : (
      item.component
    );

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative flex-none ${sizeClasses[size]}`}
    >
      {editMode && (
        <div className="absolute top-2 right-2 z-10 flex items-center gap-1">
          {showItemMenu &&
            SIZE_CHIPS.map(({ key, label }) => (
              <Button
                key={key}
                variant={size === key ? "primary" : "secondary"}
                size="small"
                onClick={() => onSizeChange(item.id, key)}
                className="h-6 w-6 p-0! text-xs font-bold"
                aria-label={`Set ${item.title ?? item.id} to ${key}`}
                aria-pressed={size === key}
              >
                {label}
              </Button>
            ))}
          <Button
            variant="secondary"
            size="small"
            {...attributes}
            {...listeners}
            className="ml-1 h-6 w-6 cursor-grab p-0! active:cursor-grabbing"
            aria-label={`Drag ${item.title ?? item.id}`}
          >
            <DragHandleIcon />
          </Button>
        </div>
      )}
      <div className="h-full w-full">{content}</div>
    </div>
  );
}

// ── DraggableGrid ─────────────────────────────────────────────────────────────

export function DraggableGrid({
  items,
  editMode = false,
  storageKey,
  onItemsChange,
  onItemSizeChange,
  showItemMenu = false,
  className = "",
}: DraggableGridProps) {
  const readStoredOrder = useCallback((): string[] | null => {
    if (!storageKey) return null;
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? (JSON.parse(raw) as string[]) : null;
    } catch {
      return null;
    }
  }, [storageKey]);

  const [order, setOrder] = useState<string[]>(() => {
    const stored = readStoredOrder();
    if (stored) {
      const ids = new Set(items.map((i) => i.id));
      const filtered = stored.filter((id) => ids.has(id));
      const missing = items.map((i) => i.id).filter((id) => !filtered.includes(id));
      return [...filtered, ...missing];
    }
    return items.map((i) => i.id);
  });

  const [sizes, setSizes] = useState<Record<string, DraggableGridItemSize>>(
    () => Object.fromEntries(items.map((i) => [i.id, i.size ?? "medium"])),
  );

  // Sync items added after mount
  useEffect(() => {
    const known = new Set(order);
    const newIds = items.filter((i) => !known.has(i.id)).map((i) => i.id);
    if (newIds.length > 0) setOrder((prev) => [...prev, ...newIds]);

    setSizes((prev) => {
      const next = { ...prev };
      for (const item of items) {
        if (!(item.id in next)) next[item.id] = item.size ?? "medium";
      }
      return next;
    });
  }, [items]); // eslint-disable-line react-hooks/exhaustive-deps

  // Persist order
  useEffect(() => {
    if (!storageKey) return;
    try { localStorage.setItem(storageKey, JSON.stringify(order)); } catch { /* ignore */ }
  }, [order, storageKey]);

  const itemMap = Object.fromEntries(items.map((i) => [i.id, i]));
  const orderedItems = order.flatMap((id) => (itemMap[id] ? [itemMap[id]] : []));

  const [activeId, setActiveId] = useState<string | null>(null);
  const [overlaySize, setOverlaySize] = useState<{ width: number; height: number } | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragStart = useCallback(({ active }: DragStartEvent) => {
    setActiveId(String(active.id));
    const rect = active.rect.current.initial;
    if (rect) setOverlaySize({ width: rect.width, height: rect.height });
  }, []);

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      setActiveId(null);
      setOverlaySize(null);
      if (!over || active.id === over.id) return;

      setOrder((prev) => {
        const next = arrayMove(
          prev,
          prev.indexOf(String(active.id)),
          prev.indexOf(String(over.id)),
        );
        if (onItemsChange) {
          onItemsChange(
            next.flatMap((id) => {
              const it = itemMap[id];
              return it ? [{ ...it, size: sizes[id] ?? it.size }] : [];
            }),
          );
        }
        return next;
      });
    },
    [onItemsChange, itemMap, sizes],
  );

  const handleSizeChange = useCallback(
    (id: string, size: DraggableGridItemSize) => {
      setSizes((prev) => ({ ...prev, [id]: size }));
      onItemSizeChange?.(id, size);
    },
    [onItemSizeChange],
  );

  const activeItem = activeId ? itemMap[activeId] : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={order} strategy={rectSortingStrategy}>
        <div className={`flex flex-wrap gap-6 ${className}`}>
          {orderedItems.map((item) => (
            <SortableItem
              key={item.id}
              item={item}
              size={sizes[item.id] ?? item.size ?? "medium"}
              editMode={editMode}
              showItemMenu={showItemMenu}
              onSizeChange={handleSizeChange}
            />
          ))}
        </div>
      </SortableContext>

      <DragOverlay dropAnimation={{ duration: 180, easing: "ease" }}>
        {activeItem ? (
          <div
            style={{
              width: overlaySize?.width,
              height: overlaySize?.height,
              opacity: 0.85,
              cursor: "grabbing",
              pointerEvents: "none",
            }}
          >
            {activeItem.variant === "default" ? (
              <Shell title={activeItem.title}>{activeItem.component}</Shell>
            ) : (
              activeItem.component
            )}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
