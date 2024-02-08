import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCy4EhKHXuqmTeLLwZ3GGabC6iZm7Uhunk",
  authDomain: "fruit-collector-1fe9d.firebaseapp.com",
  databaseURL: "https://fruit-collector-1fe9d-default-rtdb.firebaseio.com",
  projectId: "fruit-collector-1fe9d",
  storageBucket: "fruit-collector-1fe9d.appspot.com",
  messagingSenderId: "450743738177",
  appId: "1:450743738177:web:2f22d5f29b1a59663c8bc0"
};

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  export default db;