import { createContext, useState, useEffect, useContext } from "react";
import {auth, firestore, timestamp} from '../firebase' 

const AuthContext = createContext()
export const useAuth = () => {
    return useContext(AuthContext)
}
export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [userType,setUserType] = useState(null)

  function logout() {
    return auth.signOut()
  }
   const addUserToUsersCollection = async(currentUser,type) => {
      if(!currentUser) return 
      const userRef = firestore.doc(`${type}/${currentUser.uid}`)
      const snapShot = await userRef.get()
      if(!snapShot.exists){
      const { email } = currentUser
      const createdAt = timestamp()
        try {
          await userRef.set({
            email,
            createdAt
          })
        } catch (error) {
            console.log('error while creating user', error)   
        }
      }
    }
 
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })
    if(userType === null) return
    addUserToUsersCollection(currentUser,userType)
    return () => unsubscribe
  }, [currentUser,userType])

  const value = {
    currentUser,
    logout,
    userType,
    setUserType
  }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}