
import { useEffect, useState } from 'react'
import { Group, Select, Stack, TextInput } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { useTodos } from '../../lib/hooks'
import { SortTodoBy, Todo } from '../../lib/types'
import { notifications } from '@mantine/notifications'
import { sortByDate, sortByStatus } from '../../lib/utils'
import { Legend } from '../common'
import { TodoList } from './TodoList'

export const Todos = () => {
  const [search, setSearch] = useState<string>('')
  const [debouncedSearch] = useDebouncedValue(search, 350);
  const [sortBy, setSortBy] = useState<SortTodoBy>('Status')
  const { data: todos, isLoading, isError } = useTodos()

  const legendItems = [
    { label: 'Overdue', color: 'red-3' },
    { label: 'Todo', color: 'gray-3' },
    { label: 'Completed', color: 'green-3' }
  ]

  const applySearchAndSort = (todos: Todo[] | undefined): Todo[] => {
    let sorted: Todo[] = []
    if (!todos) return sorted
    if (sortBy === 'Status') sorted = sortByStatus(todos)
    if (sortBy === 'Date') sorted = sortByDate(todos)
    if (sortBy === 'Description') sorted = todos.sort((a, b) => a.description.toLowerCase().localeCompare(b.description.toLowerCase()))
    return sorted.filter((todo) => `${todo.description} ${todo.dueDate}`.toLowerCase().includes(debouncedSearch.toLowerCase()))
  }

  useEffect(() => {
    if (isError) {
      notifications.show({ message: 'Error fetching todos.', color: 'red', position: 'top-right' })
    }
  }, [isError])

  return (
    <Stack w='100%' maw={600}>
      <Group w='100%'>
        <TextInput disabled={!todos} w='65%' label='Search' placeholder='Search for a todo...' value={search} onChange={e => setSearch(e.target.value)} />
        <Select disabled={!todos} w='32%' data={['Status', 'Date', 'Description']} label='Order by' value={sortBy} onChange={(v) => setSortBy(v as SortTodoBy)} />
      </Group>
      <Stack>
        <Legend items={legendItems} />
        <TodoList todos={applySearchAndSort(todos)} isLoading={isLoading} isError={isError} hasSearch={!!debouncedSearch.length} />
      </Stack>
    </Stack>
  )
}
