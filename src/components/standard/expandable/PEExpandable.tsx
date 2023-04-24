import Collapse from '@mui/material/Collapse';
import classNames from 'classnames';
import { useState, type ReactElement } from 'react';
import { Icon } from '../icon/Icon';
import PEIconButton from '../iconButton/PEIconButton';

export interface PEExpandableProps {
    title: string;
    description: string;
}

export default function PEExpandable({ title, description }: PEExpandableProps): ReactElement {
    const [isOpen, setOpen] = useState(false);

    return (
        <div>
            <div onClick={(): void => setOpen(!isOpen)} className="flex flex-row items-center justify-between mb-5 cursor-pointer">
                <span className={classNames({ ['text-orange']: isOpen })}>{title}</span>
                <PEIconButton icon={isOpen ? Icon.minus : Icon.plus} withoutShadow />
            </div>
            <Collapse in={isOpen}>
                <span>{description}</span>
            </Collapse>
        </div>
    );
}
