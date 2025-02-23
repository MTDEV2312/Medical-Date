import {body,param} from 'express-validator'

const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
const singleNameRegex = /^[A-Za-zÁáÉéÍíÓóÚúÑñ]+$/;

const validateEcuadorianPhone = (phone) => {
    // Convertir a string y limpiar el número
    const phoneString = phone.toString().trim().replace(/\s+/g, '');
    
    // Normalizar el número a formato local
    let normalizedPhone = phoneString;
    
    // Si empieza con +593, remover el +
    if (phoneString.startsWith('+593')) {
        normalizedPhone = '593' + phoneString.slice(4);
    }
    // Si empieza con 0, reemplazar con 593
    else if (phoneString.startsWith('0')) {
        normalizedPhone = '593' + phoneString.slice(1);
    }

    // Expresión regular actualizada para números ecuatorianos
    const phoneRegex = /^593(9\d{8}|[2-7]\d{7})$/;

    const isValid = phoneRegex.test(normalizedPhone);
    
    return isValid;
}

const RegisterPatientValidator = [
    body('nombre')
        .trim()
        .notEmpty().withMessage('El nombre es requerido')
        .matches(singleNameRegex).withMessage('El nombre debe ser solo letras')
        .isLength({min:3,max:20}).withMessage('El nombre debe tener al menos 3 caracteres y 20 caracteres'),
    body('apellido')
        .trim()
        .notEmpty().withMessage('El apellido es requerido')
        .matches(singleNameRegex).withMessage('El apellido debe ser solo letras')
        .isLength({min:3,max:20}).withMessage('El apellido debe tener al menos 3 caracteres y 20 caracteres'),
    body('email')
        .trim()
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('El email no es valido')
        .matches(regexEmail).withMessage('Formato de email inválido'),
    body('fecha_nacimiento')
        .trim()
        .notEmpty().withMessage('La fecha de nacimiento es requerida')
        .isDate().withMessage('La fecha de nacimiento no es valida'),
    body('genero')
        .trim()
        .notEmpty().withMessage('El genero es requerido')
        .isAlpha().withMessage('El genero debe ser solo letras')
        .isLength({min:1,max:1}).withMessage('El genero debe tener solo un caracter')
        .isIn(['M','F']).withMessage('El genero debe ser M o F'),
    body('direccion')
        .trim()
        .notEmpty().withMessage('La dirección es requerida')
        .isLength({min:8, max:50}).withMessage('La dirección debe tener al menos 8 caracteres'),
    body('telefono')
        .trim()
        .notEmpty().withMessage('El telefono es requerido')
        .isNumeric().withMessage('El telefono debe ser un número')
        .isLength({min:10,max:10}).withMessage('El telefono debe tener 10 caracteres')
        .custom((phone) =>{
            const isValid = validateEcuadorianPhone(phone);
            if(!isValid){
                throw new Error('Número de teléfono ecuatoriano inválido')
            }
            return true
        }),
    body('ciudad')
        .trim()
        .notEmpty().withMessage("La ciudad es requerida")
        .isAlpha().withMessage("La ciudad solo deben ser letras")
        .isLength({min:3}).withMessage("Deben ser al menos 3 caracteres")
]

const GetPatientByIdValidator = [
    param('email')
        .trim()
        .notEmpty().withMessage("El email es requerido")
        .matches(regexEmail).withMessage("Formato de email no valido")
]

const UpdatePatientValidator = [
    param('id')
        .trim()
        .notEmpty().withMessage('El id es requerido')
        .isMongoId().withMessage('El id no es valido'),
    body('nombre')
        .trim()
        .notEmpty().withMessage('El nombre es requerido')
        .matches(singleNameRegex).withMessage('El nombre debe ser solo letras')
        .isLength({min:3,max:20}).withMessage('El nombre debe tener al menos 3 caracteres y 20 caracteres'),
    body('apellido')
        .trim()
        .notEmpty().withMessage('El apellido es requerido')
        .matches(singleNameRegex).withMessage('El apellido debe ser solo letras')
        .isLength({min:3,max:20}).withMessage('El apellido debe tener al menos 3 caracteres y 20 caracteres'),
    body('email')
        .trim()
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('El email no es valido')
        .matches(regexEmail).withMessage('Formato de email inválido'),
    body('fecha_nacimiento')
        .trim()
        .notEmpty().withMessage('La fecha de nacimiento es requerida')
        .isDate().withMessage('La fecha de nacimiento no es valida'),
    body('genero')
        .trim()
        .notEmpty().withMessage('El genero es requerido')
        .isAlpha().withMessage('El genero debe ser solo letras')
        .isLength({min:1,max:1}).withMessage('El genero debe tener solo un caracter')
        .isIn(['M','F']).withMessage('El genero debe ser M o F'),
    body('direccion')
        .trim()
        .notEmpty().withMessage('La dirección es requerida')
        .isLength({min:8, max:50}).withMessage('La dirección debe tener al menos 8 caracteres'),
    body('telefono')
        .trim()
        .notEmpty().withMessage('El telefono es requerido')
        .isNumeric().withMessage('El telefono debe ser un número')
        .isLength({min:10,max:10}).withMessage('El telefono debe tener 10 caracteres')
        .custom((phone) =>{
            const isValid = validateEcuadorianPhone(phone);
            if(!isValid){
                throw new Error('Número de teléfono ecuatoriano inválido')
            }
            return true
        }),
    body('ciudad')
        .trim()
        .notEmpty().withMessage("La ciudad es requerida")
        .isAlpha().withMessage("La ciudad solo deben ser letras")
        .isLength({min:3}).withMessage("Deben ser al menos 3 caracteres")
]

const DeletePatientValidator = [
    param('id')
    .trim()
    .notEmpty().withMessage('El id es requerido')
    .isMongoId().withMessage('El id no es valido'),
]

export {
    RegisterPatientValidator,
    GetPatientByIdValidator,
    UpdatePatientValidator,
    DeletePatientValidator
}