import Collapse from '@mui/material/Collapse';
import classNames from 'classnames';
import { useState, type ReactElement } from 'react';
import PeopleEatIconButton from '../../standard/iconButton/PeopleEatIconButton';
import { Icon } from '../icon/Icon';

interface PeopleEatExpandableProps {
    title: string;
    description: string;
}

export default function PeopleEatExpandable({ title, description }: PeopleEatExpandableProps): ReactElement {
    const [isOpen, setOpen] = useState(true);

    return (
        <div className="p-4">
            <div onClick={(): void => setOpen(!isOpen)} className="flex flex-row items-center justify-between mb-5 cursor-pointer">
                <span
                    className={classNames({
                        ['text-orange']: isOpen,
                    })}
                >
                    {title}
                </span>
                <PeopleEatIconButton icon={isOpen ? Icon.minus : Icon.plus} />
            </div>
            <Collapse in={isOpen}>
                <span>{description}</span>
            </Collapse>
        </div>
    );
}
