import { ChecklistDocType, ItemDocType, TaskDocType } from "./schema"

export interface ITask {
    title: string
    description?: string,
    selectedColor?: string,
}

export interface IChecklist extends ITask {
    title: string
    task_id: string
}

export interface ITodo extends IChecklist {
    title: string
    emoji?: string
    checklist_id: string
}
// Define a type for the slice state
export interface ITasksSlice {
    tasks: ITaskItem[],
    isLoading: boolean,
    status: string | null,
    error: null | string
}

export interface ITaskItem extends TaskDocType {
    checklists: IChecklistItem[]
}
export interface IChecklistItem extends ChecklistDocType {
    items: ItemDocType[]
}

export interface IUpdateStatus {
    checklist_id: string;
    task_id: string;
    item_id: string;
}



