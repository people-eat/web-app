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
        rank: 'MASTER',
        rating: { average: 4.9, count: 12 },
        user: { firstName: 'Curtis', profilePictureUrl: undefined },
        location: { latitude: 49, longitude: 8, city: 'Frankfurt' },
        categories: [
            { categoryId: '', title: 'category 1' },
            { categoryId: '', title: 'category 2' },
        ],
        kitchens: [
            { kitchenId: '', title: 'kitchen 1' },
            { kitchenId: '', title: 'kitchen 2' },
        ],
    },
    {
        rank: 'MASTER',
        rating: { average: 4.9, count: 12 },
        user: { firstName: 'Estelle', profilePictureUrl: undefined },
        location: { latitude: 49, longitude: 8, city: 'Berlin' },
        categories: [
            { categoryId: '', title: 'category 1' },
            { categoryId: '', title: 'category 2' },
        ],
        kitchens: [
            { kitchenId: '', title: 'kitchen 1' },
            { kitchenId: '', title: 'kitchen 2' },
        ],
    },
    {
        rank: 'MASTER',
        rating: { average: 4.9, count: 12 },
        user: { firstName: 'Audrey', profilePictureUrl: undefined },
        location: { latitude: 49, longitude: 8, city: 'Frankfurt' },
        categories: [
            { categoryId: '', title: 'category 1' },
            { categoryId: '', title: 'category 2' },
        ],
        kitchens: [
            { kitchenId: '', title: 'kitchen 1' },
            { kitchenId: '', title: 'kitchen 2' },
        ],
    },
    {
        rank: 'MASTER',
        rating: { average: 4.9, count: 12 },
        user: { firstName: 'Danny', profilePictureUrl: undefined },
        location: { latitude: 49, longitude: 8, city: 'Stuttgart' },
        categories: [
            { categoryId: '', title: 'category 1' },
            { categoryId: '', title: 'category 2' },
        ],
        kitchens: [
            { kitchenId: '', title: 'kitchen 1' },
            { kitchenId: '', title: 'kitchen 2' },
        ],
    },
    {
        rank: 'MASTER',
        rating: { average: 4.9, count: 12 },
        user: { firstName: 'Veronica', profilePictureUrl: undefined },
        location: { latitude: 49, longitude: 8, city: 'Berlin' },
        categories: [
            { categoryId: '', title: 'category 1' },
            { categoryId: '', title: 'category 2' },
        ],
        kitchens: [
            { kitchenId: '', title: 'kitchen 1' },
            { kitchenId: '', title: 'kitchen 2' },
        ],
    },
    {
        rank: 'MASTER',
        rating: { average: 4.9, count: 12 },
        user: { firstName: 'Marshall', profilePictureUrl: undefined },
        location: { latitude: 49, longitude: 8, city: 'Mannheim' },
        categories: [
            { categoryId: '', title: 'category 1' },
            { categoryId: '', title: 'category 2' },
        ],
        kitchens: [
            { kitchenId: '', title: 'kitchen 1' },
            { kitchenId: '', title: 'kitchen 2' },
        ],
    },
    {
        rank: 'MASTER',
        rating: { average: 4.9, count: 12 },
        user: { firstName: 'Miranda', profilePictureUrl: undefined },
        location: { latitude: 49, longitude: 8, city: 'Munich' },
        categories: [
            { categoryId: '', title: 'category 1' },
            { categoryId: '', title: 'category 2' },
        ],
        kitchens: [
            { kitchenId: '', title: 'kitchen 1' },
            { kitchenId: '', title: 'kitchen 2' },
        ],
    },
    {
        rank: 'MASTER',
        rating: { average: 4.9, count: 12 },
        user: { firstName: 'Scarlett', profilePictureUrl: undefined },
        location: { latitude: 49, longitude: 8, city: 'Berlin' },
        categories: [
            { categoryId: '', title: 'category 1' },
            { categoryId: '', title: 'category 2' },
        ],
        kitchens: [
            { kitchenId: '', title: 'kitchen 1' },
            { kitchenId: '', title: 'kitchen 2' },
        ],
    },
];
