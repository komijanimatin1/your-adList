import { useEffect, useState } from 'react';
import { db } from '../../../firebase/config';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface ModalProps {
    docId?: string;
    isAdd: boolean;
    isEddit: boolean;
    setIsAdd: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEddit: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function FormModal({ docId, isAdd, isEddit, setIsAdd, setIsEddit }: ModalProps) {
    const [campaignName, setCampaignName] = useState('');
    const [adName, setAdName] = useState('');
    const [creativeType, setCreativeType] = useState('');
    const [budget, setBudget] = useState(0);
    const [status, setStatus] = useState('');
    const [checked, setChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const schema=yup.object().shape({
        CampaignName: yup.string().required('Campaign Name is required'),
        AdName: yup.string().required('Ad Name is required'),
        CreativeType: yup.string().required('Creative Type is required'),
        Budget: yup.number().required('Budget is required').positive('Budget must be a positive number'),
        Status: yup.string().required('Status is required'),
        Checked: yup.boolean(),
        
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if ((e.target as HTMLElement).classList.contains('modalBackground')) {
            isAdd ? setIsAdd(false) : null;
            isEddit ? setIsEddit(false) : null;
        }
    }

    const onSubmit = async (data: { CampaignName: string; AdName: string; CreativeType: string; Budget: number; Status: string; Checked?: boolean }) => {
        setIsLoading(true);
        const adData = {
            CampaignName: data.CampaignName,
            AdName: data.AdName,
            CreativeType: data.CreativeType,
            Budget: data.Budget,
            Status: data.Status,
            Checked: data.Checked,
        };

        try {
            if (isAdd) {
                let ref = collection(db, 'advertisement');
                await addDoc(ref, adData);
                console.log('Ad data added successfully');
            } else if (isEddit && docId) {
                let ref = doc(db, 'advertisement', docId);
                await updateDoc(ref, adData);
                console.log('Ad data updated successfully');
            }
        } catch (error) {
            console.error('Error updating ad data: ', error);
        }

        setIsLoading(false);
        isAdd ? setIsAdd(false) : null;
        isEddit ? setIsEddit(false) : null;

    }

    useEffect(() => {
        if (isEddit && docId) {
            const fetchData = async () => {
                try {
                    setIsLoading(true);
                    const docRef = doc(db, 'advertisement', docId);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setCampaignName(data.CampaignName);
                        setAdName(data.AdName);
                        setCreativeType(data.CreativeType);
                        setBudget(data.Budget);
                        setStatus(data.Status);
                        setChecked(data.Checked);
                        setIsLoading(false);

                    }
                } catch (error) {
                    console.error('Error fetching document:', error);
                    setIsLoading(false);
                }
            };
            fetchData();
        }
    }, [docId]);

    return (
        <div 
        className="modalBackground fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" 
        onClick={handleClick}
        >
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">{isAdd ? 'Create New Ad' : 'Edit Ad'}</h2>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="Campaign Name"
                        {...register('CampaignName')}
                        className="p-2 rounded border"
                        value={campaignName.trim()}
                        onChange={(e) => setCampaignName(e.target.value.trim())}
                        // required
                    />
                    {errors.CampaignName && <p className="text-red-500">{errors.CampaignName.message}</p>}
                    <input
                        type="text"
                        placeholder="Ad Name"
                        {...register('AdName')}
                        className="p-2 rounded border"
                        value={adName.trim()}
                        onChange={(e) => setAdName(e.target.value.trim())}
                        // required
                    />
                    {errors.AdName && <p className="text-red-500">{errors.AdName.message}</p>}
                    <select
                        className="p-2 rounded border"
                        {...register('CreativeType')}
                        value={creativeType}
                        onChange={(e) => setCreativeType(e.target.value)}
                        // required
                    >
                        <option selected hidden>Creative Type...</option>
                        <option>IMG</option>
                        <option>VID</option>
                        <option>CAR</option>
                    </select>
                    {errors.CreativeType && <p className="text-red-500">{errors.CreativeType.message}</p>}
                    <input
                        type="number"
                        placeholder="Budget"
                        {...register('Budget')}
                        className="p-2 rounded border"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        // required
                        />
                        {errors.Budget && <p className="text-red-500">{errors.Budget.message}</p>}
                    <select
                        className="p-2 rounded border"
                        {...register('Status')}
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        // required
                    >
                        <option selected hidden>Status...</option>
                        <option>Active</option>
                        <option>Paused</option>
                        <option>Draft</option>
                    </select>
                    {errors.Status && <p className="text-red-500">{errors.Status.message}</p>}
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 rounded transition duration-550 ease-in"
                            {...register('Checked')}
                            checked={checked}
                            onChange={(e) => setChecked(e.target.checked)}
                        />
                        <span>Checked</span>
                    </label>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 rounded"
                            onClick={() => {
                                isAdd ? setIsAdd(false) : null;
                                isEddit ? setIsEddit(false) : null;
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Save
                        </button>
                        {isLoading && <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-max h-8 text-white bg-gray-400 rounded-xl p-8 flex justify-center items-center'>Loading...</p>}
                    </div>
                </form>
            </div>
        </div>
    );
}