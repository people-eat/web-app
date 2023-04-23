import { type CSSProperties, type ReactElement } from 'react';

export interface HStackProps {
    style?: CSSProperties;
}

export default function HStack(props: React.PropsWithChildren<HStackProps>): ReactElement {
    return <span style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', ...props.style }}>{props.children}</span>;
}
