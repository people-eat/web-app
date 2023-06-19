import { type CSSProperties, type ReactElement } from 'react';

export interface HStackProps {
    className?: string;
    style?: CSSProperties;
    gap?: number;
    onClick?: () => void;
}

export default function HStack(props: React.PropsWithChildren<HStackProps>): ReactElement {
    return (
        <span
            className={props.className}
            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: props.gap, ...props.style }}
            onClick={props.onClick}
        >
            {props.children}
        </span>
    );
}
