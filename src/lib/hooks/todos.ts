import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import endpointApi from '../axios'
import { sortByStatus } from '../utils'
import { Todo } from '../types'
import { notifications } from '@mantine/notifications'

const fetchTodosList = async (): Promise<Todo[]> => {
  const response = await endpointApi.get('/get')
  const todos: Todo[] = response.data

  return todos
}

const updateTodo = async (payload: { id: string, isComplete: boolean }): Promise<{ status: string }> => {
  const { id, isComplete } = payload
  const response = await endpointApi.patch(`/patch/${id}`, { isComplete })

  if (response.data.status !== 'success') throw new Error('Error updating todo')
  return response.data
}

export const useTodos = () => {
  const query = useQuery({ queryKey: ['todos'], queryFn: fetchTodosList, retry: 1 })
  return query
}

export const useUpdateTodo = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: updateTodo,
    onMutate: ({ id, isComplete }) => {
      queryClient.setQueryData(['todos'], (prevData: Todo[]) => {
        const updatedTodos = prevData.map(todo => {
          if (todo.id === id) return { ...todo, isComplete }
          return todo
        })
        const resorted = sortByStatus(updatedTodos)
        return resorted
      })
    },
    onError: (err, newTodo) => {
      console.error('Error updating todo: ', { todo: newTodo, message: err.message })
      queryClient.setQueryData(['todos'], (prevData: Todo[]) => {
        const updatedTodos = prevData.map(todo => {
          if (todo.id === newTodo.id) return { ...todo, isComplete: !newTodo.isComplete }
          return todo
        })
        const resorted = sortByStatus(updatedTodos)
        return resorted
      })
      notifications.show({ message: 'There was an error updating the todo.', position: 'top-right', color: 'red' })
    }
  })

  return mutation
}
