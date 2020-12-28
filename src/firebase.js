import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyC-_CU-E6mIrvqDR1rINn3UEd3A-5ngzRw",
    authDomain: "robinhood-47c41.firebaseapp.com",
    projectId: "robinhood-47c41",
    storageBucket: "robinhood-47c41.appspot.com",
    messagingSenderId: "751654655881",
    appId: "1:751654655881:web:960e9ce65b891605697358"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  export { db };