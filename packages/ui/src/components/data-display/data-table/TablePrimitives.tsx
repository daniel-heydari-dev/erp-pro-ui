import React from "react";
import { mergeClassNames } from "../../../utils";

export const TableContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={mergeClassNames("overflow-auto", className)}
    {...props}
  />
));
TableContainer.displayName = "TableContainer";

export const Table = React.forwardRef<
  HTMLTableElement,
  React.ComponentPropsWithoutRef<"table">
>(({ className, ...props }, ref) => (
  <table
    ref={ref}
    className={mergeClassNames("w-full min-w-[800px]", className)}
    {...props}
  />
));
Table.displayName = "Table";

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.ComponentPropsWithoutRef<"thead">
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={mergeClassNames(
      "sticky top-0 z-10 bg-background-secondary",
      className,
    )}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.ComponentPropsWithoutRef<"tbody">
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={mergeClassNames(className)} {...props} />
));
TableBody.displayName = "TableBody";

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.ComponentPropsWithoutRef<"tfoot">
>(({ className, ...props }, ref) => (
  <tfoot ref={ref} className={mergeClassNames(className)} {...props} />
));
TableFooter.displayName = "TableFooter";

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.ComponentPropsWithoutRef<"tr">
>(({ className, ...props }, ref) => (
  <tr ref={ref} className={mergeClassNames(className)} {...props} />
));
TableRow.displayName = "TableRow";

export const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ComponentPropsWithoutRef<"th">
>(({ className, ...props }, ref) => (
  <th ref={ref} className={mergeClassNames(className)} {...props} />
));
TableHead.displayName = "TableHead";

export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.ComponentPropsWithoutRef<"td">
>(({ className, ...props }, ref) => (
  <td ref={ref} className={mergeClassNames(className)} {...props} />
));
TableCell.displayName = "TableCell";

export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.ComponentPropsWithoutRef<"caption">
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={mergeClassNames(
      "caption-bottom text-sm text-neutral-500",
      className,
    )}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";
