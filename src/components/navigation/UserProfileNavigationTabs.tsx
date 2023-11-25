import classNames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { type ReactElement } from 'react';
import PETabItem from '../standard/tabItem/PETabItem';
import { userProfileNavigationTabTypes, type UserProfileNavigationTabType } from './UserProfileNavigationTabType';
import styles from './UserProfileNavigationTabs.module.css';

export interface UserProfileNavigationTabsProps {
    selection: UserProfileNavigationTabType;
    className?: string;
}

export function UserProfileNavigationTabs({ selection, className }: UserProfileNavigationTabsProps): ReactElement {
    const { t: translateCommon } = useTranslation('common');
    const router = useRouter();

    return (
        <div className={classNames(styles.tabSelector, className)}>
            {userProfileNavigationTabTypes.map(({ type, translationKey, path }) => (
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
