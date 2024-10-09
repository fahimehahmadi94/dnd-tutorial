import { useState } from "react";
import UserItem from "./user-item";
import { User } from "../types";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";


const dummyData: User[] = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
    },
    {
        id: 3,
        name: 'Alice Johnson',
        email: 'alice@example.com',
    },
]

const UserList = () => {
    const [userData, setUserData] = useState<User[]>(dummyData);

    const handleDargEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id != over?.id) {
            setUserData(items => {
                const oldIndex = items.findIndex(item => item.id === active.id)
                const newIndex = items.findIndex(item => item.id === over.id)
                return arrayMove(items, oldIndex, newIndex)
            })
        }
    }
    console.log({ userData });


    return (
        <div className="max-w-2xl mx-auto grid gap-2 my-10">
            <h2 className='text-2xl font-bold mb-4'>User List</h2>
            <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={handleDargEnd}>
                <SortableContext items={userData}>
                    {
                        userData.map((user) => (
                            <UserItem key={user.id} user={user} />
                        ))
                    }
                </SortableContext>
            </DndContext>
        </div>

    );
}

export default UserList;
