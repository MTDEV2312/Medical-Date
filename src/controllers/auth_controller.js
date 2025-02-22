import User from '../models/user_model.js'

const login = async (req,res) => {
    try {
        const {email,password} = req.body

        //? Verifica si un campo esta vacio
        if(Object.values(req.body).includes("")) {
            return res.status(400).json({msg: "Lo sentimos, debes llenar todos los campos"})
        }
    
        //? Verifica si el email es valido
        const UserBDD = await findOne({email})
        if(!UserBDD){return res.status(400).json({msg:"Usuario o contraseña incorrectos."})}
    
        const verifyPassword = await User.ValidatePassword(password)
    
        if(!verifyPassword){
            return res.status(400).json({msg: "Usuario o contraseña incorrectos"})
        }
    
        const response={
            _id:UserBDD.id,
            email:UserBDD.email,
            nombre:UserBDD.nombre,
            apellido:UserBDD.apellido
        }
    
        res.status(200).json({msg:"Login exitoso",response})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Lo sentimos, algo salio mal"})
    }
}

/*
const register = async (req,res) =>{
    const{password} = req.body
    try {
        const newUser = new user(req.body)
        newUser.password = await newUser.encryptPassword(password)
        newUser.save()
        res.status(201).json({msg: "Usuario creado exitosamente"})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Lo sentimos, algo salio mal"})
    }
}
*/

export {
    login
}
