import {Router} from 'express'
import {RegisterDate,GetDates,GetDatesById,UpdateDate,DeleteDate} from '../controllers/dates_controller.js'
import { verifyJwt } from '../middlewares/jwt.js'
import {RegisterDateValidator,GetDateByIdValidator,UpdateDateValidator,DeleteDateValidator} from '../helpers/date_validator.js'
import {validateRequest} from '../middlewares/middleware_validator.js'

const router = Router()

router.post('/date/register',verifyJwt,RegisterDateValidator,validateRequest,RegisterDate)
router.get('/date',verifyJwt,GetDates)
router.get('/date/:codigo',verifyJwt,GetDateByIdValidator,validateRequest,GetDatesById)
router.patch('/date/update/:id',verifyJwt,UpdateDateValidator,validateRequest,UpdateDate)
router.delete('/date/delete/:id',verifyJwt,DeleteDateValidator,validateRequest,DeleteDate)

export default router