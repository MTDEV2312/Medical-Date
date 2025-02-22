import {Schema,model} from 'mongoose'

const dateSchema = new Schema({
    codigo:{
        type:Number,
        required:true,
        trim:true,
        unique:true
    },
    descripcion:{
        type:String,
        required:true,
        trim:true
    },
    paciente:{
        type:String,
        ref:'patients',
        required:true,
        trim:true
    },
    especialidad:{
        type:String,
        ref:'Specialties',
        required:true,
        trim:true
    }
},{
    timestamps:true
})

export default model("dates",dateSchema)