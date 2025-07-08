import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addCalculation = async (userId, calculationData) => {
    try {
        const docRef = await addDoc(collection(db, 'calculations'), {
            userId,
            ...calculationData,
            createdAt: new Date(),
        });
        return docRef.id;
    } catch (error) {
        console.error('Error adding document: ', error);
    }
};

export const getUserCalculations = async (userId) => {
    const calculationsRef = collection(db, 'calculations');
    const q = query(calculationsRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const calculations = [];
    querySnapshot.forEach((doc) => {
        calculations.push({ id: doc.id, ...doc.data() });
    });
    return calculations;
};