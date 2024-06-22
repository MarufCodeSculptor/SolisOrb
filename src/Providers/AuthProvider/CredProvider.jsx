import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import app from '../../Firebase/firebase.config';

export const CredContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// eslint-disable-next-line react/prop-types
const CredProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Popup sign in with google is start here =>>
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };
  // ///////
  //  logout function =>
  const logOut = () => {
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false)
      console.log('CurrentUser-->', currentUser);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const credValues = {
    signInWithGoogle,
    user,
    logOut
  };
  return (
    <CredContext.Provider value={credValues}>{children}</CredContext.Provider>
  );
};

export default CredProvider;
