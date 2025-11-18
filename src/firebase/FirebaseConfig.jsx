import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA3XdH-C0D2K7Iwm0bo8d1_wAdJZao8rm8",
  authDomain: "hostelhubbgh.firebaseapp.com",
  projectId: "hostelhubbgh",
  storageBucket: "hostelhubbgh.appspot.com",
  messagingSenderId: "397953583899",
  appId: "1:397953583899:web:cd42166f30dbc5922661be",
  measurementId: "G-2MX738FHSJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Set auth persistence to LOCAL (persists even after browser close)
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Auth persistence set to LOCAL");
  })
  .catch((error) => {
    console.error("Error setting auth persistence:", error);
  });
