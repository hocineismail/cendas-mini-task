
import { userSchema } from './models/userSchema';
import { taskSchema } from './models/taskSchema';
import { itemSchema } from './models/itemSchema';
import { checklistSchema } from './models/checklistSchema';

//create collection for our application 
export const collections = {
    users: {
        schema: userSchema,
    },
    tasks: {
        schema: taskSchema,
    },
    checklists: {
        schema: checklistSchema,
    },
    items: {
        schema: itemSchema,
    },

};
