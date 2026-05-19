import { Text as NativeText, type TextProps as NativeTextProps } from 'react-native';

import { cn } from '@/utils';

type TextTone = 'accent' | 'danger' | 'muted' | 'primary' | 'secondary' | 'success' | 'warning';
type TextVariant =
  | 'body'
  | 'bodyStrong'
  | 'caption'
  | 'display'
  | 'heading'
  | 'overline'
  | 'stat'
  | 'title';

type TextProps = NativeTextProps & {
  tone?: TextTone;
  variant?: TextVariant;
};

const variantClasses: Record<TextVariant, string> = {
  body: 'text-md font-regular',
  bodyStrong: 'text-md font-semibold',
  caption: 'text-sm font-medium',
  display: 'text-hero font-black',
  heading: 'text-2xl font-bold',
  overline: 'text-xs font-bold uppercase',
  stat: 'text-3xl font-black',
  title: 'text-xl font-bold'
};

const toneClasses: Record<TextTone, string> = {
  accent: 'text-accent',
  danger: 'text-danger',
  muted: 'text-muted-foreground',
  primary: 'text-foreground',
  secondary: 'text-secondary',
  success: 'text-success',
  warning: 'text-warning'
};

export function Text({ className, tone = 'primary', variant = 'body', ...props }: TextProps) {
  return (
    <NativeText
      className={cn(
        'font-body tracking-normal',
        variantClasses[variant],
        toneClasses[tone],
        className
      )}
      {...props}
    />
  );
}
