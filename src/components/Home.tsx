import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Todo {
    id: string;
    item: string;
    isChecked: boolean;
}

const Home = () => {
    const [theme, setTheme] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState<Todo[]>([]);

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (inputValue === "") return;
        if (e.code === "Enter") {
            const newTodo: Todo = {
                id: uuidv4(),
                item: inputValue,
                isChecked: false,
            };
            setTodos([...todos, newTodo]);
            setInputValue("");
        }
    };

    const handleCheck = (index: number) => {
        const updatedTodos = todos.map((item, idx) => {
            if (idx === index) {
                return {
                    ...item,
                    isChecked: !item.isChecked,
                };
            }
            return item;
        });
        setTodos(updatedTodos);
    };
    function handleClear() {
        const updatedTodos = todos.filter((item) => {
            return item.isChecked != true
        })
        setTodos(updatedTodos);
    }
    return (
        <div className={`flex flex-col items-center relative h-screen overflow-y-scroll ${theme ? "bg-white" : "bg-black"}`}>
            <img src={`/images/bg-desktop-${theme ? "light" : "dark"}.jpg`} alt="background-img" className='w-full h-[40%] object-fill z-0' />
            <div className='absolute flex items-center justify-between w-[35%] mt-[50px]'>
                <h1 className='font-bold text-white tracking-[8px] text-[28px]'>TODO</h1>
                <img
                    className='cursor-pointer'
                    src={`/images/icon-${theme ? 'moon' : 'sun'}.svg`}
                    alt=""
                    onClick={() => setTheme(!theme)}
                />
            </div>
            <div className={` ${theme ? 'bg-white' : 'bg-[#25273cf6] text-white'} p-4 rounded-md absolute flex items-center justify-between w-[35%] mt-[120px]`}>
                <div className={`w-[24px] h-[24px] border rounded-full cursor-pointer flex items-center`} />
                <input
                    type="text"
                    placeholder='Enter something'
                    className={`w-full ml-8 outline-none ${theme ? 'bg-white ' : 'bg-[#25273cf6] text-white'}`}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => handleKey(e)}
                />
            </div>
            <div className={`absolute flex flex-col items-center justify-evenly rounded-md w-[35%] mt-[190px]  ${theme ? 'bg-white text-black' : 'bg-[#25273cf6] text-white'} text-white  hideScroll`}>
                {todos.map((todo, index) => (
                    <div className={`flex items-center justify-start w-full p-4 border-b border-white border-opacity-20 `} key={todo.id}>
                        <div
                            onClick={() => handleCheck(index)}
                            className={`${todo.isChecked ? 'check-box' : ''} w-[24px] h-[24px] border rounded-full cursor-pointer flex items-center justify-center`}
                        >
                            {todo.isChecked && <img src="/images/icon-check.svg" alt="check img" className='w-[15px] h-[15px] object-contain' />}
                        </div>
                        <p className={`ml-8 capitalize ${todo.isChecked && 'line-through'}`}>{todo.item}</p>
                    </div>
                ))}
                {todos.length > 0 && (
                    <div className='w-full flex justify-between p-3 text-sm text-[#4d5066]'>
                        <p><span>{todos.length}</span> items left</p>
                        <div className='flex gap-2 items-center'>
                            <button className='hover:text-white'>All</button>
                            <button className='hover:text-white'>Active</button>
                            <button className='hover:text-white'>Completed</button>
                        </div>
                        <button className='hover:text-white' onClick={handleClear} >Clear Completed</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
