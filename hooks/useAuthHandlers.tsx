"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import { signIn, signOut } from "next-auth/react";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import { customiseAuthError } from "@/lib/utils";

export interface CustomError {
  errorType: "Firebase auth createUserWithEmailAndPassword Error" | string;
  message: string;
  description: string;
}

interface Auth {
  signinHandler: (email: string, password: string) => Promise<void>;
  signinWithGoogleHandler: () => Promise<void>;
  signupHandler: (email: string, password: string) => Promise<void>;
  forgotPassHandler: (email: string) => Promise<void>;
  signoutHandler: () => Promise<void>;
  error: null | CustomError;
  clearError: () => void;
  actionSuccess: boolean;
  clearActionSuccess: () => void;
  loading: boolean;
}

const AuthContext = createContext<Auth>({
  signinHandler: async () => {},
  signinWithGoogleHandler: async () => {},
  signupHandler: async () => {},
  forgotPassHandler: async () => {},
  signoutHandler: async () => {},
  error: null,
  clearError: () => {},
  clearActionSuccess: () => {},
  actionSuccess: false,
  loading: false,
});

export const AuthHandlerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [actionSuccess, setActionSuccess] = useState<boolean>(false);
  const [error, setError] = useState<null | any>(null);
  const router = useRouter();

  const signinHandler = async (
    //  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    email: string,
    password: string
  ) => {
    try {
      // e.preventDefault();
      console.log("here");
      setLoading(true);
      setError(null);
      setActionSuccess(false);

      if (email && password) {
        const signInResponse = await signIn("credentials", {
          email,
          password,
          redirect: false,
          callbackUrl: "/",
        });

        if (signInResponse && signInResponse.ok) {
          setActionSuccess(true);
          router.push(signInResponse.url ? signInResponse.url : "/");
        } else if (signInResponse && signInResponse.error) {
          setActionSuccess(false);
          setError(customiseAuthError(signInResponse.error));
        }
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const signinWithGoogleHandler = async () => {
    try {
      console.log("here");
      setLoading(true);
      setError(null);
      setActionSuccess(false);

      const signInResponse = await signIn("google", {
        redirect: false,
        callbackUrl: "/",
      });

      console.log(signInResponse);

      if (signInResponse && signInResponse.ok) {
        setActionSuccess(true);
        router.push(signInResponse.url ? signInResponse.url : "/");
      } else if (signInResponse && signInResponse.error) {
        setActionSuccess(false);
        setError(customiseAuthError(signInResponse.error));
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const signupHandler = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      setActionSuccess(false);

      if (email) {
        await createUserWithEmailAndPassword(auth, email, password);
        setActionSuccess(true);
        // router.push("/signin");
      }
    } catch (error) {
      setActionSuccess(false);
      setError(customiseAuthError(error));
    } finally {
      setLoading(false);
    }
  };

  const forgotPassHandler = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      setActionSuccess(false);

      if (email) {
        await sendPasswordResetEmail(auth, email);
        setActionSuccess(true);
        // router.push("/signin");
      }
    } catch (error) {
      console.log(error);
      setError(customiseAuthError(error));
      setActionSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const signoutHandler = async () => {
    try {
      setLoading(true);
      setError(null);
      setActionSuccess(false);

      await signOut();
      setActionSuccess(true);
    } catch (error) {
      console.log(error);
      setActionSuccess(false);
      setError(customiseAuthError(error));
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const clearActionSuccess = () => {
    setActionSuccess(false);
  };

  const memoedValue = useMemo<Auth>(
    () => ({
      signinHandler,
      signinWithGoogleHandler,
      signupHandler,
      forgotPassHandler,
      signoutHandler,
      clearError,
      clearActionSuccess,
      error,
      actionSuccess,
      loading,
    }),
    // eslint-disable-next-line
    [error, actionSuccess, loading]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

const useAuthHandlers = () => {
  return useContext(AuthContext);
};

export default useAuthHandlers;
