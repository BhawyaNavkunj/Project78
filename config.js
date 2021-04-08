import firebase from 'firebase';
require('@firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyAtcyvPmDQt4vedOoRRZloQtwJ6a_Zpbzs",
    authDomain: "barterapp-759fa.firebaseapp.com",
    projectId: "barterapp-759fa",
    storageBucket: "barterapp-759fa.appspot.com",
    messagingSenderId: "212067984469",
    appId: "1:212067984469:web:370100774b04a77dc820dc"
  };
  // Initialize Firebase
  
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();