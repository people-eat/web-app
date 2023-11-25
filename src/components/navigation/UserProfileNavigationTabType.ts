export type UserProfileNavigationTabType = 'PERSONAL_INFORMATION' | 'BOOKINGS' | 'FAVORITE_COOKS';

export const userProfileNavigationTabTypes: { type: UserProfileNavigationTabType; path: string; translationKey: string }[] = [
    {
        type: 'PERSONAL_INFORMATION',
        path: '/profile',
        translationKey: 'profile-user-tab-personal-information-label',
    },
    {
        type: 'BOOKINGS',
        path: '/profile/bookings',
        translationKey: 'profile-user-tab-bookings-label',
    },
    {
        type: 'FAVORITE_COOKS',
        path: '/profile/favorite-chefs',
        translationKey: 'profile-user-tab-favorite-cooks-label',
    },
];
