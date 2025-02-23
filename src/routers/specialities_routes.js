import {Router} from 'express'
import {RegisterSpecialities,GetSpecialities,GetSpecialitiesById,UpdateSpeciality,DeleteSpeciality} from '../controllers/Specialities_controller.js'
import {verifyJwt} from '../middlewares/jwt.js'
import {RegisterSpecialitiesValidator,GetSpecialitiesByIdValidator,UpdateSpecialitiesValidator,DeleteSpecialitiesValidator} from '../helpers/Specialities_validator.js'
import {validateRequest} from '../middlewares/middleware_validator.js'

const router = Router()

router.post('/specialities/register',verifyJwt,RegisterSpecialitiesValidator,validateRequest,RegisterSpecialities)
router.get('/specialities',verifyJwt,GetSpecialities)
router.get('/specialities/:codigo',verifyJwt,GetSpecialitiesByIdValidator,validateRequest,GetSpecialitiesById)
router.patch('/specialities/update/:id',verifyJwt,UpdateSpecialitiesValidator,validateRequest,UpdateSpeciality)
router.delete('/specialities/delete/:id',verifyJwt,DeleteSpecialitiesValidator,validateRequest,DeleteSpeciality)

export default router