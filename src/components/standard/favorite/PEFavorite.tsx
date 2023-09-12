import { IconButton } from '@mui/material';
import classNames from 'classnames';
import { type ReactElement } from 'react';
import { Icon } from '../icon/Icon';
import PEIcon from '../icon/PEIcon';
import { type PEFavoriteProps } from './PEFavoriteProps';

export default function PEFavorite({ disabled, isFavorite, onIsFavoriteChange }: PEFavoriteProps): ReactElement {
    return (
        <div className={classNames('w-10_ h-10_ rounded-2', 'bg-base rounded-2')}>
            <IconButton disabled={disabled} onClick={(): void => onIsFavoriteChange(!isFavorite)}>
                <PEIcon icon={isFavorite ? Icon.heartFull : Icon.heart} />
            </IconButton>
        </div>
    );
}
