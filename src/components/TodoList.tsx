import { useEffect } from 'react'
import { Checkbox, Group, List, Skeleton, Stack, Text, Title } from '@mantine/core'
import { useTodos, useUpdateTodo } from '../lib/hooks/todos'
import { Todo } from '../lib/types'
import { notifications } from '@mantine/notifications'

export const TodoList = () => {
  const { data: todos, isLoading, isError } = useTodos()
  const updateTodo = useUpdateTodo()

  const itemBackground = (todo: Todo): string => {
    if (todo.isComplete) return 'green.3'
    if (todo.isOverdue) return 'red.3'
    return 'gray.3'
  }

  useEffect(() => {
    if (isError) {
      notifications.show({ message: 'Error fetching todos.', color: 'red', position: 'top-right' })
    }

  }, [isError])

  if (isLoading || updateTodo.isPending) return (
    <Stack h='100%' w={600}>
      {new Array(6).fill('').map((_, i: number) => (
        <Skeleton key={i} h={55} w='100%' />
      ))}
    </Stack>
  )

  if (!todos?.length || isError) return (
    <Title order={4}>No todos found.</Title>
  )

  return (
    <List listStyleType='none' w={600}>
      {todos?.map(todo => (
        <List.Item key={todo.id} styles={{ itemLabel: { width: '100%' }, itemWrapper: { width: '100%' } }}>
          <Group p={15} mb={15} bg={itemBackground(todo)} wrap='nowrap' justify='space-between'>
            <Group>
              <Checkbox onChange={() => updateTodo.mutate({ id: todo.id, isComplete: !todo.isComplete })} checked={todo.isComplete} />
              <Text style={{ textDecoration: todo.isComplete ? 'line-through' : 'none' }}>{todo.description}</Text>
            </Group>
            <Group>
              <Text>{todo.dueDate?.toString().split('T')[0]}</Text>
            </Group>
          </Group>
        </List.Item>
      ))}
    </List>
  )
}
