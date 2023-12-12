import React from 'react';

import icons from '../../../assets/sprites.svg';

import styles from './index.module.scss';

interface IconPros {
    className?: string;
    name: string;
}

export const Icon: React.FC <IconPros> = ({ className, name }) => {
    return (
        <svg
            role="img"
            className={`${className} ${styles.icon}`}
        >
            <use xlinkHref={`${icons}#${name}`} />
        </svg>
    );
};
