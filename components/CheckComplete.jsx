'use client'
import { useContext } from 'react'
import Context from '@/context/Context'
export default function CheckComplete() {
    const { showComplete, setShowComplete } = useContext(Context);
    const handleCheckbox = () => {
        setShowComplete(!showComplete);
    }
    return (
        <div className="sticky top-40 mb-4 flex items-center bg-white">
            <input className='w-4 h-4 mr-2' type="checkbox" id="showComplete" checked={showComplete} onChange={handleCheckbox} />
            <label htmlFor="showComplete">顯示已完成的Task</label>
        </div>
    )
}