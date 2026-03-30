import type { Meta } from '@storybook/react-vite';
import type { PropsWithChildren, ReactNode } from 'react';

import { mergeClassNames } from '../../utils';

type StoryMetaConfig<TComponent> = Omit<
  Meta<TComponent>,
  'parameters' | 'tags'
> & {
  parameters?: Meta<TComponent>['parameters'];
};

export function createStoryMeta<TComponent>(
  meta: StoryMetaConfig<TComponent>,
): Meta<TComponent> {
  return {
    tags: ['autodocs'],
    parameters: {
      layout: 'padded',
      controls: { expanded: true },
      ...meta.parameters,
    },
    ...meta,
  };
}

interface StorySurfaceProps {
  children: ReactNode;
  className?: string;
  widthClassName?: string;
}

export function StorySurface({
  children,
  className,
  widthClassName = 'ui:w-full ui:max-w-xl',
}: StorySurfaceProps) {
  return (
    <div
      className={mergeClassNames(
        'ui:mx-auto ui:w-full ui:rounded-2xl ui:border ui:border-border ui:bg-background/95 ui:p-6 ui:text-foreground ui:shadow-sm',
        widthClassName,
        className,
      )}
    >
      {children}
    </div>
  );
}

export function StoryStack({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={mergeClassNames('ui:flex ui:flex-col ui:gap-4', className)}>
      {children}
    </div>
  );
}

export function StorySection({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return <div className={mergeClassNames('ui:space-y-4', className)}>{children}</div>;
}

interface StoryIntroProps {
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function StoryIntro({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
}: StoryIntroProps) {
  return (
    <div className={className}>
      <p
        className={mergeClassNames(
          'ui:text-sm ui:font-semibold ui:text-foreground',
          titleClassName,
        )}
      >
        {title}
      </p>
      {description ? (
        <p
          className={mergeClassNames(
            'ui:mt-1 ui:text-sm ui:text-muted-foreground',
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

interface StoryPanelProps {
  children: ReactNode;
  className?: string;
}

export function StoryPanel({ children, className }: StoryPanelProps) {
  return (
    <div
      className={mergeClassNames(
        'ui:rounded-xl ui:border ui:border-border ui:bg-card ui:p-6 ui:text-card-foreground ui:shadow-sm',
        className,
      )}
    >
      {children}
    </div>
  );
}
