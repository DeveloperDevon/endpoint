import { Center, Checkbox, Group, List, Text } from "@mantine/core"
import { Todo } from "../../lib/types"
import { useUpdateTodo } from "../../lib/hooks"
import { SkeletonList } from "../common"

type TodoListProps = {
  todos: Todo[] | undefined
  isLoading: boolean
  isError: boolean
  hasSearch: boolean
}

export const TodoList = ({ todos, isLoading, isError, hasSearch }: TodoListProps) => {
  const updateTodo = useUpdateTodo()
  const noSearchResults = hasSearch && !todos?.length

  const itemBackground = (todo: Todo): string => {
    if (todo.isComplete) return 'green.3'
    if (todo.isOverdue) return 'red.3'
    return 'gray.3'
  }

  if (isLoading) return <SkeletonList />

  if (noSearchResults || !todos?.length || isError) return (
    <Center>
      <Text>{isError ? 'Error fetching todos' : noSearchResults ? 'No todos found. Please refine your search.' : 'No todos.'}</Text>
    </Center>
  )

  return (
    <List listStyleType='none' w='100%'>
      {todos
        .map(todo => (
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
