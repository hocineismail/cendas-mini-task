import { ItemDocType } from '@type/schema';
import { RxJsonSchema, } from 'rxdb';




const itemSchema: RxJsonSchema<ItemDocType> = {
    title: 'item schema',
    description: 'Describes an item in a checklist',
    version: 0,
    type: 'object',
    properties: {
        _id: { type: 'string', maxLength: 100 },
        name: { type: 'string' },
        status: { type: 'boolean' },
        description: { type: 'string' },
        color: { type: 'string' },
        emoji: { type: "string" },
        checklist: {
            type: 'string',
            ref: 'checklists',
        },
        createdAt: { type: 'number' },
        updatedAt: { type: 'number' },
    },
    required: ['name', 'status', 'checklist'],
    primaryKey: '_id',
}
export {
    itemSchema
}
// export const itemSchema = toTypedRxJsonSchema(schemaTyped);