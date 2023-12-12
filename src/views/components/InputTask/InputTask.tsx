import React, { useEffect, useRef, useState } from 'react';

import { Icon } from '../Icon/icon.tsx';

import styles from './index.module.scss';

interface InputTaskProps {
    id: string,
    title: string,
    onRemove: (id: string) => void;
    onEdit: (id: string, title: string) => void;
    onDone: (id: string) => void;
}

export const InputTask: React.FC<InputTaskProps> = ({ id, title, onRemove, onEdit, onDone }) => {
    const [check, setCheck] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [startValue, setStartValue] = useState(title);
    const editTitleInutRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editMode) {
            editTitleInutRef?.current?.focus();
        }
    }, [editMode])

    return (
        <div className={styles.inputTask}>
            <label htmlFor="input" className={styles.inputTaskField}>
                <input type="checkbox"
                       checked={check}
                       disabled={editMode}
                       className={styles.inputTaskCheckbox}
                       onChange={(e) => {
                           setCheck(e.target.checked);
                           setTimeout(() => {
                            onDone(id)
                           }, 400)
                       }}
                />
                <span className={styles.inputTaskCheckboxFake}></span>
                {editMode ? (
                    <input
                        type="text"
                        value={startValue}
                        ref={editTitleInutRef}
                        onChange={(e) => {
                            setStartValue(e.target.value)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onEdit(id, startValue);
                                setEditMode(false)
                            }
                        }}
                        className={styles.inputTaskInputEdit}
                    />
                ) : (
                    <h3 className={styles.inputTaskName}>{title}</h3>
                )
                }
            </label>
            <div className={styles.inputTaskButtons}>
                {editMode ? (
                    <button
                        aria-label='Save'
                        className={styles.inputTaskButton}
                        onClick={() => {
                            onEdit(id, startValue);
                            setEditMode(false);
                        }}
                    >
                        <Icon
                            name='check'
                        />
                    </button>
                ) : (
                    <button
                        aria-label='Edit'
                        className={styles.inputTaskButton}
                        onClick={() => setEditMode(true)}
                    >
                        <Icon
                            name='edit'
                        />
                    </button>
                )
                }
                <button
                    aria-label='Remove'
                    className={styles.inputTaskButton}
                    onClick={() => {
                        if (confirm('Вы уверенны?')) {
                            onRemove(id);
                        }
                    }}
                >
                    <Icon
                        name='trash'
                    />
                </button>
            </div>
        </div>
    );
}
