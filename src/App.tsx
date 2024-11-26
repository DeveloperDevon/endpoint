import { AppShell, Center, Title } from '@mantine/core';
import { TodoList } from './components/TodoList'

const App = () => {
  return (
    <AppShell header={{ height: 50 }}>
      <AppShell.Header bg='blue.9' c='white'>
        <Title ml={15}>Todo App</Title>
      </AppShell.Header>
      <AppShell.Main>
        <Center p={15}>
          <TodoList />
        </Center>
      </AppShell.Main>
    </AppShell>
  )
}

export default App
