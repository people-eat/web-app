import { type CookRank } from '../../../../data-source/generated/graphql';

export interface MockPublicChef {
    rank: CookRank;
    rating: { average: number; count: number };
    user: { firstName: string; profilePictureUrl?: string };
    location: { latitude: number; longitude: number; city: string };
    categories: { categoryId: string; title: string }[];
    kitchens: { kitchenId: string; title: string }[];
}

export const mockPublicChefs: MockPublicChef[] = [
    {
        rank: 'PROFESSIONAL',
        rating: { average: 5.0, count: 3 },
        user: { firstName: 'Pino', profilePictureUrl: '/menus/Pino.jpg' },
        location: { latitude: 49, longitude: 8, city: 'Köln' },
        categories: [
            { categoryId: 'Bio', title: 'category 1' },
            { categoryId: 'Glutenfrei', title: 'category 2' },
        ],
        kitchens: [
            // { kitchenId: '', title: 'kitchen 1' },
            // { kitchenId: '', title: 'kitchen 2' },
        ],
    },
    {
        rank: 'MASTER',
        rating: { average: 5.0, count: 12 },
        user: { firstName: 'Christopher', profilePictureUrl: '/team/chris.png' },
        location: { latitude: 49, longitude: 8, city: 'München' },
        categories: [
            { categoryId: 'Bio', title: 'category 1' },
            { categoryId: 'Glutenfrei', title: 'category 2' },
        ],
        kitchens: [
            // { kitchenId: '', title: 'kitchen 1' },
            // { kitchenId: '', title: 'kitchen 2' },
        ],
    },
    {
        rank: 'PROFESSIONAL',
        rating: { average: 5.0, count: 8 },
        user: { firstName: 'Salvatore', profilePictureUrl: '/menus/Salvatore.jpg' },
        location: { latitude: 49, longitude: 8, city: 'Köln' },
        categories: [
            { categoryId: 'Bio', title: 'category 1' },
            { categoryId: 'Glutenfrei', title: 'category 2' },
        ],
        kitchens: [
            // { kitchenId: '', title: 'kitchen 1' },
            // { kitchenId: '', title: 'kitchen 2' },
        ],
    },
    {
        rank: 'PROFESSIONAL',
        rating: { average: 4.9, count: 4 },
        user: { firstName: 'Ruth', profilePictureUrl: '/menus/Ruth.jpg' },
        location: { latitude: 49, longitude: 8, city: 'Köln' },
        categories: [
            { categoryId: 'Bio', title: 'category 1' },
            { categoryId: 'Glutenfrei', title: 'category 2' },
        ],
        kitchens: [
            // { kitchenId: '', title: 'kitchen 1' },
            // { kitchenId: '', title: 'kitchen 2' },
        ],
    },
];
