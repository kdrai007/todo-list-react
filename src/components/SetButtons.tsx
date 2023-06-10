import { type } from './Home';

type Props = {
    type: type;
    handleChanges: (str: string) => void;
}

const SetButtons = ({ type, handleChanges }: Props) => {
    return (
        <div className='flex gap-2 items-center'>
            <button className={` ${type.isActive === 'all' && 'text-blue-600'}`} onClick={() => handleChanges('all')} >All</button>
            <button className={` ${type.isActive === 'active' && 'text-blue-600'}`} onClick={() => handleChanges('active')}>Active</button>
            <button className={` ${type.isActive === 'completed' && 'text-blue-600'}`} onClick={() => handleChanges('completed')}>Completed</button>
        </div >
    )
}

export default SetButtons