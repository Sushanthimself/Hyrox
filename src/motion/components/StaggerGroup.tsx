import { Children, cloneElement, isValidElement, memo, type ReactElement, type ReactNode } from 'react';
import Animated from 'react-native-reanimated';

import { useStaggerChildren } from '../hooks/useStagger';

type StaggerGroupProps = {
  baseDelayMs?: number;
  children: ReactNode;
  staggerMs?: number;
  variant?: 'fade' | 'fadeDown' | 'fadeUp' | 'slideRight';
};

/**
 * Applies staggered layout entering to each direct child.
 */
export const StaggerGroup = memo(function StaggerGroup({
  baseDelayMs,
  children,
  staggerMs,
  variant
}: StaggerGroupProps) {
  const childArray = Children.toArray(children);
  const staggerItems = useStaggerChildren(childArray.length, { baseDelayMs, staggerMs, variant });

  return (
    <>
      {childArray.map((child, index) => {
        if (!isValidElement(child)) {
          return child;
        }

        const { entering } = staggerItems[index] ?? {};

        return (
          <Animated.View entering={entering} key={child.key ?? `stagger-${index}`}>
            {cloneElement(child as ReactElement)}
          </Animated.View>
        );
      })}
    </>
  );
});
