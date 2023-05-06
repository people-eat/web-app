import GoogleMapReact from 'google-map-react';
import React, { type CSSProperties, type ReactElement } from 'react';

export interface PEMapProps {
    style?: CSSProperties;
    apiKey: string;
    location?: {
        latitude: number;
        longitude: number;
    };
}

export default function PEMap(props: React.PropsWithChildren<PEMapProps>): ReactElement {
    return (
        <GoogleMapReact
            style={{ position: 'relative', width: '100%', ...props.style }}
            bootstrapURLKeys={{ key: props.apiKey }}
            defaultCenter={{ lat: 50.11215679689394, lng: 8.676387649038587 }}
            center={props.location && { lat: props.location.latitude, lng: props.location.longitude }}
            defaultZoom={11}
        >
            {props.children}
        </GoogleMapReact>
    );
}
