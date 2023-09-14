import firebase from "firebase/compat/app"
import "firebase/database" // for realtime database

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "covid19resourcesindia-b0e1b.firebaseapp.com",
  databaseURL:
    "https://covid19resourcesindia-b0e1b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "covid19resourcesindia-b0e1b",
  storageBucket: "covid19resourcesindia-b0e1b.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

firebase.initializeApp(config)
const db = firebase.database()
export { db }
export default firebase
