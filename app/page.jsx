import AddTodo from '@/components/AddTodo'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <div className='mt-4'>
        <AddTodo />
      </div>
    </>
  )
}
