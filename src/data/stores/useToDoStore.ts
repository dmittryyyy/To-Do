import { create, StateCreator } from 'zustand';

import { generateId } from '../helpers.ts';


interface Task {
    id: string;
    title: string;
    createdAt: number;
}

function isToDoStore(object: unknown): object is ToDoStore {
    return 'tasks' in object;
}

const localStorageUpdate = <T>(config: StateCreator<T>):
    StateCreator<T> => (set, get, api) => config((nextState: T, ...args: never[]) => {
    if (isToDoStore(nextState)) {
        window.localStorage.setItem('tasks', JSON.stringify(nextState.tasks));
    }
    set(nextState, ...args);
}, get, api);

const getCurrentState = () => {
    try {
        return (JSON.parse(window.localStorage.getItem('tasks') || '[]')) as Task[];
    } catch (err) {
        window.localStorage.setItem('tasks', '[]');
    }

    return [];
}

interface ToDoStore {
    tasks: Task[];
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void;
}

export const useToDoStore = create<ToDoStore>(localStorageUpdate((set, get) => ({
    tasks: getCurrentState(),
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
})));
