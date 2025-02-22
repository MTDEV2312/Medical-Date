import {Router} from 'express'
import {RegisterDate,GetDates,GetDatesById,UpdateDate,DeleteDate} from '../controllers/dates_controller.js'

const router = Router()

router.post('/date/register',RegisterDate)
router.get('/date',GetDates)
router.get('/date/:codigo',GetDatesById)
router.patch('/date/update/:id',UpdateDate)
router.delete('/date/delete/:id',DeleteDate)

export default router