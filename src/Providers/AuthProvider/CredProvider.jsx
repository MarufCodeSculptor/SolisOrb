import { getAuth, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import app from '../../Firebase/firebase.config';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';

export const CredContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// eslint-disable-next-line react/prop-types
const CredProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Popup sign in with google is start here =>>
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };
  // ///////
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      console.log('CurrentUser-->', currentUser);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const credValues = {
    signInWithGoogle,
    user
  };
  return (
    <CredContext.Provider value={credValues}>{children}</CredContext.Provider>
  );
};

export default CredProvider;
