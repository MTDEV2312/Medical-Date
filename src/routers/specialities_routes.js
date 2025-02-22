import {Router} from 'express'
import {RegisterSpecialities,GetSpecialities,GetSpecialitiesById,UpdateSpeciality,DeleteSpeciality} from '../controllers/Specialities_controller.js'
import {verifyJwt} from '../middlewares/jwt.js'

const router = Router()

router.post('/specialities/register',verifyJwt,RegisterSpecialities)
router.get('/specialities',verifyJwt,GetSpecialities)
router.get('/specialities/:codigo',verifyJwt,GetSpecialitiesById)
router.patch('/specialities/update/:id',verifyJwt,UpdateSpeciality)
router.delete('/specialities/delete/:id',verifyJwt,DeleteSpeciality)

export default router