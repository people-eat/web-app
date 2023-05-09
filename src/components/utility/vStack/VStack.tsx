import classNames from 'classnames';
import { type CSSProperties, type ReactElement } from 'react';

export interface VStackProps {
    className?: string;
    style?: CSSProperties;
}

export default function VStack(props: React.PropsWithChildren<VStackProps>): ReactElement {
    return (
        <div className={classNames('flex', props.className)} style={{ flexDirection: 'column', alignItems: 'center', ...props.style }}>
            {props.children}
        </div>
    );
}
