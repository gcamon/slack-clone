import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyA24TBhueFXrSeJ-lN77LEuDXNJohzdhz0",
    authDomain: "esut-alumni.firebaseapp.com",
    projectId: "esut-alumni",
    storageBucket: "esut-alumni.appspot.com",
    messagingSenderId: "990414838880",
    appId: "1:990414838880:web:802b50bc65630ad469f705"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export { auth, googleProvider, facebookProvider, db, storage };

/*'
//TEST CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyAhc9E244EtE6BOG9gQ6kAqiZujJApM7SQ",
    authDomain: "alumni-1ea0c.firebaseapp.com",
    projectId: "alumni-1ea0c",
    storageBucket: "alumni-1ea0c.appspot.com",
    messagingSenderId: "613250393080",
    appId: "1:613250393080:web:b6c6e419ee647f47eaac0d",
    measurementId: "G-26Q2ECMJJD"
};



*/