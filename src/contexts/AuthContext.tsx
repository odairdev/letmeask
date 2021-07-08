import { createContext, useState, useEffect, ReactNode } from 'react'
import { auth, firebase } from '../services/firebase'

type User = {
    id: string;
    name: string;
    avatar: string;
  }

type AuthContextType = {
user: User | undefined;
signInWithGoogle: () => Promise<void>;
  }

export const AuthContext = createContext({} as AuthContextType)

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe =  auth.onAuthStateChanged(user => {
      if(user) {
        const { displayName, photoURL, uid } = user

          if(!displayName || !photoURL) {
            throw new Error('Missing Information from google account.')
          }

          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
      }
    })

    return () => {
      unsubscribe();
    }
  }, [])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

      await auth.signInWithPopup(provider)
      .then(result => {
          if(result.user) {
            const { displayName, photoURL, uid } = result.user

            if(!displayName || !photoURL) {
              throw new Error('Missing Information from google account.')
            }

            setUser({
              id: uid,
              name: displayName,
              avatar: photoURL
            })
          }
      })
  }

  return (
    <AuthContext.Provider value={{user, signInWithGoogle}}>
      {children}
    </AuthContext.Provider>
  )
  
}