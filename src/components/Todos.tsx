
import { Todo } from './Home'

type Props = {
    todo: Todo;
    index: number;
    handleCheck: (index: number) => void;
    handleDelete: (index: number) => void;
    theme: boolean
}

const Todos = ({ todo, index, handleCheck, handleDelete, theme }: Props) => {
    return (
        <div className={`flex items-center justify-between w-full p-4 border-b border-opacity-20 ${theme ? "text-black  border-black" : ' text-white border-white'}`} key={todo.id}>
            <div className='flex items-center'>
                <div
                    onClick={() => handleCheck(index)}
                    className={`${todo.isChecked ? 'check-box' : ''} ${theme ? "border-black" : ' border-white'} w-[24px] h-[24px] border rounded-full cursor-pointer flex items-center justify-center`}
                >
                    {todo.isChecked && <img src="/images/icon-check.svg" alt="check img" className='w-[15px] h-[15px] object-contain' />}
                </div>
                <p className={`ml-8 capitalize ${todo.isChecked && 'line-through'}`}>{todo.item}</p>
            </div>
            <button onClick={() => handleDelete(index)}>
                <img src="/images/icon-cross.svg" alt="cross icon" />
            </button>
        </div>
    )
}

export default Todos