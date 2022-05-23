import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const fireapp =  initializeApp({
  apiKey: "AIzaSyCe5g0zhSespcMTfpO2IJUvKJ_omNFKR4A",
  authDomain: "sistema-dental-brasil-6c4d1.firebaseapp.com",
  projectId: "sistema-dental-brasil-6c4d1",
  storageBucket: "sistema-dental-brasil-6c4d1.appspot.com",
  messagingSenderId: "228215371864",
  appId: "1:228215371864:web:3d8312bb1f7be7d750b22d",
  measurementId: "G-5NY3HQQGYQ"
});
 


export default getFirestore(fireapp);

// Initialize Firebase

