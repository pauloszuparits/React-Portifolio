import firebase from 'firebase';
import 'firebase/firestore'
import 'firebase/auth'



const firebaseConfig = {
    apiKey: "AIzaSyAZsfL_w_eB6jhCDCiqx_5LVcdCCKA2dbU",
    authDomain: "portifolio-7900f.firebaseapp.com",
    projectId: "portifolio-7900f",
    storageBucket: "portifolio-7900f.appspot.com",
    messagingSenderId: "557614013184",
    appId: "1:557614013184:web:917fa294d110387c26b1e5",
    measurementId: "G-47C9W1X030"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
 
  export default firebase;