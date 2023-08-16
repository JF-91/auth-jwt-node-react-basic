import {request, response} from 'express';
import User from '../models/user.model.js'
import bcrypjs from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';



//TODO: REGISTER
export const register = async (req = request, res = response) =>{
    const {email, password, username} = req.body

try {

    const userFound = await User.findOne({email});
    if ( userFound){
        res.status(400).json({msg: ["the email allready exists"]})
    }


    const passwordHash = await bcrypjs.hash(password, 10)

    const newUser = new User({
        username,
        email,
        password: passwordHash
    })

    
    
    await newUser.save()

    //token lo que vamos a guardar en el token del nuevo usario (newUser.id)
   const token = await createAccessToken({id: newUser.id})


   //devuelve el token en las cookies los valores que guardamos ({id:newUser.id})
    res.cookie('token', token)

    //respuesta para el frontend de los datos del usuario
    res.status(200).json({
        msg:"OK",
        newUser

    })
    
} catch (error) {
    res.status(500).json({
        msg:"error en el servidor"
    })
    throw new Error("error al registrar un usuario", error)
}
    

}



//TODO: LOGIN

export const login = async (req = request, res = response) =>{
    const {email, password} = req.body


try {


    // busca el email en la base de datos
    const userFound = await User.findOne({email})

    //si no encuentra envia este mensaje
    if ( !userFound ){
        res.status(400).json({msg:"invalid credential"})
    } 

    //si lo encunetra hace match la password del usuario en db (userFound.password)
    const isMatch = await bcrypjs.compare(password, userFound.password)

    //si no hace match la password envia este mensaje
    if( !isMatch) return res.status(400).json({msg:"invalid credential"})

    //crea un token con el id del usuario encontrado (userFound.id)
    const token = await createAccessToken({id: userFound.id})



    
    
   



   //devuelve el token en las cookies los valores que guardamos ({id:newUser.id})
    res.cookie('token', token)

    //respuesta para el frontend de los datos del usuario
    res.status(200).json({
        msg:"OK",
        userFound

    })
    
} catch (error) {
    res.status(500).json({
        msg:"error en el servidor"
    })
    throw new Error("error al registrar un usuario", error)
}
    

}


//TODO: LOGOUT

export const logout = async (req = request, res = response) =>{

   await res.cookie('token', '', {expires: new Date(0)})
    return res.sendStatus(200);
}

//TODO: PROFILE -- ruta protegida
export const profile = async (req = request, res = response) =>{

    const userFound = await User.findById(req.user.id)
    
    if( !userFound){
        return res.status(400).json({
            msg:"user not found"
        })
    }
    
    return res.json({
       userFound
    })
    
}