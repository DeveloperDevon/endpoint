import { Todo } from "./types";

export const sortByDate = (todos: Todo[]): Todo[] => todos.sort((a, b) => {
  if (!a.dueDate && !b.dueDate) return 0
  if (!a.dueDate) return 1
  if (!b.dueDate) return -1

  const dateA = new Date(a.dueDate)
  const dateB = new Date(b.dueDate)

  return dateA.getTime() - dateB.getTime()
})

export const sortByStatus = (todos: Todo[]) => {
  const now = Date.now()
  const overdue: Todo[] = []
  const normal: Todo[] = []
  const completed: Todo[] = []

  const sortedByDate = sortByDate(todos)

  sortedByDate.forEach(todo => {
    if (todo.isComplete) return completed.push(todo)
    const isOverdue = todo.dueDate && new Date(todo.dueDate).getTime() < now
    if (isOverdue) return overdue.push({ ...todo, isOverdue: true })
    normal.push(todo)
  })

  const sortedByGroup: Todo[] = [...overdue, ...normal, ...completed]

  return sortedByGroup
}
