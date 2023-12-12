import React, { useState, useCallback } from 'react';

import styles from './index.module.scss';

import { Button } from '../Button/Button.tsx';

interface InputAddProps {
    onAdd: (title: string) => void;
}

export const InputAdd: React.FC<InputAddProps> = ({ onAdd }) => {
    const [value, setValue] = useState('');

    const addTask = useCallback(() => {
        onAdd(value);
        setValue('');
    }, [value]);

    return (
        <div className={styles.inputAdd}>
            <input type="text"
                   placeholder={'Введите текст'}
                   className={styles.inputAddField}
                   value={value}
                   onChange={(e) => {
                       setValue(e.target.value);
                   }}
                   onKeyDown={(e) => {
                     if (e.key === 'Enter') {
                         addTask();
                     }
                   }}
            />
            <Button
                buttonType='button'
                className={styles.inputAddButton}
                icon='plus'
                handleClick={addTask}
            />
        </div>
    );
}
