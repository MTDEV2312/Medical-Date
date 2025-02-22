import {Router} from 'express'
import {RegisterPatient,GetPatient,GetPatientById,UpdatePatient,DeletePatient} from '../controllers/patients_controller.js'
import {verifyJwt} from '../middlewares/jwt.js'


const router = Router()
router.post('/patients/register',verifyJwt,RegisterPatient)
router.get('/patients/',verifyJwt,GetPatient)
router.get('/patients/:email',verifyJwt,GetPatientById)
router.patch('/patients/update/:id',verifyJwt,UpdatePatient)
router.delete('/patients/delete/:id',verifyJwt,DeletePatient)

export default router