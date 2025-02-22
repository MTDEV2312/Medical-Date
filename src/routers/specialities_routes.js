import {Router} from 'express'
import {RegisterSpecialities,GetSpecialities,GetSpecialitiesById,UpdateSpeciality,DeleteSpeciality} from '../controllers/Specialities_controller.js'

const router = Router()

router.post('/specialities/register',RegisterSpecialities)
router.get('/specialities',GetSpecialities)
router.get('/specialities/:codigo',GetSpecialitiesById)
router.patch('/specialities/update/:id',UpdateSpeciality)
router.delete('/specialities/delete/:id',DeleteSpeciality)

export default router