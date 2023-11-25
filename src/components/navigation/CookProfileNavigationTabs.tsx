import classNames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { type ReactElement } from 'react';
import PETabItem from '../standard/tabItem/PETabItem';
import { cookProfileNavigationTabTypes, type CookProfileNavigationTabType } from './CookProfileNavigationTabType';
import styles from './UserProfileNavigationTabs.module.css';

export interface CookProfileNavigationTabsProps {
    selection: CookProfileNavigationTabType;
    className?: string;
}

export function CookProfileNavigationTabs({ selection, className }: CookProfileNavigationTabsProps): ReactElement {
    const { t: translateCommon } = useTranslation('common');
    const router = useRouter();

    return (
        <div className={classNames(styles.tabSelector, className)}>
            {cookProfileNavigationTabTypes.map(({ type, translationKey, path }) => (
                <PETabItem
                    key={type}
                    active={type === selection}
                    title={translateCommon(translationKey)}
                    onClick={(): void => void router.push(path)}
                />
            ))}
        </div>
    );
}
