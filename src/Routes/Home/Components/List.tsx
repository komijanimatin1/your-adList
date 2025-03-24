import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function List() {
    return(
    <div>
        <ul className="flex flex-col gap-6 items-center">
            <li className="adItem">
                <form className="flex items-center gap-2">
                    <input type="text" placeholder="Campaign Name" className="p-2 rounded" required />
                    <input type="text" placeholder="Ad Name" className="p-2 rounded" required />
                    <select className="p-2 rounded focus:outline-none" required>
                        <option disabled selected hidden>Creative Type...</option>
                        <option>IMG</option>
                        <option>VID</option>
                        <option>CAR</option>
                    </select>
                    <input type='number' placeholder='Budget' className='p-2 rounded' required min={0} />
                    <select className="p-2 rounded focus:outline-none text-gray-400">
                        <option disabled selected hidden>Status...</option>
                        <option className="text-black">Active</option>
                        <option className="text-black">Paused</option>
                        <option className="text-black">Draft</option>
                    </select>

                    <input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="p-2 rounded" required />
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="form-checkbox h-5 w-5 rounded transition duration-550 ease-in" />
                    </label>
                    <button type="button">
                        <FontAwesomeIcon icon={faTrashCan} size='xl' />
                    </button>
                </form>
            </li>
            <li className="adItem">Ad 2</li>
            <li className="adItem">Ad 3</li>
            <li className="adItem">Ad 4</li>
            <li className="adItem">Ad 4</li>
            <li className="adItem">Ad 4</li>
            <li className="adItem">Ad 4</li>
            <li className="adItem">Ad 4</li>
            <li className="adItem">Ad 4</li>
            <li className="adItem">Ad 4</li>
        </ul>
    </div>
    )
}
