import { create } from 'zustand';

import { generateId } from '../helpers.ts';

interface Task {
    id: string;
    title: string;
    createdAt: number;
}

interface ToDoStore {
    tasks: Task[];
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void;
}

export const useToDoStore = create<ToDoStore>((set, get) => ({
    tasks: [
        {
            id: '231',
            title: 'Таская номер 1',
            createdAt: 435435,
        },
        {
            id: '23122',
            title: 'Таская номер 1',
            createdAt: 435435,
        }
    ],
    createTask: (title) => {
        const {tasks} = get();
        const newTask = {
            id: generateId(),
            title,
            createdAt: Date.now(),
        };

        set({
            tasks: [newTask].concat(tasks),
        })
    },
    updateTask: (id: string, title: string) => {
        const { tasks } = get();

        set({
            tasks: tasks.map((task) => ({
              ...task,
              title: task.id === id ? title : task.title,
            }))
        })
    },
    removeTask: (id: string) => {
        const { tasks } = get();

        set({
            tasks: tasks.filter((task) => task.id !== id)
        })
    },
}));
