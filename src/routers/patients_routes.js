import {Router} from 'express'
import {RegisterPatient,GetPatient,GetPatientById,UpdatePatient,DeletePatient} from '../controllers/patients_controller.js'


const router = Router()
router.post('/patients/register',RegisterPatient)
router.get('/patients/',GetPatient)
router.get('/patients/:codigo',GetPatientById)
router.patch('/patients/update/:id',UpdatePatient)
router.delete('/patients/delete/:id',DeletePatient)

export default router