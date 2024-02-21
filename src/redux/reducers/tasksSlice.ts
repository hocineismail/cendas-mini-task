import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

import { addItemAsync, fetchTasksAsync, addTaskAsync, addChecklistAsync, updateItemStatusAsync } from '../actions/tasksActions';
import { ITasksSlice } from '@type/types';


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

            }).addCase(addItemAsync.fulfilled, (state, action) => {
                console.log(action.payload)
                const { task_id, checklist_id, item } = action.payload
                const newData = { ...item._data }
                state.tasks = state?.tasks?.map((task) => {
                    if (task._id === task_id) {
                        task.checklists = task?.checklists.map((item: any) => {
                            if (checklist_id === newData.checklist) {
                                item.items = [...item.items, newData]
                            }
                            return item
                        })
                    }
                    return task
                })

            }).addCase(updateItemStatusAsync.fulfilled, (state, action) => {

                const { task_id, checklist_id, item_id, item } = action.payload;

                state.tasks = state.tasks.map((task) => {
                    if (task._id === task_id) {
                        const updatedChecklists = task.checklists.map((checklist: any) => {
                            if (checklist_id === checklist._id) {
                                const updatedItems = checklist.items.map((existingItem: any) => {

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

                // state.tasks = [action.payload]
            })
    },
})



// Other code such as selectors can use the imported `RootState` type
export const tasksState = (state: RootState) => state.tasks;

export default tasksSlice.reducer;