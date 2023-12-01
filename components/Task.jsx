'use client';
import { useState } from 'react';
import { useContext } from 'react'
import Context from '@/context/Context'
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { FaRegEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
export default function Task({ id = 0, name = '', description = '', is_completed = false, updated_at = '' }) {
    const { showComplete, setShowComplete } = useContext(Context);
    const [isEdit, setIsEdit] = useState(false);
    const { newName, setNewName } = useContext(Context);
    const { newDescription, setNewDescription } = useContext(Context);
    let newUpdated_at = new Date(updated_at);
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
    const changeStatus = async () => {
        try {
            const res1 = await fetch(`https://wayi.league-funny.com/api/task/${id}`, {
                method: "PATCH",
            });
            const res2 = await fetch(`https://wayi.league-funny.com/api/task/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    "name": name,
                    "description": description
                }),
            });
            if (!res1.ok || !res2.ok) {
                throw new Error("Failed to update task");
            }
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    }
    const handleEdit = () => {
        setIsEdit(true);
        setNewName(name);
        setNewDescription(description);
    }
    const cancelEdit = () => {
        setIsEdit(false);
        setNewName(name);
        setNewDescription(description);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newName) {
            alert("任務名稱不能為空");
            return;
        }
        try {
            const res = await fetch(`https://wayi.league-funny.com/api/task/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    "name": newName,
                    "description": newDescription
                }),
            });
            if (!res.ok) {
                throw new Error("Failed to update task");
            }
            setNewName('');
            setNewDescription('');
            setIsEdit(false);
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            {
                (showComplete || (!showComplete && !is_completed)) &&
                <div className="w-full flex shadow-md mb-2 p-2 justify-between">
                    <div className="mr-2">
                        <div className='flex '>
                            {isEdit === false ?
                                <div>
                                    <div className='flex items-center'>
                                        {
                                            is_completed === true ?
                                                <del className="text-3xl font-bold">{name} </del> :
                                                <p className="text-3xl font-bold">{name} </p>
                                        }
                                        <input className='w-4 h-4 ml-2 ' type="checkbox" checked={is_completed} onChange={changeStatus} />
                                    </div>
                                    {
                                        is_completed === true ?
                                            <del>{description} </del> :
                                            <p>{description}</p>
                                    }
                                </div> :
                                <form onSubmit={handleSubmit} action="">
                                    <div className='max-w-editInputWidth flex'>
                                        <div>
                                            <input
                                                maxLength={10}
                                                className="border border-slate-500 px-2 h-9 mb-1"
                                                onChange={e => setNewName(e.target.value)}
                                                value={newName}
                                                type="text"
                                            />
                                            <input
                                                maxLength={30}
                                                className="border border-slate-500 px-2 h-6"
                                                onChange={e => setNewDescription(e.target.value)}
                                                value={newDescription}
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                    <button className='mt-2 text-green-500' type="submit" >
                                        <FaCheck size={24} />
                                    </button>
                                    <button className='ml-2' type='button' onClick={cancelEdit}>
                                        <MdCancel size={24} />
                                    </button>
                                </form>
                            }
                        </div>
                        {
                            is_completed === false ?
                                <p className="text-red-600 font-semibold">未完成</p> :
                                <p className="text-green-600 font-semibold">已完成</p>
                        }
                        <div className='flex'>
                            <p>更新時間 : </p>
                            <p className='ml-1'>{newUpdated_at.toLocaleString()}</p>
                        </div>
                    </div>
                    <div>
                        <button onClick={handleEdit} className="text-black">
                            <FaRegEdit size={24} />
                        </button>
                        <button onClick={handleDelete} className="text-red-600 ml-2">
                            <HiOutlineTrash size={24} />
                        </button>
                    </div>
                </div>
            }
        </>
    )
}