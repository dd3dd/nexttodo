'use client'
import { useContext } from 'react'
import Context from '@/context/Context'
export default function CheckComplete() {
    const handleCheckbox = () => {
        setShowComplete(!showComplete);
    }
    const { showComplete, setShowComplete } = useContext(Context);
    return (
        <div className="mb-4 flex items-center">
            <input className='w-4 h-4 mr-2' type="checkbox" id="showComplete" checked={showComplete} onChange={handleCheckbox} />
            <label htmlFor="showComplete">顯示已完成的Task</label>
        </div>
    )
}