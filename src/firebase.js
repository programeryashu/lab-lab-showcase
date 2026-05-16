import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBss8BoH4QwJcdojdHC0FOCDNkLkr7ySnc",
  authDomain: "arora-lab-showcase.firebaseapp.com",
  projectId: "arora-lab-showcase",
  storageBucket: "arora-lab-showcase.firebasestorage.app",
  messagingSenderId: "1077496759634",
  appId: "1:1077496759634:web:771dfc5c6bcfa29b3da68b",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
