import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const config = {
    apiKey: "AIzaSyB1nEEDFDjkjprxivR1H_PsszJDD8fyFVo",
    authDomain: "react-trell-2-d9c7e.firebaseapp.com",
    databaseURL: "https://react-trell-2-d9c7e.firebaseio.com",
    projectId: "react-trell-2-d9c7e",
    storageBucket: "react-trell-2-d9c7e.appspot.com",
    messagingSenderId: "1035250066132",
    appId: "1:1035250066132:web:a27ea337168f1529081141",
    measurementId: "G-1X1ZXPR3ET"
}

firebase.initializeApp(config)

const db = firebase.firestore()

const firebaseAuth = firebase.auth()

const boardsRef = db.collection('boards')

const listsRef = db.collection('lists')

const cardsRef = db.collection('cards')

export { boardsRef, listsRef, cardsRef, firebaseAuth }