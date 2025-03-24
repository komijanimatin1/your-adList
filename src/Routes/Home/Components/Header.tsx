import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    return (
        <>
            <div>
                <h1 className="text-white font-bold text-4xl mt-8 mb-16">Welcome to AdWeb - Your Marketing Solution</h1>
                <p className="text-gray-200 text-center">Your one-stop solution for all marketing needs.</p>
            </div>
            <div>
                <input type="text" placeholder="Search..." className="mt-4 p-2 rounded" />
                <FontAwesomeIcon className='text-gray-200 bg-amber-500' icon={faMagnifyingGlass} />
            </div>
        </>
    )
}
