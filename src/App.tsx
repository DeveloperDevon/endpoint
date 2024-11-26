import { AppShell, Center, Title } from '@mantine/core';
import Todos from './components/Todos';

const App = () => {
  return (
    <AppShell header={{ height: 40 }}>
      <AppShell.Header bg='blue.9' c='white'>
        <Title order={2} ml={15}>Todo App</Title>
      </AppShell.Header>
      <AppShell.Main>
        <Center p={15}>
          <Todos />
        </Center>
      </AppShell.Main>
    </AppShell>
  )
}

export default App
