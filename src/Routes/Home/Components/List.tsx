import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import useCollection from '../../../hooks/useCollection';
import FormModal from './FormModal';
import DeleteModal from './DeleteModal';

export default function List({ theme }: { theme: string }) {

    const { documents, error, loading } = useCollection('advertisement');
    // const[maxRow,setMaxRow] = useState(0);
    const [isAdd, setIsAdd] = useState(false);
    const [isEddit, setIsEddit] = useState(false);
    const [docId, setDocId] = useState<string | undefined>(undefined)
    const [isVerified, setIsVerified] = useState<boolean>(false);


    const handleVerify = (): void => {
        setIsVerified(true);
    };

    return (
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-slate-200'}
         xl:p-8 mx-auto xl:w-full lg:w-11/12 lg:p-4 md:w-11/12 p-2 max-w-screen-xl rounded-3xl `}>
            {loading && <p className='text-center text-2xl font-bold text-gray-600 mt-8'>Please wait...</p>}
            {!documents.length && error && <p className='text-center text-2xl font-bold text-gray-600 mt-8'>Error: {error}</p>}
            {documents &&
                <ul className="flex flex-col items-center">
                    {documents.map(doc => (
                        <li className="adItem" key={doc.id}>
                            <form className="flex items-center justify-around gap-2">
                                <span className="mr-2">{documents.indexOf(doc) + 1}.</span>
                                <input type="text" placeholder="Campaign Name" className="p-2 rounded" required value={doc.CampaignName} />
                                <input type="text" placeholder="Ad Name" className="p-2 rounded" required value={doc.AdName} />
                                <select className="p-2 rounded focus:outline-none" required value={doc.CreativeType}>
                                    <option disabled selected hidden>Creative Type...</option>
                                    <option>IMG</option>
                                    <option>VID</option>
                                    <option>CAR</option>
                                </select>
                                <input type='number' placeholder='Budget' className='p-2 rounded' required min={0} value={doc.Budget} />
                                <select className="p-2 rounded focus:outline-none" value={doc.Status}>
                                    <option disabled selected hidden>Status...</option>
                                    <option className="text-black">Active</option>
                                    <option className="text-black">Paused</option>
                                    <option className="text-black">Draft</option>
                                </select>

                                {/* <input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="p-2 rounded" required /> */}
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" className="form-checkbox h-5 w-5 rounded transition duration-550 ease-in" checked={doc.Checked} />
                                </label>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEddit(true);
                                        setDocId(doc.id);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faPenToSquare} size='xl' />
                                </button>
                                <button
                                    type="button"
                                    onClick={handleVerify}
                                >
                                    <FontAwesomeIcon icon={faTrashCan} size='xl' />

                                </button>
                            {isVerified && <DeleteModal setIsVerified={setIsVerified} docId={doc.id}/>}
                            </form>
                        </li>
                    ))}
                    {documents.length < 15 &&
                        <button
                            type="button"
                            className="flex justify-center items-center mt-4 w-8 h-8 p-8 rounded-full bg-white transition transform active:scale-50"
                            onClick={() => setIsAdd(true)}
                        >
                            <FontAwesomeIcon icon={faPlus} size='xl' />
                        </button>
                    }
                    {(isEddit || isAdd) && <FormModal setIsAdd={setIsAdd} setIsEddit={setIsEddit} isAdd={isAdd} isEddit={isEddit} docId={isEddit ? docId : undefined} />}

                </ul>}

        </div>

    )
}
