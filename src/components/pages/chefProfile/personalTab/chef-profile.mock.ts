import { type CookRank } from '../../../../data-source/generated/graphql';

export interface ChefProfile {
    rank: CookRank;
    biography: string;
    user: {
        firstName: string;
        lastName: string;
        profilePictureUrl?: string;
    };
    rating: {
        average: number;
        count: number;
    };
    travelExpenses: number;
    maximumTravelDistance: number;
    maximumCustomers: number;
    isVisible: boolean;
}

export const mockChefProfile: ChefProfile = {
    rank: 'PROFESSIONAL',
    biography:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    user: {
        firstName: 'Andrea',
        lastName: 'Muster',
        profilePictureUrl: undefined,
    },
    rating: {
        average: 4.9,
        count: 25,
    },
    travelExpenses: 250,
    maximumTravelDistance: 500,
    maximumCustomers: 20,
    isVisible: true,
};
