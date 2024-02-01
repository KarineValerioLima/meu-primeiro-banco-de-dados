// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as firestore from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfvOUKdNoV95oye2vT64zMkzbz9oj_qW0",
  authDomain: "meu-banco-de-dados-cdc6f.firebaseapp.com",
  projectId: "meu-banco-de-dados-cdc6f",
  storageBucket: "meu-banco-de-dados-cdc6f.appspot.com",
  messagingSenderId: "75129420716",
  appId: "1:75129420716:web:dad3ab99f85d0611501809"
};

// Initialize Firebase
console.log("Conectado ao Firebase!");
const Firebase = initializeApp(firebaseConfig);
export const db = firestore.getFirestore(Firebase);

export { firestore };
