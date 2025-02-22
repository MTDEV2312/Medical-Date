import Specialities from '../models/specialties_models.js'

const RegisterSpecialities = async (req,res) => {
    try {
        const {codigo}=req.body

        //? Verifica si un campo esta vacio
        if(Object.values(req.body).includes("")) {
            return res.status(400).json({msg: "Lo sentimos, debes llenar todos los campos"})
        }
        
        //? Verifica si el email es valido
        const SpecialitiesBDD = await Specialities.findOne({codigo})
        if(SpecialitiesBDD) {
            return res.status(400).json({msg: "El codigo ya esta registrado"})
        }
    
        const newSpeciality = new Specialities (req.body)
        await newSpeciality.save()
        return res.status(201).json({msg:"Paciente Creado exitosamente"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:"Lo sentimos, algo salio mal"})
    }
}

const GetSpecialities = async(req,res) => {
        try {
            const specialities = await Specialities.find()
            const response = specialities.map(Speciality => ({
                _id: Speciality.id,
                codigo: Speciality.codigo,
                nombre: Speciality.nombre,
                descripcion: Speciality.descripcion
            }))
            res.status(200).json(response)
        } catch (error) {
            console.log(error)
            res.status(500).json({msg:"Lo sentimos, algo salio mal"})
        }
}

const GetSpecialitiesById = async(req,res) => {
    try {
        const {codigo} = req.params
        if(!codigo){return res.status(400).json({msg:"Lo sentimos, debes proporcionar un codigo"})}

        const SpecialitiesBDD = await Specialities.findOne({codigo:codigo})
        if(!SpecialitiesBDD){return res.status(400).json({msg:"La especialidad no existe"})}

        const response = {
            _id: SpecialitiesBDD.id,
            codigo: SpecialitiesBDD.codigo,
            nombre: SpecialitiesBDD.nombre,
            descripcion: SpecialitiesBDD.descripcion
        }
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Lo sentimos, algo salio mal"})
    }
}

const UpdateSpeciality = async (req,res) => {
        try {
            const {id}=req.params
            const updates= req.body
    
            if(!id){
                return res.status(400).json({msg: "Lo sentimos, debes proporcionar un id de Especialidades"})
            }
            // Obtener los datos del tecnico a actualizar
            const validFields = ['nombre','descripcion']
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
    
            await Specialities.findByIdAndUpdate(id,filteredFields,{new:true})
    
            const response = await Specialities.findById(id).lean().select("-__v")
    
            return res.status(200).json({msg: "Especialidad actualizada exitosamente",response})
    
        } catch (error) {
            console.log(error)
            return res.status(500).json({msg: "Lo sentimos, algo salio mal"})
        }
}

const DeleteSpeciality = async (req,res) => {
        const {id} = req.params
        if(!id){
            return res.status(400).json({msg: "Lo sentimos, debes proporcionar un id de Especialidades"})
        }
    
        try {
            const deletedPatient = await Specialities.findByIdAndDelete(id)
            if(!deletedPatient){
                return res.status(400).json({msg: "La especualidad no existe"})
            }
            return res.status(200).json({msg: "Especialidad eliminada exitosamente"})
        } catch (error) {
            console.log(error)
            return res.status(500).json({msg: "Lo sentimos, algo salio mal"})
        }
}

export{
    RegisterSpecialities,
    GetSpecialities,
    GetSpecialitiesById,
    UpdateSpeciality,
    DeleteSpeciality
}

