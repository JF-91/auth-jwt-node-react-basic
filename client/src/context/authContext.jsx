import { createContext, useContext, useState    } from "react"
import { registerRequest } from "../api/auth";


export const AuthContext = createContext();


const AutContextProvider = ({children}) => {

    const [user, setUser] = useState(null)

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const signup = async(user)=>{
     

        try {
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data)
            setIsAuthenticated(true)

        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

  return (
    <AuthContext.Provider value={{signup, user, isAuthenticated}}>
        {children }
    </AuthContext.Provider>
  )
}

export default AutContextProvider


export const useAtuh = ()=>{
    const context = useContext(AuthContext);

    if(!context){
        throw new Error("no hay contexto")
    }
    return context

}