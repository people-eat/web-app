export interface GoogleMapsPlacesResult {
    formatted_address: string;
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
    };
}

export default function searchAddress(searchText: string, onComplete: (results: GoogleMapsPlacesResult[]) => void): void {
    if (!searchText) {
        onComplete([]);
        return;
    }

    fetch(
        encodeURI(
            'google-places-api/place/textsearch/json?type=address&query="' +
                searchText +
                '"&key=' +
                (process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ?? ''),
        ),
    )
        .then((response) => response.json())
        .then((body: { results: GoogleMapsPlacesResult[] }) => onComplete(body.results))
        .catch((error) => console.error(error));
}
