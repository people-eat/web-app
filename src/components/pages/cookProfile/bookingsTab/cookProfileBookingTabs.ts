export type CookProfileBookingTabType = 'CHAT' | 'EVENT' | 'MENU' | 'RATING';

export const cookProfileBookingTabTypes: CookProfileBookingTabType[] = ['CHAT', 'EVENT', 'MENU', 'RATING'];

export const cookProfileBookingTabTranslationKeys: Record<CookProfileBookingTabType, string> = Object.freeze({
    ['CHAT']: 'tab-chat',
    ['EVENT']: 'tab-details',
    ['MENU']: 'tab-menu',
    ['RATING']: 'tab-rating',
});
