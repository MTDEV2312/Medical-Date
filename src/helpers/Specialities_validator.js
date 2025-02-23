import {body,param} from 'express-validator'

const singleNameRegex = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/;

const RegisterSpecialitiesValidator = [
    body('nombre')
        .trim()
        .notEmpty().withMessage("El nombre es requerido")
        .matches(singleNameRegex).withMessage("El nombre dolo se acepta letras y espacios")
        .isLength({min:5}).withMessage("Deben ser mas de 5 caracteres"),
    body('descripcion')
        .trim()
        .notEmpty().withMessage("La descripcion es requerida")
        .isLength({min:10,max:500}).withMessage("Minimo de 10 caracteres maximo 500 caracteres")
]

const GetSpecialitiesByIdValidator = [
    param('codigo')
        .trim()
        .notEmpty().withMessage("El codigo es requerido")
]

const UpdateSpecialitiesValidator = [
    param('id')
        .trim()
        .notEmpty().withMessage('El id es requerido')
        .isMongoId().withMessage('El id no es valido'),
    body('nombre')
        .trim()
        .notEmpty().withMessage("El nombre es requerido")
        .matches(singleNameRegex).withMessage("Solo se aceptan letras")
        .isLength({min:5}).withMessage("Deben ser mas de 5 caracteres"),
    body('descripcion')
        .trim()
        .notEmpty().withMessage("La descripcion es requerida")
        .isLength({min:10,max:500}).withMessage("Minimo de 10 caracteres maximo 500 caracteres")
]

const DeleteSpecialitiesValidator = [
    param('id')
        .trim()
        .notEmpty().withMessage('El id es requerido')
        .isMongoId().withMessage('El id no es valido')
]

export {
    RegisterSpecialitiesValidator,
    GetSpecialitiesByIdValidator,
    UpdateSpecialitiesValidator,
    DeleteSpecialitiesValidator
}

