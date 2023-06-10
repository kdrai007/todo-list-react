import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Todos from './Todos';
import SetButtons from './SetButtons';

export interface Todo {
    id: string;
    item: string;
    isChecked: boolean;
}
export interface type {
    all: Todo[];
    isActive: string

}
type Props = {
    ScreenWidth: number
}

const Home = ({ ScreenWidth }: Props) => {
    const [theme, setTheme] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState<Todo[]>([]);
    const [type, setType] = useState<type>({
        all: [],
        isActive: "all"
    })

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (inputValue === "") return;
        if (e.code === "Enter") {
            const newTodo: Todo = {
                id: uuidv4(),
                item: inputValue,
                isChecked: false,
            };
            setTodos([...todos, newTodo]);
            setType({
                ...type,
                all: [...todos, newTodo]
            })
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
        setType({
            ...type,
            all: updatedTodos
        })
        setTodos(updatedTodos);
    };
    function handleClear() {
        const updatedTodos = todos.filter((item) => {
            return item.isChecked != true
        })
        setTodos(updatedTodos);
        setType({
            ...type,
            all: updatedTodos
        })
    }
    function handleChanges(str: string) {
        const mainArray = JSON.parse(JSON.stringify(type.all));
        if (str === "active") {
            const updatedArray = mainArray.filter((item: Todo) => {
                return item.isChecked != true
            })
            setTodos(updatedArray);
        } else if (str === "completed") {
            const updatedArray = mainArray.filter((item: Todo) => {
                return item.isChecked != false
            })
            setTodos(updatedArray);
        } else {
            setTodos([...type.all])
        }
        setType({
            ...type,
            isActive: str
        })
    }
    function handleDelete(index: number) {
        const updatedTodos = todos.filter((_item, idx) => {
            return idx != index
        })
        setTodos(updatedTodos);
        setType({
            ...type,
            all: updatedTodos
        })
    }
    return (
        <div className={`flex flex-col items-center relative h-screen overflow-y-scroll hideScroll ${theme ? "bg-white" : "bg-black"}`}>
            {ScreenWidth > 800 ? <img src={`/images/bg-desktop-${theme ? "light" : "dark"}.jpg`} alt="background-img" className='w-full h-[40%] object-fill z-0' /> : <img src={`/images/bg-mobile-${theme ? "light" : "dark"}.jpg`} alt="background-img" className='w-full h-[50%]' />}
            <div className='absolute flex items-center justify-between w-[80%] md:w-[50%] lg:w-[35%] mt-[50px]'>
                <h1 className='font-bold text-white tracking-[8px] text-[28px]'>TODO</h1>
                <img
                    className='cursor-pointer'
                    src={`/images/icon-${theme ? 'moon' : 'sun'}.svg`}
                    alt=""
                    onClick={() => setTheme(!theme)}
                />
            </div>
            <div className={` ${theme ? 'bg-white' : 'bg-[#25273cf6] text-white'} p-4 rounded-md absolute flex items-center justify-between w-[90%] md:w-[50%] lg:w-[35%] mt-[120px]`}>
                <div className={`w-[24px] h-[24px] border  ${theme ? "border-black" : ' border-white'} rounded-full cursor-pointer flex items-center`} />
                <input
                    type="text"
                    placeholder='Enter something'
                    className={`w-full ml-8 outline-none ${theme ? 'bg-white ' : 'bg-[#25273cf6] text-white'}`}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => handleKey(e)}
                />
            </div>
            <div className={`absolute flex flex-col items-center justify-evenly rounded-md w-[90%] md:w-[50%] lg:w-[35%] mt-[190px]  ${theme ? 'bg-white text-black' : 'bg-[#25273cf6] text-white'} text-white  hideScroll`}>
                {todos.map((todo, index) => (
                    <Todos key={todo.id} todo={todo} index={index} handleCheck={handleCheck} handleDelete={handleDelete} theme={theme} />
                ))}

                <div className='w-full flex justify-between p-3  md:text-sm text-[#4d5066]'>
                    <p><span>{todos.length}</span> items left</p>
                    {ScreenWidth > 800 && <SetButtons type={type} handleChanges={handleChanges} theme={theme} />}
                    <button className={`${theme ? 'hover:text-black' : 'hover:text-white'}`} onClick={handleClear} >Clear Completed</button>
                </div>
                {ScreenWidth < 800 && <div className={`w-full flex items-center justify-center text-[#4d5066] ${theme ? 'bg-white ' : 'bg-[#25273cf6]'}  p-4`}>
                    <SetButtons type={type} handleChanges={handleChanges} theme={theme} />
                </div>}
            </div>

        </div>
    );
}

export default Home;
