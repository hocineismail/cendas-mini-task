
import { RxJsonSchema } from 'rxdb';
import { UserDocType } from '@type/schema';


const userSchema: RxJsonSchema<UserDocType> = {
    title: 'user schema',
    description: 'User',
    version: 0,
    type: 'object',
    properties: {
        _id: { type: 'string', maxLength: 100 },
        username: { type: 'string', maxLength: 100 },
        createdAt: { type: 'number' },
        updatedAt: { type: 'number' },
    },
    required: ['username', '_id'],
    primaryKey: "_id",
}

export {
    userSchema
}
