export interface PEMenuCardProps {
    title: string;
    description?: string;
    imageUrls: string[];
    pricePerPerson: number;
    chefFirstName: string;
    chefProfilePictureUrl?: string;
    categories: string[];
    kitchen?: string;
    onClick?: () => void;
    fullWidth?: boolean;
}
