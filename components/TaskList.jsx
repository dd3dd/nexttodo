import CheckComplete from "./CheckComplete";
import Task from "./Task";

const show = async () => {
    try {
        const res = await fetch('https://wayi.league-funny.com/api/task', {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch task");
        }
        return res.json();
    } catch (error) {
        console.log(error);
    }
};
export default async function TaskList() {
    const getData = await show();
    const taskData = getData.data;
    return (
        <div className="mt-4">
            <CheckComplete />
            {taskData.map(e =>
                <Task key={e.id} id={e.id} name={e.name} description={e.description} is_completed={e.is_completed}
                />
            )}
        </div>
    )
}