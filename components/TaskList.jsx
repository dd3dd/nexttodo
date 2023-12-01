import CheckComplete from "./CheckComplete";
import Task from "./Task";

const show = async (currentPage = 1) => {
    try {
        const url = currentPage === 1
            ? 'https://wayi.league-funny.com/api/task'
            : `https://wayi.league-funny.com/api/task?page=${currentPage}`;
        const res = await fetch(url, {
            cache: "no-store",
        });
        const data = await res.json();

        if (data.data.length > 0) {
            const nextPageData = await show(currentPage + 1);
            return [...data.data, ...nextPageData];
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
    }
};
export default async function TaskList() {
    const getData = await show();
    return (
        <div className="mt-4">
            <CheckComplete />
            {getData.map(e =>
                <Task key={e.id} id={e.id} name={e.name} description={e.description} is_completed={e.is_completed}
                    updated_at={e.updated_at}
                />
            )}
        </div>
    )
}