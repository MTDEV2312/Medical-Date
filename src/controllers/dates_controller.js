import Dates from '../models/date_model.js'
import Patients from '../models/patients_model.js'
import Specialties from '../models/specialties_models.js'

const RegisterDate = async(req,res) => {
    try {
        const {codigo,paciente,especialidad}=req.body

        //? Verifica si un campo esta vacio
        if(Object.values(req.body).includes("")) {
            return res.status(400).json({msg: "Lo sentimos, debes llenar todos los campos"})
        }
        
        //? Verifica si el email es valido
        const DatesBDD = await Dates.findOne({codigo})
        if(DatesBDD) {
            return res.status(400).json({msg: "El codigo ya esta registrado"})
        }

        //? Verifica si el email es valido
        const PacienteBDD = await Patients.findOne({email:paciente})
        if(!PacienteBDD) {
            return res.status(400).json({msg: "El paciente no se Encuentra registrado"})
        }

        //? Verifica si el email es valido
        const EspecialidadBDD = await Specialties.findOne({codigo:especialidad})
        if(!EspecialidadBDD) {
            return res.status(400).json({msg: "La especialidad no existe"})
        }
    
        const newDate = new Dates(req.body)
        await newDate.save()
        return res.status(201).json({msg:"Cita Creada exitosamente"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:"Lo sentimos, algo salio mal"})
    }
}


const GetDates = async(req,res) => {
    try {
        const DatesBDD = await Dates.find()
        const PatientsEmail = [...new Set(DatesBDD.map(date => date.paciente))]
        const SpecialtiesCode = [ ...new Set(DatesBDD.map(date => date.especialidad))]
        
        const PatientsBDD = await Patients.find({email:{$in:PatientsEmail}})
        const SpecialtiesBDD = await Specialties.find({codigo:{$in:SpecialtiesCode}})

        const PatientsMap = PatientsBDD.reduce((map,patient) =>{
            map[patient.email]={
                _id: patient.id,
                nombre: patient.nombre,
                apellido: patient.apellido,
                email: patient.email,
                fecha_nacimiento: patient.fecha_nacimiento,
                genero: patient.genero,
                ciudad:patient.ciudad,
                direccion: patient.direccion,
                telefono: patient.telefono
            }
            return map
        },{})

        const SpecialtiesMap = SpecialtiesBDD.reduce((map,specialty)=>{
            map[specialty.codigo]={
                _id: specialty.id,
                codigo: specialty.codigo,
                nombre: specialty.nombre,
                descripcion: specialty.descripcion
            }
            return map
        },{})

        
        const DateMap = DatesBDD.map(date =>{
            return{
                _id:date.id,
                codigo:date.codigo,
                descripcion:date.descripcion,
                paciente:PatientsMap[date.paciente] || null,
                especialidad:SpecialtiesMap[date.especialidad] || null
            }
        })

        res.status(200).json(DateMap)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Lo sentimos, algo salio mal"})
    }
}

const GetDatesById = async(req,res) => {
    try {
        const {codigo}=req.params

        if(!codigo){
            return res.status(400).json({msg: "Lo sentimos, debes proporcionar un codigo"})
        }

        const DatesBDD = await Dates.findOne({codigo:codigo})

        if(!DatesBDD){
            return res.status(400).json({msg: "Lo sentimos, el ticket no existe"})
        }

        const PatientID = DatesBDD.paciente
        const SpecialtyID = DatesBDD.especialidad
        const PatientBDD = await Patients.findOne({email:PatientID})
        const SpecialtyBDD = await Specialties.findOne({codigo:SpecialtyID})

        const patientDetails = PatientBDD ?{
            _id: PatientBDD.id,
            nombre: PatientBDD.nombre,
            apellido: PatientBDD.apellido,
            email: PatientBDD.email,
            fecha_nacimiento: PatientBDD.fecha_nacimiento,
            genero: PatientBDD.genero,
            ciudad:PatientBDD.ciudad,
            direccion: PatientBDD.direccion,
            telefono: PatientBDD.telefono
        }:null

        const SpecialtyDetails = SpecialtyBDD ?{
            _id: SpecialtyBDD.id,
            codigo: SpecialtyBDD.codigo,
            nombre: SpecialtyBDD.nombre,
            descripcion: SpecialtyBDD.descripcion
        }:null

        const DateDetail = {
            _id:DatesBDD.id,
            codigo:DatesBDD.codigo,
            descripcion:DatesBDD.descripcion,
            paciente:patientDetails,
            especialidad:SpecialtyDetails
        }
        return res.status(200).json(DateDetail)
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Lo sentimos, algo salio mal"})
    }
}

const UpdateDate = async (req,res) => {
    try {
        const {id} = req.params
        const updates = req.body
    
        if(Object.values(req.body).includes("")) {
            return res.status(400).json({msg: "Lo sentimos, debes llenar todos los campos"})
        }
    
        const validFields = ['descripcion','especialidad']
        const filteredFields = {}
    
        for(const field in updates){
            if(validFields.includes(field)){
                filteredFields[field]=updates[field]
            }
        }
    
        if (Object.keys(filteredFields).length === 0) {
            return res.status(400).json({ msg: "No se proporcionaron campos válidos para actualizar" })
        }
    
        await Dates.findByIdAndUpdate(id,filteredFields,{new:true})
    
        const response = await Dates.findById(id).lean().select("-__v")
        res.status(200).json({msg:"Ticket actualizado",response})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Lo sentimos, ha ocurrido un error"})
    }
}


const DeleteDate = async (req, res) => {
        const {id} = req.params
        if(!id){
            return res.status(400).json({msg: "Lo sentimos, debes proporcionar un id de Citas"})
        }
    
        try {
            const deletedDate = await Dates.findByIdAndDelete(id)
            if(!deletedDate){
                return res.status(400).json({msg: "Cita no registrada"})
            }
            return res.status(200).json({msg: "Cita eliminada exitosamente"})
        } catch (error) {
            console.log(error)
            return res.status(500).json({msg: "Lo sentimos, algo salio mal"})
        }
}

export{
    RegisterDate,
    GetDates,
    GetDatesById,
    UpdateDate,
    DeleteDate
}