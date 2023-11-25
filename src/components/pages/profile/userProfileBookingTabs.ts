export type UserProfileBookingTabType = 'CHAT' | 'EVENT' | 'MENU' | 'SUPPORT';

export const userProfileBookingTabTypes: UserProfileBookingTabType[] = ['CHAT', 'EVENT', 'MENU', 'SUPPORT'];

export const userProfileBookingTabTranslationKeys: Record<UserProfileBookingTabType, string> = Object.freeze({
    ['CHAT']: 'tab-chat',
    ['EVENT']: 'tab-details',
    ['MENU']: 'tab-menu',
    ['SUPPORT']: 'tab-support',
});

export function isUserProfileBookingTabType(tabString: string): tabString is UserProfileBookingTabType {
    return userProfileBookingTabTypes.includes(tabString as UserProfileBookingTabType);
}
