import * as express from 'express'
import TodoController from '../controllers/TodoController'

const router = express.Router()
router.post('/todos', TodoController.create)

export default router