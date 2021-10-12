import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCJ_eZNbFt2uJXemKKqse5IIFpzKzppHM0',
  authDomain: 'covid-app-89217.firebaseapp.com',
  projectId: 'covid-app-89217',
  storageBucket: 'covid-app-89217.appspot.com',
  messagingSenderId: '591379473707',
  appId: '1:591379473707:web:a118e3174656187159d16e',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { firebase, auth };
