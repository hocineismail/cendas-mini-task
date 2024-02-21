import { ChecklistDocType } from '@type/schema';
import { RxJsonSchema } from 'rxdb';


const checklistSchema: RxJsonSchema<ChecklistDocType> = {
    title: 'checklist schema',
    description: 'Describes a checklist and associated items',
    version: 0,
    type: 'object',
    properties: {
        _id: { type: 'string', maxLength: 100 },
        title: { type: 'string' },
        task: {
            type: 'string',
            ref: 'tasks',
        },
        createdAt: { type: 'number' },
        updatedAt: { type: 'number' },
        // item: {
        //     ref: "items", type: 'array', items: {
        //         type: "string"
        //     }
        // },

    },
    required: ['title', 'task'],
    primaryKey: "_id"
}
export {
    checklistSchema
}

// export const checklistSchema = toTypedRxJsonSchema(schemaTyped);

