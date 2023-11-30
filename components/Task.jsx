'use client';
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
export default function Task({ id = 0, name = '', description = '', is_completed = false, }) {
    const router = useRouter();
    const handleDelete = async () => {
        const confirmed = confirm("確定要刪除?");
        if (confirmed) {
            const res = await fetch(`https://wayi.league-funny.com/api/task/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                router.refresh();
            }
        }
    }
    return (
        <div className="w-full flex h-24 shadow-md mb-2 p-2 justify-between">
            <div className="mr-2">
                <p className="text-3xl font-bold">{name}</p>
                <p className="">{description}</p>
                {
                    is_completed === false ?
                        <p className="text-red-600 font-semibold">未完成</p> :
                        <p className="text-green-600 font-semibold">已完成</p>
                }
            </div>
            <div>
                <button onClick={handleDelete} className="text-red-600">
                    <HiOutlineTrash size={24} />
                </button>
            </div>

        </div>
    )
}