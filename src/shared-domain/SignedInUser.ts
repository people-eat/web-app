export interface SignedInUser {
    userId: string;
    firstName: string;
    profilePictureUrl?: string | null;
    isCook: boolean;
    isAdmin: boolean;
}
