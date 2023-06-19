import { type CurrencyCode } from '../../../data-source/generated/graphql';

export interface PEMenuCardProps {
    title: string;
    description?: string;
    imageUrls: string[];
    pricePerPerson: number;
    currencyCode: CurrencyCode;
    chefFirstName: string;
    chefProfilePictureUrl?: string;
    categories: string[];
    kitchen?: string;
    onClick?: () => void;
    fullWidth?: boolean;
}
