import {body,param} from 'express-validator'

const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

const RegisterDateValidator = [
    body('codigo')
        .trim()
        .notEmpty().withMessage("El codigo es requerido"),
    body('descripcion')
        .trim()
        .notEmpty().withMessage("La descripcion es requerida")
        .isLength({min:10,max:500}).withMessage("Minimo de 10 caracteres maximo 500 caracteres"),
    body('paciente')
        .trim()
        .notEmpty().withMessage("El email del paciente es requerido")
        .matches(regexEmail).withMessage("El formato del email no es valido"),
    body('especialidad')
        .trim()
        .notEmpty().withMessage("El codigo de la especialidad es requerido")
]

const GetDateByIdValidator = [
    param('codigo')
        .trim()
        .notEmpty().withMessage("El codigo es requerido")
]

const UpdateDateValidator = [
    param('id')
        .trim()
        .notEmpty().withMessage('El id es requerido')
        .isMongoId().withMessage('El id no es valido'),
    body('descripcion')
        .trim()
        .notEmpty().withMessage("La descripcion es requerida")
        .isLength({min:10,max:500}).withMessage("Minimo de 10 caracteres maximo 500 caracteres"),
    body('especialidad')
        .trim()
        .notEmpty().withMessage("El codigo de la especialidad es requerido")
]

const DeleteDateValidator = [
    param('id')
        .trim()
        .notEmpty().withMessage('El id es requerido')
        .isMongoId().withMessage('El id no es valido'),
]

export {
    RegisterDateValidator,
    GetDateByIdValidator,
    UpdateDateValidator,
    DeleteDateValidator
}