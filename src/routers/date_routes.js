import {Router} from 'express'
import {RegisterDate,GetDates,GetDatesById,UpdateDate,DeleteDate} from '../controllers/dates_controller.js'
import { verifyJwt } from '../middlewares/jwt.js'

const router = Router()

router.post('/date/register',verifyJwt,RegisterDate)
router.get('/date',verifyJwt,GetDates)
router.get('/date/:codigo',verifyJwt,GetDatesById)
router.patch('/date/update/:id',verifyJwt,UpdateDate)
router.delete('/date/delete/:id',verifyJwt,DeleteDate)

export default router