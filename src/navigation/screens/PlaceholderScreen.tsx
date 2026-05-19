import { Badge, Card, Screen, Text } from '@/components';

type PlaceholderScreenProps = {
  description: string;
  eyebrow: string;
  title: string;
};

export function PlaceholderScreen({ description, eyebrow, title }: PlaceholderScreenProps) {
  return (
    <Screen contentClassName="justify-center gap-5" scroll>
      <Badge label={eyebrow} variant="primary" />
      <Text variant="display">{title}</Text>
      <Card className="gap-3" variant="glass">
        <Text tone="muted">{description}</Text>
      </Card>
    </Screen>
  );
}
