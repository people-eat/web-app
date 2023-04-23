import { type CSSProperties, type ReactElement } from 'react';

export interface VStackProps {
    style?: CSSProperties;
}

export default function VStack(props: React.PropsWithChildren<VStackProps>): ReactElement {
    return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ...props.style }}>{props.children}</div>;
}
