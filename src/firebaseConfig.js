// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Animation } from './types/animation';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBP-6GE_K23DwrnCYGKCJGPnkkzqEbE_zw",
  authDomain: "effective-animations.firebaseapp.com",
  projectId: "effective-animations",
  storageBucket: "effective-animations.appspot.com",
  messagingSenderId: "980018261305",
  appId: "1:980018261305:web:d2619dace04fd4c7a98ce8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Define a function to save an animation to Firebase
async function saveAnimation(animation: Animation) {
  const db = firebase.firestore();
  const animationRef = db.collection('animations').doc(`${animation.id}`);
  await animationRef.set(animation);
}

// Define a function to save a user to Firebase
async function saveUser(user: User) {
  const db = firebase.firestore();
  const userRef = db.collection('users').doc(`${user.id}`);
  await userRef.set(user);
}
/**

Po utworzeniu projektu, chciałam utworzyć bazę danych, następnie wybrałam "Start in test mode", aby utworzyć nową bazę danych w trybie testowym.
Wybierałam lokalizację dla swojej bazy danych (zaleca się wybrać lokalizację najbliżej użytkowników, aby uzyskać lepszą wydajność).

