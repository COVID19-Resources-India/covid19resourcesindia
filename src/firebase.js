import firebase from "firebase"

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "covid19resourcesindia.firebaseapp.com",
  projectId: "covid19resourcesindia",
  storageBucket: "covid19resourcesindia.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}

firebase.initializeApp(config)
export default firebase
