import React, { isValidElement, type ElementType, type ReactNode } from "react";

import { mergeClassNames } from "../../../utils";

function extractTextContent(node: ReactNode): string | undefined {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    const parts = node
      .map((child) => extractTextContent(child))
      .filter((value): value is string => Boolean(value));

    return parts.length > 0 ? parts.join("") : undefined;
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return extractTextContent(node.props.children);
  }

  return undefined;
}

export interface TruncatedTextProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "children"
> {
  children: ReactNode;
  as?: ElementType;
  lines?: number;
  width?: React.CSSProperties["width"];
  maxWidth?: React.CSSProperties["maxWidth"];
  showTitleOnHover?: boolean;
}

export const TruncatedText = ({
  children,
  as,
  lines = 1,
  width,
  maxWidth,
  showTitleOnHover = false,
  className,
  style,
  title,
  ...rest
}: TruncatedTextProps): React.JSX.Element => {
  const Component = as ?? "span";
  const normalizedLines =
    Number.isFinite(lines) && lines > 0 ? Math.floor(lines) : 1;
  const resolvedTitle = showTitleOnHover
    ? (title ?? extractTextContent(children))
    : title;

  const truncationStyle: React.CSSProperties =
    normalizedLines > 1
      ? {
          ...style,
          width,
          maxWidth,
          overflow: "hidden",
          display: style?.display ?? "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: normalizedLines,
        }
      : {
          ...style,
          width,
          maxWidth,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          display: style?.display ?? "block",
        };

  return (
    <Component
      {...rest}
      title={resolvedTitle}
      style={truncationStyle}
      className={mergeClassNames("min-w-0", className)}
    >
      {children}
    </Component>
  );
};
