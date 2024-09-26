// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2rdmcB5fKaoTFqPBnJlTWdvitfQDVF8g",
  authDomain: "netflixgpt-b1019.firebaseapp.com",
  projectId: "netflixgpt-b1019",
  storageBucket: "netflixgpt-b1019.appspot.com",
  messagingSenderId: "438229383323",
  appId: "1:438229383323:web:174b785cd2030718f2ee3e",
  measurementId: "G-GZHB70LFLW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
