import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVbBi8zfCo_hTGMuqAOjoUt5Bu5_Ssvbo",
  authDomain: "colocrew-5edf9.firebaseapp.com",
  projectId: "colocrew-5edf9",
  storageBucket: "colocrew-5edf9.appspot.com",
  messagingSenderId: "74332244617",
  appId: "1:74332244617:web:1947fe469b0ca4a103d458"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;