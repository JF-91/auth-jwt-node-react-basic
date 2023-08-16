import mongoose from "mongoose";

export const connectDB = async () =>{
 try {
   await mongoose.connect(process.env.MONGO_URI)
   console.log('base de datos conectada');
 } catch (error) {
    throw new Error('error en conexion con la base de datos', error)
 }
    

}