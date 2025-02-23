import {Router} from 'express'
import {login} from '../controllers/auth_controller.js'
import loginValidator from '../helpers/auth_validator.js'
import {validateRequest} from '../middlewares/middleware_validator.js'

const router = Router()

router.post('/login',loginValidator,validateRequest,login)

export default router