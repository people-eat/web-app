import classNames from 'classnames';
import { type CSSProperties, type ReactElement } from 'react';

export interface HStackProps {
    className?: string;
    style?: CSSProperties;
}

export default function HStack(props: React.PropsWithChildren<HStackProps>): ReactElement {
    return (
        <span className={classNames('flex', props.className)} style={{ flexDirection: 'row', justifyContent: 'center', ...props.style }}>
            {props.children}
        </span>
    );
}
