import { createContext, useContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail} from 'firebase/auth';
import {collection, where, query, getDocs, getDoc, addDoc, setDoc, updateDoc, deleteDoc, doc} from "firebase/firestore";
import { auth, db } from './firebase.js';

//get collections in encoding year
const yearRef = collection(db, "encoding_year");

//get collection names user from document 2022
const userRef = collection(doc(yearRef,"2022"), "users")

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  
  const [user, setUser] = useState({});

  const createUser = (email, password, fname, lname, contact, brgy) => {

    return createUserWithEmailAndPassword(auth, email, password).then(async (result) => {
          
          setDoc(doc(userRef, result.user.uid), {
                brgy_desig:brgy,
                contact_num:contact,
                email:email,
                first_name:fname,
                last_name:lname,
                id:result.user.uid,
                //role:"user",
                //status:"pending",
          }).then((re) => {
             console.log(re);
          }).catch((e) => {
             console.log(e.message);
          })      
    })
        
  };

  const signIn = (email, password) =>  {

    return signInWithEmailAndPassword(auth, email, password)//*,then(async (result) => {*/

        // console.log(result)
        // console.log(user)

        // const idQuery = query(userRef, where("id", "==", ""))

        // //const brgyQuery = query(barangayRef, where("barangay_name", "==",""))
        // const ref = doc(db, "users", FirebaseAuth.instance.currentUser.uid);
        // const userDoc = await getDoc(ref);
        // return userDoc.data();

    //})
  }

  const logout = () => {
      return signOut(auth)
  }

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      //console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn, forgotPassword }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};