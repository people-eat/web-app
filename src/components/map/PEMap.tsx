/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment */
import GoogleMapReact from 'google-map-react';
import React, { useEffect, useState, type CSSProperties, type ReactElement } from 'react';

export interface PEMapProps {
    style?: CSSProperties;
    apiKey: string;
    location?: {
        latitude: number;
        longitude: number;
    };
    renderMarker?: boolean;
    markerRadius?: number;
}

interface PEPosition {
    lat: number;
    lng: number;
}

function renderMarkers(map: any, maps: any, position: PEPosition, radius: number): void {
    new maps.Marker({ position, map, icon: '/icons/pin-icon.svg' });
    circle = new maps.Circle({
        center: { ...position },
        radius,
        options: { strokeColor: 'transparent', fillColor: 'rgba(151, 71, 255, 0.7)' },
        map,
    });
}

let circle: any;

export default function PEMap(props: React.PropsWithChildren<PEMapProps>): ReactElement {
    const [radius, setRadius] = useState(props.markerRadius ?? 0);

    useEffect(() => {
        setRadius(props.markerRadius ?? 0);
        if (circle) circle.setRadius(props.markerRadius ?? 0);
    }, [props.markerRadius, circle, radius]);

    return (
        <GoogleMapReact
            style={{ position: 'relative', width: '100%', ...props.style }}
            bootstrapURLKeys={{ key: props.apiKey }}
            defaultCenter={{ lat: 50.11215679689394, lng: 8.676387649038587 }}
            center={props.location && { lat: props.location.latitude, lng: props.location.longitude }}
            onGoogleApiLoaded={({ map, maps }): void => {
                props.renderMarker &&
                    renderMarkers(
                        map,
                        maps,
                        (props.location && { lat: props.location.latitude, lng: props.location.longitude }) ?? {
                            lat: 50.11215679689394,
                            lng: 8.676387649038587,
                        },
                        radius,
                    );
            }}
            defaultZoom={11}
        >
            {props.children}
        </GoogleMapReact>
    );
}
