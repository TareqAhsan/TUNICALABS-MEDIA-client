import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import initializeFirebase from "../firebase/firebaseinit";

initializeFirebase();
const auth = getAuth();
const useFirebase = () => {
  const [user, setUser] = useState();
  const [loading, setIsloading] = useState(true);
  const [error, setError] = useState();
  const registerUser = (email, password) => {
    setIsloading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        swal({
          title: "Registered Successfully!",
          icon: "success",
          timer: 1500,
        });
        setError("");
        setIsloading(false);
      })
      .catch((error) => {
        setError(error.message);
        setError(error.message);
        swal({
          title: error.message,
          icon: "error",
          timer: 3000,
        });
      })
      .finally(() => setIsloading(false));
  };

  const loginUser = (email, password,location,navigate) => {
    setIsloading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        swal({
          title: "Login Successfully!",
          icon: "success",
          timer: 2500,
        });
       const redirect = location?.state?.from || '/'
      navigate(redirect)
        setError("");
      })
      .catch((error) => {
        setError(error.message);
        swal({
          title: error.message,
          icon: "error",
          timer: 3000,
        });
      })
      .finally(() => setIsloading(false));
  };

  const logout = () => {
    setIsloading(true);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {})
      .finally(() => setIsloading(false));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsloading(false);
    });

    return () => unsubscribe;
  }, []);
  return {
    user,
    registerUser,
    logout,
    loginUser,
    loading,
    error,
  };
};

export default useFirebase;
