import {Schema, model} from 'mongoose'

const patientSchema = new Schema({
    nombre:{
        type:String,
        trim:true,
        required:true
    },
    apellido:{
        type:String,
        trim:true,
        required:true
    },
    fecha_nacimiento:{
        type:Date,
        required:true,
        trim:true
    },
    genero:{
        type:String,
        trim:true,
        required:true
    },
    ciudad:{
        type:String,
        trim:true,
        required:true
    },
    direccion:{
        type:String,
        trim:true,
        required:true
    },
    telefono:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        required:true
    }
},{
    timestamps:true
})

export default model("patients",patientSchema)