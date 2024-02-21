// Import necessary dependencies
import getDatabase from "@db/database";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import { ITask, IChecklist, ITodo, IUpdateStatus, TaskTarget, ChecklistTarget, ItemTarget } from '@type/types';
import { ChecklistDocType, ItemDocType } from "@type/schema";

// Define the async thunk to fetch tasks
const fetchTasksAsync = createAsyncThunk('tasks/fetchTasks', async (_, thunkAPI) => {
    try {
        // Access the current state
        const currentState = await thunkAPI.getState();
        console.log(currentState);

        // Retrieve the database instance
        const db = await getDatabase();

        // Find the current user based on the username stored in local storage
        const currentUser = await db.users.findOne({
            selector: {
                username: localStorage.getItem("username")
            }
        }).exec();

        if (!currentUser) {
            throw new Error('User not found');
        }

        // Retrieve tasks associated with the current user
        const tasks = await db.tasks.find().where("user").sort({ createdAt: "desc" }).eq(currentUser._id).exec();

        // Fetch additional details for each task, including checklists and items
        const taskPromise = tasks.map(async task => {
            const checklists = await db.checklists.find().where("task").eq(task._id).exec();
            const checklistPromise = checklists.map(async item => {
                const items = await db.items.find().where("checklist").sort({ createdAt: "asc" }).eq(item._id).exec();
                const result = {
                    ...item._data,
                    items: items.map((item) => item._data)
                };
                return result;
            });
            const checklistsWithItems = await Promise.all(checklistPromise);
            const result = {
                ...task._data,
                checklists: checklistsWithItems
            };
            return result;
        });

        const usersWithTasks = await Promise.all(taskPromise);
        return usersWithTasks;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch tasks');
    }
});

// Define the async thunk to add a task
const addTaskAsync = createAsyncThunk('tasks/addTask', async ({ title, description, selectedColor }: ITask) => {
    try {
        // Retrieve the database instance
        const db = await getDatabase();

        // Find the user in the database based on the username stored in local storage
        const user = await db.users
            .findOne({
                selector: {
                    username: localStorage.getItem("username"),
                },
            })
            .exec();

        // Create a new task object
        const newTask = {
            _id: uuidv4(),
            title,
            user: user._id,
            description: {
                color: selectedColor || "black",
                text: description
            },
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        // Insert the new task into the database
        const task = await db.tasks.insert(newTask);

        // Return the task data along with an empty checklists array
        return {
            ...task._data,
            checklists: []
        };
    } catch (error) {
        console.error(error);
        throw new Error('Failed to add task');
    }
});

// Define the async thunk to add a checklist
const addChecklistAsync = createAsyncThunk('tasks/addChecklist', async ({ task_id, title }: IChecklist) => {
    try {
        // Retrieve the database instance
        const db = await getDatabase();

        // Create a new checklist object
        const newChecklist = {
            _id: uuidv4(),
            title,
            task: task_id,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        // Insert the new checklist into the database
        const checklist = await db.checklists.insert(newChecklist);

        // Return the checklist data along with an empty items array
        return {
            ...checklist,
            items: []
        };

    } catch (error) {
        console.error(error);
        throw new Error('Failed to add checklist');
    }
});

// Define the async thunk to add an item
const addItemAsync = createAsyncThunk('tasks/addItem', async ({ checklist_id, emoji, title, description, selectedColor, task_id }: ITodo) => {
    try {
        // Retrieve the database instance
        const db = await getDatabase();

        // Create a new item object
        const newItem = {
            _id: uuidv4(),
            name: title,
            status: false,
            color: selectedColor || "black",
            description: description,
            emoji: emoji,
            checklist: checklist_id,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        // Insert the new item into the database
        const item = await db.items.insert(newItem);

        // Return the item data along with task_id and checklist_id
        return {
            item, task_id, checklist_id
        };

    } catch (error) {
        console.error(error);
        throw new Error('Failed to add item');
    }
});

// Define the async thunk to update an item's status
const updateItemStatusAsync = createAsyncThunk('tasks/updateItemStatus', async ({ checklist_id, task_id, item_id }: IUpdateStatus) => {
    try {
        // Retrieve the database instance
        const db = await getDatabase();

        // Find the target item based on the item_id
        const targetItem = await db.items.findOne().where("_id").eq(item_id).exec();

        // Define a function to update the item status
        const updateStatus = (item: ItemDocType) => {
            item.status = !item.status;
            return item;
        };

        // Modify the item in the database with the updated status
        const updatedItem = await targetItem.modify(updateStatus);

        // Return the updated item data along with checklist_id, task_id, and item_id
        return {
            checklist_id, task_id, item_id, item: {
                ...updatedItem._data,
            }
        };

    } catch (error) {
        console.error(error);
        throw new Error('Failed to update item status');
    }
});

// Define the async thunk to delete a task
const deleteTaskAsync = createAsyncThunk('tasks/deleteTask', async ({ task_id }: TaskTarget) => {
    try {
        // Retrieve the database instance
        const db = await getDatabase();

        // Remove the target task from the database
        await db.tasks.findOne().where("_id").eq(task_id).remove();

        // Remove associated checklists and items
        const checklists = await db.checklists.find().where("task").eq(task_id).remove();
        checklists.forEach(async (checklist: ChecklistDocType) => {
            const checklist_id = checklist._id;
            await db.items.find().where("checklist").eq(checklist_id).remove();
        });

        return task_id;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to delete task');
    }
});




// Define the async thunk to delete a checklist
const deleteChecklistAsync = createAsyncThunk('tasks/deleteChecklist', async ({ checklist_id }: ChecklistTarget) => {
    try {
        // Retrieve the database instance
        const db = await getDatabase();

        // Find the target checklist based on the checklist_id and remove it
        const checklist = await db.checklists.findOne().where("_id").eq(checklist_id).remove();

        // Remove associated items for the checklist
        await db.items.find().where("checklist").eq(checklist_id).remove();

        // Return the checklist_id and associated task_id
        return {
            checklist_id,
            task_id: checklist.task
        };
    } catch (error) {
        // Throw an error if there's an issue with the database operation
        throw new Error('Failed to delete checklist');
    }
});

// Define the async thunk to delete an item
const deleteItemAsync = createAsyncThunk('tasks/deleteItem', async ({ checklist_id, task_id, item_id }: ItemTarget) => {
    try {
        // Retrieve the database instance
        const db = await getDatabase();

        // Find the target item based on the item_id and remove it
        await db.items.findOne().where("_id").eq(item_id).remove();

        // Return checklist_id, task_id, and item_id
        return {
            checklist_id, task_id, item_id
        };
    } catch (error) {
        // Throw an error if there's an issue with the database operation
        throw new Error('Failed to delete item');
    }
});
export {
    deleteItemAsync, fetchTasksAsync, addTaskAsync, addChecklistAsync, addItemAsync, updateItemStatusAsync, deleteTaskAsync, deleteChecklistAsync
}