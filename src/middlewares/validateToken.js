import {request, response} from 'express';
import jwt from 'jsonwebtoken';



//TODO: VALIDAR TOKEN Y TABMIEN PARA RUTAS RESTRINGIDA
export const autRequired = (req = request, res= response, next)=>{

    //utiliando la libreria cookies-parser accedemo a nuestra cookies para comprovar nuestros tokens        
    const {token} = req.cookies
    
    if( !token ){
        return res.status(401).json({
            msg:"No token, authorization denied"
        });
    }

    //verifica si es nuestro token
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user)=>{
        if(err){
            return res.status(403).json({msg:"Invalid token"})
        }
        console.log(user);
        
        // esto guarda todo el user del verify o decoder del jwt en el request para usarlo mas adelante
        req.user = user
        next()
    } )

    
}