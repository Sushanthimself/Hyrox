import { memo, useEffect, type ReactNode } from 'react';
import { Modal as NativeModal, Pressable, View, type ModalProps as NativeModalProps } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  useAnimatedStyle
} from 'react-native-reanimated';

import { BlurContainer, Card, Text } from '@/components/ui';
import { cn } from '@/utils';

import { useSwipeDismiss } from '../gestures/useSwipeDismiss';
import { useMotionHaptics } from '../haptics/useMotionHaptics';

type MotionModalProps = Omit<NativeModalProps, 'children' | 'animationType' | 'transparent' | 'visible'> & {
  actions?: ReactNode;
  children: ReactNode;
  contentClassName?: string;
  enableSwipeDismiss?: boolean;
  onClose: () => void;
  title?: string;
  visible: boolean;
};

export const MotionModal = memo(function MotionModal({
  actions,
  children,
  contentClassName,
  enableSwipeDismiss = true,
  onClose,
  title,
  visible,
  ...props
}: MotionModalProps) {
  const haptics = useMotionHaptics();

  const handleClose = () => {
    haptics.modalClose();
    onClose();
  };

  const { gesture, translateY } = useSwipeDismiss({
    enabled: enableSwipeDismiss && visible,
    onDismiss: handleClose,
    resetKey: visible
  });

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }]
  }));

  useEffect(() => {
    if (visible) {
      haptics.modalOpen();
    }
  }, [haptics, visible]);

  if (!visible) {
    return null;
  }

  return (
    <NativeModal animationType="none" transparent visible={visible} {...props}>
      <View className="flex-1 justify-end">
        <Animated.View
          className="absolute inset-0 bg-overlay/70"
          entering={FadeIn.duration(180)}
          exiting={FadeOut.duration(140)}
        >
          <Pressable accessibilityRole="button" className="flex-1" onPress={handleClose} />
        </Animated.View>

        <GestureDetector gesture={gesture}>
          <Animated.View
            className="px-4 pb-6"
            entering={SlideInDown.springify().damping(20).stiffness(260)}
            exiting={SlideOutDown.duration(220)}
            style={sheetStyle}
          >
            <BlurContainer className="rounded-2xl">
              <Card
                className={cn('gap-4 rounded-2xl border-border/10 bg-card/70', contentClassName)}
                elevation="glow"
              >
                {title ? <Text variant="title">{title}</Text> : null}
                {children}
                {actions ? <View className="flex-row justify-end gap-3">{actions}</View> : null}
              </Card>
            </BlurContainer>
          </Animated.View>
        </GestureDetector>
      </View>
    </NativeModal>
  );
});
