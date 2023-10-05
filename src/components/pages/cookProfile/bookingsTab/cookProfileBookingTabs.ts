export type CookProfileBookingTabType = 'CHAT' | 'EVENT_DETAILS' | 'MENU' | 'RATING';

export const cookProfileBookingTabTypes: CookProfileBookingTabType[] = ['CHAT', 'EVENT_DETAILS', 'MENU', 'RATING'];

export const cookProfileBookingTabTranslationKeys: Record<CookProfileBookingTabType, string> = Object.freeze({
    ['CHAT']: 'tab-chat',
    ['EVENT_DETAILS']: 'tab-details',
    ['MENU']: 'tab-menu',
    ['RATING']: 'tab-rating',
});
