import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import app from '../../Firebase/firebase.config';

export const CredContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// eslint-disable-next-line react/prop-types
const CredProvider = ({ children }) => {
  // <========================states ------------------>
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Popup sign in with google is start here =>>
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // signinwith email and password  =>
  const createUser = (email, pass) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };
  // sing in in with existing user =>
  const signInWithEmailPass = (email, pass) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };
  //  logout function =>
  const logOut = () => {
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
      console.log('CurrentUser-->', currentUser);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const credValues = {
    user,
    signInWithGoogle,
    createUser,
    logOut,
    signInWithEmailPass
  };
  return (
    <CredContext.Provider value={credValues}>{children}</CredContext.Provider>
  );
};

export default CredProvider;
