import React, { type ReactNode, type ElementType } from 'react';
import { mergeClassNames } from '../../utils';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline';

export type TypographyAlign = 'left' | 'center' | 'right' | 'justify';
export type TypographyWeight =
  | 'thin'
  | 'extralight'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';
export type TypographyTracking =
  | 'tighter'
  | 'tight'
  | 'normal'
  | 'wide'
  | 'wider'
  | 'widest';
export type TypographyGradient =
  | boolean
  | 'primary'
  | 'ocean'
  | 'sunset'
  | 'aurora'
  | 'neon'
  | 'forest'
  | 'galaxy';

export interface TypographyProps {
  children: ReactNode;
  variant?: TypographyVariant;
  align?: TypographyAlign;
  weight?: TypographyWeight;
  tracking?: TypographyTracking;
  italic?: boolean;
  as?: ElementType;
  className?: string;
  gradient?: TypographyGradient;
  style?: React.CSSProperties;
}

const variantMapping: Record<TypographyVariant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span',
};

const variantStyles: Record<TypographyVariant, string> = {
  h1: 'text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-tight',
  h2: 'text-3xl md:text-5xl font-black tracking-tight uppercase italic leading-snug',
  h3: 'text-2xl md:text-4xl font-extrabold tracking-tight italic',
  h4: 'text-xl md:text-2xl font-bold tracking-tight',
  h5: 'text-lg md:text-xl font-bold',
  h6: 'text-base md:text-lg font-semibold uppercase tracking-widest text-[#888]',
  body1: 'text-base font-medium leading-relaxed',
  body2: 'text-sm font-medium leading-relaxed text-neutral-500',
  caption: 'text-xs font-semibold uppercase tracking-wider text-neutral-400',
  overline:
    'text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500',
};

const alignStyles: Record<TypographyAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
};

const weightStyles: Record<TypographyWeight, string> = {
  thin: 'font-thin',
  extralight: 'font-extralight',
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
  black: 'font-black',
};

const trackingStyles: Record<TypographyTracking, string> = {
  tighter: 'tracking-tighter',
  tight: 'tracking-tight',
  normal: 'tracking-normal',
  wide: 'tracking-wide',
  wider: 'tracking-wider',
  widest: 'tracking-widest',
};

const gradientStyles: Record<string, string> = {
  primary:
    'bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent',
  ocean:
    'bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent',
  sunset:
    'bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent',
  aurora:
    'bg-linear-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent',
  neon: 'bg-linear-to-r from-fuchsia-500 to-purple-600 bg-clip-text text-transparent',
  forest:
    'bg-linear-to-r from-lime-500 to-emerald-600 bg-clip-text text-transparent',
  galaxy:
    'bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent',
};

export const Typography = ({
  children,
  variant = 'body1',
  align,
  weight,
  tracking,
  italic,
  as,
  className,
  gradient = false,
  style,
}: TypographyProps) => {
  const Component = as || variantMapping[variant];

  const getGradientClass = () => {
    if (!gradient) return '';
    if (gradient === true) return gradientStyles.primary;
    return gradientStyles[gradient] || gradientStyles.primary;
  };

  return (
    <Component
      style={style}
      className={mergeClassNames(
        variantStyles[variant],
        align && alignStyles[align],
        weight && weightStyles[weight],
        tracking && trackingStyles[tracking],
        italic && 'italic',
        getGradientClass(),
        className,
      )}
    >
      {children}
    </Component>
  );
};
