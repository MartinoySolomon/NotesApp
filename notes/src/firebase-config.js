import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDOM4s5nDDVlZ4KDquUOl4OPCPcj_KwRSI",
	authDomain: "notes-app-noy.firebaseapp.com",
	projectId: "notes-app-noy",
	storageBucket: "notes-app-noy.firebasestorage.app",
	messagingSenderId: "160600454805",
	appId: "1:160600454805:web:fc952b287999df6d6f0d9c",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export { db };
