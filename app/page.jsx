import AddTodo from '@/components/AddTodo'
import TaskList from '@/components/TaskList'
import Image from 'next/image'

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
