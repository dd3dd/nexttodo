import AddTodo from '@/components/AddTodo'
import TaskList from '@/components/TaskList'

export default function Home() {
  return (
    <>
      <div className='mt-4'>
        <AddTodo />
        <TaskList />
      </div>
    </>
  )
}
