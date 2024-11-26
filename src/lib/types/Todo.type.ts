export type Todo = {
  id: string
  description: string
  isComplete: boolean
  dueDate?: Date
  isOverdue?: boolean
}

export type SortTodoBy = 'Status' | 'Date' | 'Description'
