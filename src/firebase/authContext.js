import React, {
  createContext, useContext, useState, useEffect,
} from 'react';
import { auth } from './firebaseConfig';

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  // Auth observable
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  // Auth functions
  const createUser = (email, password) => auth.createUserWithEmailAndPassword(email, password);
  const loginUser = (email, password) => auth.signInWithEmailAndPassword(email, password);
  const logOutUser = () => auth.signOut();

  const value = {
    createUser, loginUser, logOutUser, currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
