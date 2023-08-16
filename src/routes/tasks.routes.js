import { Router } from "express";
import { autRequired } from "../middlewares/validateToken.js";
import { createTask, deleteTask, getTask, getTasks, updateTask } from "../controllers/tasks.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/task.schema.js";
const router  = Router();

//ruta protegida por jwt desde autrequired
router.get('/tasks',autRequired, getTasks)

router.get('/tasks/:id',autRequired, getTask)

router.post('/tasks',autRequired, validateSchema(createTaskSchema),createTask )

router.delete('/tasks/:id',autRequired, deleteTask)

router.put('/tasks/:id',autRequired, updateTask)

export default router;