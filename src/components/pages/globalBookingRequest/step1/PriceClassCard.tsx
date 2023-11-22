import classNames from 'classnames';
import { type ReactElement } from 'react';
import { type CurrencyCode } from '../../../../data-source/generated/graphql';
import styles from './PriceClassCard.module.css';

export interface PriceClassCardProps {
    selected?: boolean;
    id: string;
    title: string;
    min: number;
    max?: number;
    currencyCode: CurrencyCode;
    onClick?: () => void;
}

export default function PriceClassCard({ selected, title, min, max, currencyCode, onClick }: PriceClassCardProps): ReactElement {
    return (
        <div className={classNames(styles.card, { [styles.selectedCard as string]: Boolean(selected) })} onClick={onClick} tabIndex={0}>
            <span className={styles.title}>{title}</span>
            {max && (
                <span className={styles.priceRange}>
                    {min.toFixed(2)} - {max.toFixed(2)} {currencyCode}
                </span>
            )}
            {!max && (
                <span className={styles.priceRange}>
                    ab {min.toFixed(2)} {currencyCode}
                </span>
            )}
        </div>
    );
}
