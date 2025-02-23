import {Router} from 'express'
import {RegisterPatient,GetPatient,GetPatientById,UpdatePatient,DeletePatient} from '../controllers/patients_controller.js'
import {verifyJwt} from '../middlewares/jwt.js'
import {RegisterPatientValidator,GetPatientByIdValidator,UpdatePatientValidator,DeletePatientValidator} from '../helpers/patients_validator.js'
import {validateRequest} from '../middlewares/middleware_validator.js'

const router = Router()
router.post('/patients/register',verifyJwt,RegisterPatientValidator,validateRequest,RegisterPatient)
router.get('/patients/',verifyJwt,GetPatient)
router.get('/patients/:email',verifyJwt,GetPatientByIdValidator,validateRequest,GetPatientById)
router.patch('/patients/update/:id',verifyJwt,UpdatePatientValidator,validateRequest,UpdatePatient)
router.delete('/patients/delete/:id',verifyJwt,DeletePatientValidator,validateRequest,DeletePatient)

export default router