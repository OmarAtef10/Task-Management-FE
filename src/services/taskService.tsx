import {FullTask, Task} from "../redux/taskSlice";

const BASE_URL = "http://localhost:8080";

export async function fetchTasks(): Promise<Task[]> {
    const res = await fetch(`${BASE_URL}/tasks`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    if (!res.ok) {
        const error = await res.text();
        throw new Error(error);
    }
    return res.json();
}

export async function getTaskById(id: string): Promise<FullTask> {
    const res = await fetch(`${BASE_URL}/tasks/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    if (!res.ok) {
        const error = await res.text();
        throw new Error(error);
    }
    return res.json();
}
export async function createTask(task: Omit<Task, 'id'>): Promise<Task> {
    const res = await fetch(`${BASE_URL}/tasks/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(task),
    });
    if (!res.ok) {
        const error = await res.text();
        throw new Error(error);
    }
    return res.json();
}
export async function updateTask(id: string, task: Partial<Task>): Promise<Task> {
    const res = await fetch(`${BASE_URL}/tasks/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(task),
    });
    if (!res.ok) {
        const error = await res.text();
        throw new Error(error);
    }
    return res.json();
}

export async function deleteTaskByID(id: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/tasks/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    if (!res.ok) {
        const error = await res.text();
        throw new Error(error);
    }
    return;
}