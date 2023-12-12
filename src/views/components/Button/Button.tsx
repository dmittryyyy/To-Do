import React from 'react';

import { Icon } from '../Icon/icon.tsx';

import styles from './index.module.scss';

interface ButtonPros {
    buttonType: 'submit' | 'reset' | 'button' | undefined;
    className: string;
    text?: string;
    handleClick: () => void;
    icon?: string;
}

export const Button: React.FC <ButtonPros> = ({ buttonType, className, text , handleClick, icon }) => {
    return (
        <button
            type={buttonType}
            className={`${styles.button} ${className}`}
            onClick={handleClick}
        >
            {text}
            {icon && (
                <Icon
                    name={icon}
                />
            )}
        </button>
    );
};
