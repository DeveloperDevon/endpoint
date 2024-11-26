import { Group, Box, Text } from "@mantine/core"
import { LegendItem } from "../../lib/types"

export const Legend = ({ items }: { items: LegendItem[] }) => {
  return (
    <Group gap="xs">
      {items.map((item, index) => (
        <Group key={index} gap="sm" align="center">
          <Box
            style={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              backgroundColor: `var(--mantine-color-${item.color}`,
            }}
          />
          <Text size="sm" fw={500}>
            {item.label}
          </Text>
        </Group>
      ))}
    </Group>
  )
}
