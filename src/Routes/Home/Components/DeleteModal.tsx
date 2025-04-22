import {useState} from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/config';


interface DeleteModalProps {
    setIsVerified: (value: boolean) => void;
    docId: string;
}

export default function DeleteModal({ setIsVerified, docId }: DeleteModalProps) {
    const [isLoading, setIsLoading] = useState(false);
   
    const handleDelete = async (id: string) => {
        try {
            const ref = doc(db, 'advertisement', id);
            await deleteDoc(ref);
        } catch (error) {
            console.error('Error deleting document:', error);
        }
        
    };
    
    const handleConfirmDelete = async () => {
        setIsLoading(true);
        await handleDelete(docId);
        setIsVerified(false);
        setIsLoading(false);
    };

    return (
        
        <div 
        className="modalBackground fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50"
        onClick={(e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
            (e.target as HTMLElement).classList.contains('modalBackground') && setIsVerified(false);
        }}
        >
            <div className={`bg-white rounded-lg p-6 w-96 shadow-lg`}>
                <h2 className="text-xl font-bold mb-4 text-gray-800">Confirm Deletion</h2>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete this item? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => setIsVerified(false)}
                        className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirmDelete}
                        className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
                    >
                        Delete
                    </button>
                </div>
                {isLoading && <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-max h-8 text-white bg-gray-400 rounded-xl p-8 flex justify-center items-center'>Loading...</p>}
            </div>
        </div>
    );
}