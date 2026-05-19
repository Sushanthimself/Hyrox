import {
  Modal as NativeModal,
  Pressable,
  View,
  type ModalProps as NativeModalProps
} from 'react-native';
import type { ReactNode } from 'react';

import { cn } from '@/utils';

import { BlurContainer } from './BlurContainer';
import { Card } from './Card';
import { Text } from './Text';

type ModalProps = Omit<NativeModalProps, 'children' | 'transparent' | 'visible'> & {
  actions?: ReactNode;
  children: ReactNode;
  contentClassName?: string;
  onClose: () => void;
  title?: string;
  visible: boolean;
};

export function Modal({
  actions,
  children,
  contentClassName,
  onClose,
  title,
  visible,
  ...props
}: ModalProps) {
  return (
    <NativeModal animationType="fade" transparent visible={visible} {...props}>
      <View className="flex-1 justify-end bg-overlay/70 px-4 pb-6">
        <Pressable className="absolute inset-0" onPress={onClose} />
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
      </View>
    </NativeModal>
  );
}
