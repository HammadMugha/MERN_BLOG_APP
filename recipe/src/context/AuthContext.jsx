
import React,{useState,useEffect,createContext,useContext} from 'react'
const AuthContext = createContext();

export default function AuthProvider({children}) {
    const [auth,setAuth] = useState({user:null,token:""})
    useEffect(()=>{
      const data = localStorage.getItem("auth")
      //condition check agr data ha toh
      if(data){
          const parse = JSON.parse(data)
          setAuth({
            ...auth,
            user:parse.user,
            token:parse.token
          })
      }
    },[])
    // axios.defaults.headers.common["Authorization"] = auth?.token;
  return (
    <AuthContext.Provider value={[auth,setAuth]}>
        {children}
    </AuthContext.Provider>
  )
}

//CUSTOM HOOK
export const useAuth = ()=> useContext(AuthContext)