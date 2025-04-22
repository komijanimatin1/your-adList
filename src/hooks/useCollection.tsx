import { useState, useEffect } from 'react';
import { db } from '../firebase/config'; // Adjust the import according to your firebase configuration file
import { collection, onSnapshot } from 'firebase/firestore';

const useCollection = (collectionName: string) => {
    const [documents, setDocuments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const collectionRef = collection(db, collectionName);

        const unsubscribe = onSnapshot(
            collectionRef,
            (snapshot) => {
                if (snapshot.empty) {
                    setError('No documents found');
                    setDocuments([]);
                    setLoading(false);
                    return;
                }
                const docs:object[] = []
                snapshot.docs.map(doc => {
                    docs.push({ id: doc.id, ...doc.data() });
                });
                setDocuments(docs);
                setLoading(false);
            },
            (err) => {
                setError(err.message);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [collectionName]);

    return { documents, loading, error };
};

export default useCollection;