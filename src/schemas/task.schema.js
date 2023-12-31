import {z} from 'zod';

//TODO: VALIDACIOES PARA TASK
export const createTaskSchema = z.object({
    title: z.string({
        required_error: "Title is required"
    }),
    description : z.string({
        required_error: "Description mus be a string"
    }),
    date: z.string().datetime().optional(),
});