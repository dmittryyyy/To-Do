import React from 'react'

import { useToDoStore } from '../../data/stores/useToDoStore';

import { InputAdd } from '../components/InputAdd/InputAdd';
import { InputTask } from '../components/InputTask/InputTask.tsx';

import styles from './index.module.scss';

export const App: React.FC = () => {
    const [
        tasks, createTask, updateTask, removeTask
    ] = useToDoStore(state => [
        state.tasks,
        state.createTask,
        state.updateTask,
        state.removeTask,
    ]);

    return (
        <div className={styles.main}>
            <header className={styles.mainHeader}>
                <h1 className={styles.mainTitle}>To Do</h1>
                <InputAdd
                    onAdd={(title) => {
                        if (title) {
                            createTask(title)
                    }}
                    }
                />
            </header>
            <section className={styles.mainTasks}>
                {
                    !tasks.length && (
                        <p className={styles.mainTasksText}>Задач пока нет....</p>
                    )
                }
                {tasks.map((task) => (
                    <InputTask
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        onDone={removeTask}
                        onEdit={updateTask}
                        onRemove={removeTask}
                    />
                ))}
            </section>
        </div>
    );
};
