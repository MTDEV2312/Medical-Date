import Patients from '../models/patients_model.js'

const RegisterPatient = async (req,res) => {
    try {
        const {email}=req.body

        //? Verifica si un campo esta vacio
        if(Object.values(req.body).includes("")) {
            return res.status(400).json({msg: "Lo sentimos, debes llenar todos los campos"})
        }
        
        //? Verifica si el email es valido
        const PatientsBDD = await Patients.findOne({email})
        if(PatientsBDD) {
            return res.status(400).json({msg: "El email ya esta registrado"})
        }
    
        const newPatient = new Patients(req.body)
        await newPatient.save()
        return res.status(201).json({msg:"Paciente Creado exitosamente"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:"Lo sentimos, algo salio mal"})
    }
}

const GetPatient = async(req,res) => {
    try {
        const patients = await Patients.find()
        const response = patients.map(patient => ({
            _id: patient.id,
            nombre: patient.nombre,
            apellido: patient.apellido,
            email: patient.email,
            fecha_nacimiento: patient.fecha_nacimiento,
            genero: patient.genero,
            ciudad:patient.ciudad,
            direccion: patient.direccion,
            telefono: patient.telefono
        }))
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Lo sentimos, algo salio mal"})
    }
}

const GetPatientById = async(req,res) => {
    try {
        const {email} = req.params

        if(!email){return res.status(400).json({msg:"Lo sentimos, debes proporcionar un correo"})}

        const patientBDD = await Patients.findOne({email:email})
        if(!patientBDD){return res.status(400).json({msg:"El paciente no existe"})}

        const response = {
            _id: patientBDD.id,
            nombre: patientBDD.nombre,
            apellido: patientBDD.apellido,
            email: patientBDD.email,
            fecha_nacimiento: patientBDD.fecha_nacimiento,
            genero: patientBDD.genero,
            ciudad:patientBDD.ciudad,
            direccion: patientBDD.direccion,
            telefono: patientBDD.telefono
        }
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Lo sentimos, algo salio mal"})
    }
}

const UpdatePatient = async(req,res) => {
    try {
        const {id}=req.params
        const updates= req.body

        if(!id){
            return res.status(400).json({msg: "Lo sentimos, debes proporcionar un id de Pacientes"})
        }
        // Obtener los datos del tecnico a actualizar
        const validFields = ['nombre','apellido','email','fecha_nacimiento','genero','direccion','telefono','ciudad']
        const filteredFields={}

        for(const field in updates){
            if(validFields.includes(field)){
                filteredFields[field]=updates[field]
            }
        }
        
            // Validar si hay campos válidos para actualizar
        if (Object.keys(filteredFields).length === 0) {
            return res.status(400).json({ msg: "No se proporcionaron campos válidos para actualizar" })
        }

        await Patients.findByIdAndUpdate(id,filteredFields,{new:true})

        const response = await Patients.findById(id).lean().select("-__v")

        return res.status(200).json({msg: "Paciente actualizado exitosamente",response})

    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Lo sentimos, algo salio mal"})
    }
}

const DeletePatient = async (req,res) => {
    const {id} = req.params
    if(!id){
        return res.status(400).json({msg: "Lo sentimos, debes proporcionar un id de Pacientes"})
    }

    try {
        const deletedPatient = await Patients.findByIdAndDelete(id)
        if(!deletedPatient){
            return res.status(400).json({msg: "El Paciente no existe"})
        }
        return res.status(200).json({msg: "Paciente eliminado exitosamente"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Lo sentimos, algo salio mal"})
    }
}


export{
    RegisterPatient,
    GetPatient,
    GetPatientById,
    UpdatePatient,
    DeletePatient
}



