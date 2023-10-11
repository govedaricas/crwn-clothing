import {initializeApp} from 'firebase/app';
import {getAuth, 
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDUEfqGjC1eRPXiBOR_A3vU_TSBcjE6_r0",
    authDomain: "crwn-clothing-db-902b7.firebaseapp.com",
    projectId: "crwn-clothing-db-902b7",
    storageBucket: "crwn-clothing-db-902b7.appspot.com",
    messagingSenderId: "801619573263",
    appId: "1:801619573263:web:7c870bb3f79907d4e6817a"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const provider= new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt:"select_account"
  });

  export const auth=getAuth();
  export const signInWithGooglePopup=()=>signInWithPopup(auth,provider);
  
  export const db=getFirestore();

  export const createUserDocumentFromAuth=async (userAuth)=>{
    const userDocRef= doc(db,'users',userAuth.uid);

    

    const userSnapshot = await getDoc(userDocRef);
    

    if(!userSnapshot.exists()){
      const {displayName, email}=userAuth;
      const createdAt=new Date();
      try{
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        });
      }catch(error){
        console.log('error creating the user',error.message);
      }
    }
    
    return userDocRef;

  }