
import './index.css'
import { TodoList } from './components/TodoList/TodoList'

function App() {

  return (
    <>
      <div className='container'>
        <h1>TODO LIST</h1>
        <div className="main">
          <TodoList />
        </div>
      </div>
     
    </>
  )
}

export default App
