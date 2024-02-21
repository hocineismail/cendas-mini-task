// Define the User document type with explicit properties
export interface UserDocType {
    _id: string;
    username: string;
    createdAt: number;
    updatedAt: number;
};
export interface DescriptionDocType {
    text: string;
    color: string;

};
export interface TaskDocType {
    _id: string;
    title: string;
    user: string;
    description: DescriptionDocType
    createdAt: number;
    updatedAt: number;
};

export interface ItemDocType {
    _id: string;
    name: string;
    status: boolean;
    description: string
    color: string
    emoji: string
    checklist: string
    createdAt: number;
    updatedAt: number;
};

export interface ChecklistDocType {
    _id: string;
    title: string;
    task: string
    createdAt: number;
    updatedAt: number;
};

