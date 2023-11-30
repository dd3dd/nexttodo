"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function AddTodo() {
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) {
            alert("name is required.");
            return;
        }
        try {
            const res = await fetch("https://wayi.league-funny.com/api/task", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    "name": name,
                    "description": description
                }),
            });

            if (res.ok) {
                setName('');
                setDescription('');
                router.refresh();
            } else {
                throw new Error("Failed to create a task");
            }
        } catch (error) {
            console.log(error);
        }
    }
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
                maxLength={10}
                onChange={e => setName(e.target.value)}
                className="border border-slate-500 px-4 py-2"
                value={name}
                type="text"
                placeholder="name"
            />
            <input
                maxLength={30}
                onChange={e => setDescription(e.target.value)}
                className="border border-slate-500 px-4 py-2"
                value={description}
                type="text"
                placeholder="description"
            />
            <button
                type="submit"
                className="bg-green-600 font-bold text-white mb-4 py-3 px-6 w-fit"
            >
                新增
            </button>
        </form>

    )
}