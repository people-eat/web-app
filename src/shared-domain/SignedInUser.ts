export interface SignedInUser {
    userId: string;
    firstName: string;
    profilePictureUrl?: string;
    isCook: boolean;
    isAdmin: boolean;
}
