import axios from 'axios'
import { DataType } from '../components/common/login/login';
import { RequestStatusType } from '../redux/app-reducer';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "API-KEY": "8a3288e4-c626-49c0-8a6e-b791c78489b1"
    }
})

// api
export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists').then((res) => res.data);
    },

    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', { title: title }).then((res) => res.data);
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`);
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, { title: title }).then((res) => res.data);
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    createTask(todolistId: string, taskTitile: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, { title: taskTitile }).then((res) => res.data);
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model).then((res) => res.data)
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<ResponseType<{ userId: number }>>(`auth/login/`, { email, password, rememberMe }).then(response => response.data)
    },
    me() {
        return instance.get<ResponseType<DataType>>(`auth/me`).then((response) => response.data)
    },
    logout() {
        return instance.delete<ResponseType>(`auth/login`).then((response) => response.data)
    }
}

// types
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export enum ResultCodeStatuses {
    Success = 0,
    Error = 1,
    Captcha = 10
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses | null
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
    entityStatus: RequestStatusType
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: number | null
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: Array<TaskType>
}
