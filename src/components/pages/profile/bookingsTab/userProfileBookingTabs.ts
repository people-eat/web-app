export type UserProfileBookingTabType = 'CHAT' | 'EVENT_DETAILS' | 'MENU' | 'SUPPORT';
// export type UserProfileBookingTabType = 'CHAT' | 'EVENT_DETAILS' | 'MENU' | 'RATING';

export const userProfileBookingTabTypes: UserProfileBookingTabType[] = ['CHAT', 'EVENT_DETAILS', 'MENU', 'SUPPORT'];
// export const userProfileBookingTabTypes: UserProfileBookingTabType[] = ['CHAT', 'EVENT_DETAILS', 'MENU', 'RATING'];

export const userProfileBookingTabTranslationKeys: Record<UserProfileBookingTabType, string> = Object.freeze({
    ['CHAT']: 'tab-chat',
    ['EVENT_DETAILS']: 'tab-details',
    ['MENU']: 'tab-menu',
    ['SUPPORT']: 'tab-support',
    // ['RATING']: 'tab-rating',
});
