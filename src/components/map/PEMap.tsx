import GoogleMapReact from 'google-map-react';
import React, { type CSSProperties, type ReactElement } from 'react';

export interface PEMapProps {
    style?: CSSProperties;
    apiKey: string;
}

export default function PEMap(props: React.PropsWithChildren<PEMapProps>): ReactElement {
    const defaultProps = { center: { lat: 50.11215679689394, lng: 8.676387649038587 }, zoom: 11 };

    return (
        <GoogleMapReact
            style={{ position: 'relative', width: '100%', ...props.style }}
            bootstrapURLKeys={{ key: props.apiKey }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
        >
            {props.children}
        </GoogleMapReact>
    );
}
