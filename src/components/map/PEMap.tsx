/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment */
import GoogleMapReact from 'google-map-react';
import { useEffect, type CSSProperties, type ReactElement } from 'react';
import { type Location } from '../../shared-domain/Location';

export interface PEMapProps {
    apiKey: string;
    location?: Location;
    markerRadius?: number;
    style?: CSSProperties;
}

let circle: {
    setRadius: (changedRadius: number | undefined) => void;
    setCenter: (changedCenter: { lat: number; lng: number } | undefined) => void;
};

let marker: {
    setPosition: (changedCenter: { lat: number; lng: number } | undefined) => void;
};

export default function PEMap({ style, apiKey, location, markerRadius }: PEMapProps): ReactElement {
    useEffect(() => {
        if (circle) {
            circle.setRadius(markerRadius);
            location && circle.setCenter({ lat: location.latitude, lng: location.longitude });
        }

        marker && location && marker.setPosition({ lat: location.latitude, lng: location.longitude });
    }, [markerRadius, location]);

    return (
        <GoogleMapReact
            style={{ position: 'relative', width: '100%', ...style }}
            bootstrapURLKeys={{ key: apiKey }}
            defaultCenter={{ lat: 50.11215679689394, lng: 8.676387649038587 }}
            center={location && { lat: location.latitude, lng: location.longitude }}
            onGoogleApiLoaded={({ map, maps }): void => {
                if (!markerRadius) return;

                const position = location
                    ? { lat: location.latitude, lng: location.longitude }
                    : { lat: 50.11215679689394, lng: 8.676387649038587 };

                marker = new maps.Marker({ position, map });

                circle = new maps.Circle({
                    center: { ...position },
                    radius: markerRadius,
                    options: { strokeColor: 'transparent', fillColor: 'rgba(255, 100, 51, 1)' },
                    map,
                });
            }}
            defaultZoom={11}
        />
    );
}
