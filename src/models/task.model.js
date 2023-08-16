import mongoose, {Schema, model} from 'mongoose'

const taskSchema = new Schema({

    title:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }
})


//sobre escribir metodos de mongoose
//para no ver el password en el objeto de creacion 
taskSchema.methods.toJSON =  function (){

    const  { __v, ...task } = this.toObject();
    //usuario.uid = _id;
    return task
}


export default model('Task', taskSchema)