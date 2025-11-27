// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD4jFND_DrdtwhwmiF7igUVhfaPyj0QK6k",
  authDomain: "quiztime-ai.firebaseapp.com",
  projectId: "quiztime-ai",
  storageBucket: "quiztime-ai.firebasestorage.app",
  messagingSenderId: "810014505410",
  appId: "1:810014505410:web:5aedff74cbca710e35be5b"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);