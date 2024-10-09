import { useSortable } from "@dnd-kit/sortable";
import { User } from "../types";
import { CSS } from '@dnd-kit/utilities';


type UserItemProps = {
    user: User,

}
const UserItem = (props: UserItemProps) => {
    const { user } = props;
    const { id, name, email } = user;

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            className='bg-blue-200 p-4 rounded shadow-md flex justify-between'>
            <div>
                <h3 className='text-lg font-semibold'>{name}</h3>
                <p className='text-gray-600'>{email}</p>
            </div>
            <button {...attributes} {...listeners} className='cursor-move'>
                Drag
            </button>
        </div>
    );
}

export default UserItem;
