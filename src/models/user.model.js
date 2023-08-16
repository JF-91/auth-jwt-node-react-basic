import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        trim:true
    },
    email:{
        type: String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required:true
    }
}, {
    timestamps: true
})

//sobre escribir metodos de mongoose
//para no ver el password en el objeto de creacion 
userSchema.methods.toJSON =  function (){

    const  { __v, password, ...usuario } = this.toObject();
    //usuario.uid = _id;
    return usuario
}


export default  mongoose.model('User', userSchema)