import {Schema, model} from 'mongoose'

const SpecialtiesSchema = new Schema({
    codigo:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    nombre:{
        type:String,
        required:true,
        trim:true
    },
    descripcion:{
        type:String,
        required:true,
        trim:true
    }
},{
    timestamps:true
})


export default model('Specialties',SpecialtiesSchema)