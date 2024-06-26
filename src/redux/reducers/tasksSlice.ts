import { createSlice, } from '@reduxjs/toolkit'
import { RootState } from '../store'

import { addItemAsync, fetchTasksAsync, addTaskAsync, addChecklistAsync, updateItemStatusAsync, deleteTaskAsync, deleteChecklistAsync, deleteItemAsync } from '../actions/tasksActions';
import { IChecklistItem, ITaskItem, ITasksSlice } from '@type/types';
import { ItemDocType } from '@type/schema';


// Define the initial state using that type
const initialState: ITasksSlice = {
    tasks: [],
    isLoading: true,
    status: null,
    error: null
}


export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        cleaup: (state) => {
            state.tasks = []
            state.isLoading = true
            state.status = null
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasksAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTasksAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload;
                state.isLoading = false
            })
            .addCase(fetchTasksAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action?.error?.message || "Something wrong"
                state.isLoading = false
            }).addCase(addTaskAsync.fulfilled, (state, action) => {
                state.tasks = [action.payload, ...state.tasks]
            })
            .addCase(addChecklistAsync.fulfilled, (state, action) => {
                const { task } = action.payload._data
                const newData = { ...action.payload._data, items: [] }
                state.tasks = state.tasks.map((item) => {
                    if (item._id === task) {
                        item.checklists = [...item.checklists, newData]
                    }
                    return item
                })

            }).addCase(addChecklistAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action?.error?.message || "Something wrong"
                state.isLoading = false
            }).addCase(addItemAsync.fulfilled, (state, action) => {

                const { task_id, checklist_id, item } = action.payload
                const newData = { ...item._data }
                state.tasks = state?.tasks?.map((task: ITaskItem) => {
                    if (task._id === task_id) {
                        task.checklists = task?.checklists.map((checkListItem: IChecklistItem) => {
                            if (checklist_id === checkListItem._id) {
                                checkListItem.items = [...checkListItem.items, newData]
                            }
                            return checkListItem
                        })
                    }
                    return task
                })

            }).addCase(addItemAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action?.error?.message || "Something wrong"
                state.isLoading = false
            }).addCase(updateItemStatusAsync.fulfilled, (state, action) => {
                const { task_id, checklist_id, item_id, item } = action.payload;
                state.tasks = state.tasks.map((task: ITaskItem) => {
                    if (task._id === task_id) {
                        const updatedChecklists = task.checklists.map((checklist: IChecklistItem) => {
                            if (checklist_id === checklist._id) {
                                const updatedItems = checklist.items.map((existingItem: ItemDocType) => {

                                    if (item_id === existingItem._id) {

                                        return item; // Update the item with new data
                                    }
                                    return existingItem;
                                });

                                return { ...checklist, items: updatedItems };
                            }
                            return checklist;
                        });

                        return { ...task, checklists: updatedChecklists };
                    }
                    return task;
                });
            }).addCase(updateItemStatusAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action?.error?.message || "Something wrong"
                state.isLoading = false
            }).addCase(deleteTaskAsync.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter((item: ITaskItem) => item._id !== action.payload)
            }).addCase(deleteTaskAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action?.error?.message || "Something wrong"
                state.isLoading = false
            }).addCase(deleteChecklistAsync.fulfilled, (state, action) => {
                console.log(action)
                const {
                    checklist_id,
                    task_id } = action.payload

                state.tasks = state.tasks.map((item) => {
                    if (item._id === task_id) {
                        item.checklists = item.checklists.filter((item: IChecklistItem) => item._id !== checklist_id)
                    }
                    return item
                })
            }).addCase(deleteChecklistAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action?.error?.message || "Something wrong"
                state.isLoading = false
            }).addCase(deleteItemAsync.fulfilled, (state, action) => {

                const { task_id, checklist_id, item_id } = action.payload;

                state.tasks = state.tasks.map((task: ITaskItem) => {
                    if (task._id === task_id) {
                        const updatedChecklists = task.checklists.map((checklist: IChecklistItem) => {
                            if (checklist_id === checklist._id) {
                                const updatedItems = checklist.items.filter((item: ItemDocType) => item._id !== item_id);

                                return { ...checklist, items: updatedItems };
                            }
                            return checklist;
                        });

                        return { ...task, checklists: updatedChecklists };
                    }
                    return task;
                })
            }).addCase(deleteItemAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action?.error?.message || "Something wrong"
                state.isLoading = false
            })


    },
})



// Other code such as selectors can use the imported `RootState` type
export const tasksState = (state: RootState) => state.tasks;
export const { cleaup } = tasksSlice.actions;
export default tasksSlice.reducer;