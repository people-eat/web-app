export type CookProfileNavigationTabType = 'PERSONAL_INFORMATION' | 'BOOKINGS' | 'MEALS' | 'MENUS';

export const cookProfileNavigationTabTypes: { type: CookProfileNavigationTabType; path: string; translationKey: string }[] = [
    {
        type: 'PERSONAL_INFORMATION',
        path: '/chef-profile',
        translationKey: 'profile-cook-tab-personal-information-label',
    },
    {
        type: 'BOOKINGS',
        path: '/chef-profile/bookings',
        translationKey: 'profile-cook-tab-bookings-label',
    },
    {
        type: 'MEALS',
        path: '/chef-profile/meals',
        translationKey: 'profile-cook-tab-meals-label',
    },
    {
        type: 'MENUS',
        path: '/chef-profile/menus',
        translationKey: 'profile-cook-tab-menus-label',
    },
];
