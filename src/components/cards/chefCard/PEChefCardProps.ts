import { type CookRank } from '../../../data-source/generated/graphql';

export interface PEChefCardProps {
    firstName: string;
    profilePictureUrl?: string;
    rank: CookRank;
    location: string;
    rating: {
        average: number;
        count: number;
    };
    categories: string[];
    kitchens: string[];
    picturePosition?: string;
    userId?: string;
}
