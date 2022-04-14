import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseconfig.js";
const initializeFirebase = () => {
  initializeApp(firebaseConfig);
};

export default initializeFirebase;
