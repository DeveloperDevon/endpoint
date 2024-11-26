import { Skeleton, Stack } from "@mantine/core"

type SkeletonListProps = {
  size?: number
}

export const SkeletonList = ({ size = 6 }: SkeletonListProps) => {
  return (
    <Stack h='100%' w={600}>
      {new Array(size).fill('').map((_, i: number) => (
        <Skeleton key={i} h={55} w='100%' />
      ))}
    </Stack>

  )
}
