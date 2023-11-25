export type CookProfileBookingTabType = 'CHAT' | 'EVENT' | 'MENU' | 'RATING' | 'SUPPORT';

export const cookProfileBookingTabTypes: CookProfileBookingTabType[] = ['CHAT', 'EVENT', 'MENU', 'RATING', 'SUPPORT'];

export const cookProfileBookingTabTranslationKeys: Record<CookProfileBookingTabType, string> = Object.freeze({
    ['CHAT']: 'tab-chat',
    ['EVENT']: 'tab-details',
    ['MENU']: 'tab-menu',
    ['RATING']: 'tab-rating',
    ['SUPPORT']: 'tab-support',
});

export function isCookProfileBookingTabType(tabString: string): tabString is CookProfileBookingTabType {
    return cookProfileBookingTabTypes.includes(tabString as CookProfileBookingTabType);
}
