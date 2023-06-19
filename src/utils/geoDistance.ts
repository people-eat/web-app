function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
}

interface Location {
    latitude: number;
    longitude: number;
}

export interface GeoDistanceProps {
    location1: Location;
    location2: Location;
}

export function geoDistance({ location1, location2 }: GeoDistanceProps): number {
    // Radius of the earth in km
    const R = 6371;

    const dLat = deg2rad(location2.latitude - location1.latitude);
    const dLon = deg2rad(location2.longitude - location1.longitude);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(location1.latitude)) * Math.cos(deg2rad(location2.latitude)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Distance in km
    const d = R * c;
    return d;
}
