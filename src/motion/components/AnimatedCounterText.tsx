import { memo } from 'react';
import { TextInput, type TextInputProps, type TextStyle } from 'react-native';
import Animated, { type AnimatedProps } from 'react-native-reanimated';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

type AnimatedCounterTextProps = Omit<TextInputProps, 'editable' | 'value'> & {
  animatedProps: AnimatedProps<TextInputProps>['animatedProps'];
  className?: string;
  style?: TextStyle;
};

/**
 * Renders a counter on the UI thread via animated TextInput props — no React rerenders per frame.
 */
export const AnimatedCounterText = memo(function AnimatedCounterText({
  animatedProps,
  className,
  style,
  ...props
}: AnimatedCounterTextProps) {
  return (
    <AnimatedTextInput
      animatedProps={animatedProps}
      className={className}
      editable={false}
      pointerEvents="none"
      style={style}
      underlineColorAndroid="transparent"
      {...props}
    />
  );
});
