import { useAuth } from './context/AuthContext.jsx'
import LoginBox from './components/LoginBox.jsx'
import TaskArea from './components/TaskArea.jsx'
import PageFooter from './components/PageFooter.jsx'

export default function App() {
  const { token } = useAuth()

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">{token ? <TaskArea /> : <LoginBox />}</main>
      <PageFooter />
    </div>
  )
}
