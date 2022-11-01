import { createContext, useContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail} from 'firebase/auth';
import {collection, setDoc, doc} from "firebase/firestore";
import { auth, db } from './firebase.js';

//get collections in encoding year
const yearRef = collection(db, "encoding_year");

//get collection names user from document 2022
const userRef = collection(doc(yearRef,"2022"), "users")

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  
  const [user, setUser] = useState({});

  const createUser = (email, password, fname, lname, city, brgy) => {

    return createUserWithEmailAndPassword(auth, email, password).then(async (result) => {
          
          setDoc(doc(userRef, result.user.uid), {
                brgy_desig:brgy,
                city_desig:city,
                email:email,
                first_name:fname,
                last_name:lname,
                id:result.user.uid,
          }).then((re) => {
             console.log(re);
          }).catch((e) => {
             console.log(e.message);
          }) 

    }).catch((err) => {
          console.log(err)
    })
        
  };

  const signIn = (email, password) =>  {

    return signInWithEmailAndPassword(auth, email, password)
    
  }

  const logout = () => {
      return signOut(auth)
  }

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
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