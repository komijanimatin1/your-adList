import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-regular-svg-icons';


export default function Header({ theme, toggleTheme }: { theme: string; toggleTheme?: () => void | undefined }) {
    return (
        <>
            <div className='flex justify-between max-w-screen-xl'>
                <h1 className={`${theme === 'dark' ? 'text-white' : 'text-black'} font-bold text-4xl mt-8 mb-16`}>Welcome to AdWeb - Your Marketing Solution</h1>
                <button onClick={toggleTheme} className='right-16 top-8'>{theme === 'dark' ? <FontAwesomeIcon icon={faSun} style={{ color: "#ffffff" }} size='2xl' /> : <FontAwesomeIcon icon={faSun} style={{ color: "#000000" }} size='2xl' />}</button>
            </div>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-center`}>Your one-stop solution for all marketing needs.</p>
        </>
    )
}
