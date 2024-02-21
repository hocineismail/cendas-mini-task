import { TaskDocType } from '@type/schema';
import { RxJsonSchema, } from 'rxdb';





const taskSchema: RxJsonSchema<TaskDocType> = {
  title: 'task schema',
  description: 'Describes a task and associated checklists',
  version: 0,
  type: 'object',
  properties: {
    _id: { type: 'string', maxLength: 100 },
    title: { type: 'string' },
    description: {
      type: 'object', properties: {
        color: { type: 'string' },
        text: { type: 'string' }
      },
    },
    user: {
      type: 'string',
      ref: 'users',
    },
    createdAt: { type: 'number' },
    updatedAt: { type: 'number' },
    // checklists: {
    //   ref: 'checklists', type: 'array', items: {
    //     type: "string"
    //   }
    // },

  },
  required: ['title',],
  primaryKey: '_id',
};
export {
  taskSchema
}
// export const taskSchema = toTypedRxJsonSchema(schemaTyped);