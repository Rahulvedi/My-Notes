import React,{useContext,useState,useEffect} from 'react'
import {auth} from '../firebase'
const AuthContext=React.createContext()
export function useAuth() {
    return  useContext(AuthContext)
}
const AuthProvider = ({children}) => {
    const [currentUser, setcurrentUser] = useState()
    const [Loading, setLoading] = useState(true)
    const signup=(email,password)=>{
        return auth.createUserWithEmailAndPassword(email,password)
    }
    const login=(email,password)=>{
        return auth.signInWithEmailAndPassword(email,password)
    }
    const logout=()=>{
        return auth.signOut()
    }
    const resetPassword=(email)=>{
        return auth.sendPasswordResetEmail(email)
    }
    const updateEmail=(email)=>{
        return currentUser.updateEmail(email)
    }
    const updatePassword=(password)=>{
        return currentUser.updatePassword(password)
    }
    useEffect(()=>{
        const unsubscribe=auth.onAuthStateChanged(user=>{
            setcurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    },[])
    const value={
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }
    return (
       <AuthContext.Provider value={value}>
           {!Loading && children}
       </AuthContext.Provider>
    )
}

export  default AuthProvider