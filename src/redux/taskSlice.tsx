import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {fetchTasks} from '../services/taskService';

export interface Task {
    id: string;
    title: string;
    description: string;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    assignedUser: string;
}

export interface FullTask extends Task {
    createdAt: string;
    updatedAt: string;
}

interface TasksState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

const initialState: TasksState = {
    tasks: [],
    loading: false,
    error: null,
};

export const loadTasks = createAsyncThunk('tasks/load', async () => {
    return await fetchTasks();
});

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<Task>) {
            state.tasks.push(action.payload);
        },
        editTask(state, action: PayloadAction<Task>) {
            const index = state.tasks.findIndex(t => t.id === action.payload.id);
            if (index !== -1) state.tasks[index] = action.payload;
        },
        deleteTask(state, action: PayloadAction<string>) {
            state.tasks = state.tasks.filter(t => t.id !== action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadTasks.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadTasks.fulfilled, (state, action) => {
                state.tasks = action.payload;
                state.loading = false;
            })
            .addCase(loadTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to load tasks';
            });
    },
});

export const {addTask, editTask, deleteTask} = tasksSlice.actions;
export default tasksSlice.reducer;