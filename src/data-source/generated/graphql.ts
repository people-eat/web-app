/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    Date: any;
    DateTime: any;
    /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
    EmailAddress: any;
    /** A field whose value is a valid decimal degrees latitude number (53.471): https://en.wikipedia.org/wiki/Latitude */
    Latitude: any;
    /** A field whose value is a valid decimal degrees longitude number (53.471): https://en.wikipedia.org/wiki/Longitude */
    Longitude: any;
    /** A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234. */
    PhoneNumber: any;
    /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
    URL: any;
    /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
    UUID: any;
    /** Integers that will have a value of 0 or more. */
    UnsignedInt: any;
    Upload: any;
};

export type Address = {
    __typename?: 'Address';
    addressId: Scalars['String'];
    city: Scalars['String'];
    country: Scalars['String'];
    createdAt: Scalars['DateTime'];
    houseNumber: Scalars['String'];
    location: Location;
    postCode: Scalars['String'];
    street: Scalars['String'];
    title: Scalars['String'];
};

export type AddressMutation = {
    __typename?: 'AddressMutation';
    createOne: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type AddressMutationCreateOneArgs = {
    address: CreateOneAddressRequest;
};

export type AddressQuery = {
    __typename?: 'AddressQuery';
    findMany?: Maybe<Array<Address>>;
    userId: Scalars['String'];
};

export type Admin = {
    __typename?: 'Admin';
    adminId: Scalars['String'];
    createdAt: Scalars['DateTime'];
};

export type AdminMutation = {
    __typename?: 'AdminMutation';
    createOne: Scalars['Boolean'];
};

export type AdminMutationCreateOneArgs = {
    adminId: Scalars['String'];
};

export type AdminQuery = {
    __typename?: 'AdminQuery';
    findMany?: Maybe<Array<Admin>>;
    findOne?: Maybe<Admin>;
};

export type AdminQueryFindOneArgs = {
    adminId: Scalars['String'];
};

export type Allergy = {
    __typename?: 'Allergy';
    allergyId: Scalars['String'];
    title: Scalars['String'];
};

export type AllergyMutation = {
    __typename?: 'AllergyMutation';
    createOne: Scalars['Boolean'];
};

export type AllergyMutationCreateOneArgs = {
    request: CreateOneAllergyRequest;
};

export type AllergyQuery = {
    __typename?: 'AllergyQuery';
    findMany?: Maybe<Array<Allergy>>;
};

export type Category = {
    __typename?: 'Category';
    categoryId: Scalars['String'];
    title: Scalars['String'];
};

export type CategoryMutation = {
    __typename?: 'CategoryMutation';
    createOne: Scalars['Boolean'];
};

export type CategoryMutationCreateOneArgs = {
    request: CreateOneCategoryRequest;
};

export type CategoryQuery = {
    __typename?: 'CategoryQuery';
    findMany?: Maybe<Array<Category>>;
};

export type Cook = {
    __typename?: 'Cook';
    biography: Scalars['String'];
    cookId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    isLocked: Scalars['Boolean'];
    isVisible: Scalars['Boolean'];
    languages: Array<Language>;
    location: Location;
    maximumParticipants?: Maybe<Scalars['UnsignedInt']>;
    maximumPrice?: Maybe<Scalars['UnsignedInt']>;
    maximumTravelDistance?: Maybe<Scalars['UnsignedInt']>;
    meals: Array<Meal>;
    menus: Array<Menu>;
    minimumParticipants?: Maybe<Scalars['UnsignedInt']>;
    minimumPrice?: Maybe<Scalars['UnsignedInt']>;
    rank: CookRank;
    travelExpenses: Scalars['UnsignedInt'];
    user: User;
};

export type CookMutation = {
    __typename?: 'CookMutation';
    createOne: Scalars['Boolean'];
    meals: MealMutation;
    menus: MenuMutation;
};

export type CookMutationCreateOneArgs = {
    cook: CreateOneCookRequest;
};

export type CookMutationMealsArgs = {
    cookId: Scalars['String'];
};

export type CookMutationMenusArgs = {
    cookId: Scalars['String'];
};

export type CookQuery = {
    __typename?: 'CookQuery';
    findMany?: Maybe<Array<Cook>>;
    findOne?: Maybe<Cook>;
    meals: MealQuery;
    menus: MenuQuery;
};

export type CookQueryFindManyArgs = {
    request: FindManyCooksRequest;
};

export type CookQueryFindOneArgs = {
    cookId: Scalars['String'];
};

export type CookQueryMealsArgs = {
    cookId: Scalars['String'];
};

export type CookQueryMenusArgs = {
    cookId: Scalars['String'];
};

export enum CookRank {
    Hobby = 'HOBBY',
    Master = 'MASTER',
    Professional = 'PROFESSIONAL',
}

export type CreateOneAddressRequest = {
    city: Scalars['String'];
    country: Scalars['String'];
    houseNumber: Scalars['String'];
    location: LocationInput;
    postCode: Scalars['String'];
    street: Scalars['String'];
    title: Scalars['String'];
};

export type CreateOneAllergyRequest = {
    title: Scalars['String'];
};

export type CreateOneCategoryRequest = {
    title: Scalars['String'];
};

export type CreateOneCookRequest = {
    biography: Scalars['String'];
    isVisible: Scalars['Boolean'];
    location: LocationInput;
    maximumParticipants?: InputMaybe<Scalars['UnsignedInt']>;
    maximumPrice?: InputMaybe<Scalars['UnsignedInt']>;
    maximumTravelDistance?: InputMaybe<Scalars['UnsignedInt']>;
    minimumParticipants?: InputMaybe<Scalars['UnsignedInt']>;
    minimumPrice?: InputMaybe<Scalars['UnsignedInt']>;
    rank: CookRank;
    travelExpenses: Scalars['UnsignedInt'];
};

export type CreateOneKitchenRequest = {
    title: Scalars['String'];
};

export type CreateOneLanguageRequest = {
    title: Scalars['String'];
};

export type CreateOneMealRequest = {
    description: Scalars['String'];
    imageUrl?: InputMaybe<Scalars['URL']>;
    title: Scalars['String'];
    type: MealType;
};

export type CreateOneMenuRequest = {
    basePrice: Scalars['UnsignedInt'];
    basePriceCustomers: Scalars['UnsignedInt'];
    currencyCode: CurrencyCode;
    description: Scalars['String'];
    greetingFromKitchen: Scalars['Boolean'];
    isVisible: Scalars['Boolean'];
    kitchenId?: InputMaybe<Scalars['String']>;
    preparationTime: Scalars['UnsignedInt'];
    pricePerAdult: Scalars['UnsignedInt'];
    pricePerChild?: InputMaybe<Scalars['UnsignedInt']>;
    title: Scalars['String'];
};

export type CreateOneSessionByEmailAddressRequest = {
    emailAddress: Scalars['EmailAddress'];
    password: Scalars['String'];
    platform: Platform;
    pushToken?: InputMaybe<Scalars['String']>;
    title: Scalars['String'];
};

export type CreateOneSessionByIdentityProviderRequest = {
    idToken: Scalars['String'];
    identityProvider: IdentityProvider;
    platform: Platform;
    title: Scalars['String'];
};

export type CreateOneSessionByPhoneNumberRequest = {
    password: Scalars['String'];
    phoneNumber: Scalars['String'];
    platform: Platform;
    pushToken?: InputMaybe<Scalars['String']>;
    title: Scalars['String'];
};

export type CreateOneUserByEmailAddressRequest = {
    birthDate?: InputMaybe<Scalars['Date']>;
    emailAddress: Scalars['EmailAddress'];
    firstName: Scalars['String'];
    gender: Gender;
    language: UserLanguage;
    lastName: Scalars['String'];
    password: Scalars['String'];
};

export type CreateOneUserByIdentityProviderRequest = {
    birthDate?: InputMaybe<Scalars['Date']>;
    firstName: Scalars['String'];
    gender: Gender;
    idToken: Scalars['String'];
    identityProvider: IdentityProvider;
    language: UserLanguage;
    lastName: Scalars['String'];
};

export type CreateOneUserByPhoneNumberRequest = {
    birthDate?: InputMaybe<Scalars['Date']>;
    firstName: Scalars['String'];
    gender: Gender;
    language: UserLanguage;
    lastName: Scalars['String'];
    password: Scalars['String'];
    phoneNumber: Scalars['PhoneNumber'];
};

export enum CurrencyCode {
    Eur = 'EUR',
    Usd = 'USD',
}

export type EmailAddressUpdate = {
    __typename?: 'EmailAddressUpdate';
    createdAt: Scalars['DateTime'];
    emailAddress: Scalars['EmailAddress'];
    userId: Scalars['String'];
};

export type EmailAddressUpdateMutation = {
    __typename?: 'EmailAddressUpdateMutation';
    createOne: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type EmailAddressUpdateMutationCreateOneArgs = {
    emailAddress: Scalars['EmailAddress'];
};

export type EmailAddressUpdateQuery = {
    __typename?: 'EmailAddressUpdateQuery';
    findOne?: Maybe<EmailAddressUpdate>;
    userId: Scalars['String'];
};

export type ExpireOneSessionRequest = {
    sessionId: Scalars['String'];
    userId: Scalars['String'];
};

export type FavoriteCook = {
    __typename?: 'FavoriteCook';
    cook: Cook;
    cookId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    user: User;
    userId: Scalars['String'];
};

export type FavoriteCookMutation = {
    __typename?: 'FavoriteCookMutation';
    createOne: Scalars['Boolean'];
    deleteOne: Scalars['Boolean'];
};

export type FavoriteCookQuery = {
    __typename?: 'FavoriteCookQuery';
    findMany: Array<FavoriteCook>;
};

export type FindManyCooksRequest = {
    searchText?: InputMaybe<Scalars['String']>;
};

export type FindManyMealsRequest = {
    searchText?: InputMaybe<Scalars['String']>;
};

export type FindManyMenusRequest = {
    searchText?: InputMaybe<Scalars['String']>;
};

export type FindManyPublicCooksRequest = {
    searchText?: InputMaybe<Scalars['String']>;
};

export type FindManyPublicMenusRequest = {
    searchText?: InputMaybe<Scalars['String']>;
};

export type FindManyRequest = {
    searchText?: InputMaybe<Scalars['String']>;
    skip?: InputMaybe<Scalars['UnsignedInt']>;
    take?: InputMaybe<Scalars['UnsignedInt']>;
};

export type FindManyUsersRequest = {
    pagination: FindManyRequest;
};

export enum Gender {
    Diverse = 'DIVERSE',
    Female = 'FEMALE',
    Male = 'MALE',
    NoInformation = 'NO_INFORMATION',
}

export enum IdentityProvider {
    Apple = 'APPLE',
    Google = 'GOOGLE',
}

export type Kitchen = {
    __typename?: 'Kitchen';
    kitchenId: Scalars['String'];
    title: Scalars['String'];
};

export type KitchenMutation = {
    __typename?: 'KitchenMutation';
    createOne: Scalars['Boolean'];
};

export type KitchenMutationCreateOneArgs = {
    request: CreateOneKitchenRequest;
};

export type KitchenQuery = {
    __typename?: 'KitchenQuery';
    findMany?: Maybe<Array<Kitchen>>;
};

export type Language = {
    __typename?: 'Language';
    languageId: Scalars['String'];
    title: Scalars['String'];
};

export type LanguageMutation = {
    __typename?: 'LanguageMutation';
    createOne: Scalars['Boolean'];
};

export type LanguageMutationCreateOneArgs = {
    request: CreateOneLanguageRequest;
};

export type LanguageQuery = {
    __typename?: 'LanguageQuery';
    findMany?: Maybe<Array<Language>>;
};

export type Location = {
    __typename?: 'Location';
    latitude: Scalars['Latitude'];
    longitude: Scalars['Longitude'];
};

export type LocationInput = {
    latitude: Scalars['Latitude'];
    longitude: Scalars['Longitude'];
};

export type Meal = {
    __typename?: 'Meal';
    cookId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    description: Scalars['String'];
    imageUrl?: Maybe<Scalars['URL']>;
    mealId: Scalars['String'];
    title: Scalars['String'];
    type: MealType;
};

export type MealMutation = {
    __typename?: 'MealMutation';
    cookId: Scalars['String'];
    createOne: Scalars['Boolean'];
};

export type MealMutationCreateOneArgs = {
    meal: CreateOneMealRequest;
};

export type MealQuery = {
    __typename?: 'MealQuery';
    cookId: Scalars['String'];
    findMany?: Maybe<Array<Meal>>;
    findOne?: Maybe<Meal>;
};

export type MealQueryFindManyArgs = {
    request: FindManyMealsRequest;
};

export type MealQueryFindOneArgs = {
    mealId: Scalars['String'];
};

export enum MealType {
    Dessert = 'DESSERT',
    MainCourse = 'MAIN_COURSE',
    Starter = 'STARTER',
}

export type Menu = {
    __typename?: 'Menu';
    basePrice: Scalars['UnsignedInt'];
    basePriceCustomers: Scalars['UnsignedInt'];
    categories: Array<Category>;
    cook: Cook;
    cookId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    currencyCode: CurrencyCode;
    description: Scalars['String'];
    greetingFromKitchen: Scalars['Boolean'];
    isVisible: Scalars['Boolean'];
    kitchen?: Maybe<Kitchen>;
    kitchenId?: Maybe<Scalars['String']>;
    menuId: Scalars['String'];
    preparationTime: Scalars['UnsignedInt'];
    pricePerAdult: Scalars['UnsignedInt'];
    pricePerChild?: Maybe<Scalars['UnsignedInt']>;
    title: Scalars['String'];
};

export type MenuMutation = {
    __typename?: 'MenuMutation';
    cookId: Scalars['String'];
    createOne: Scalars['Boolean'];
};

export type MenuMutationCreateOneArgs = {
    menu: CreateOneMenuRequest;
};

export type MenuQuery = {
    __typename?: 'MenuQuery';
    cookId: Scalars['String'];
    findMany?: Maybe<Array<Menu>>;
    findOne?: Maybe<Menu>;
};

export type MenuQueryFindManyArgs = {
    request: FindManyMenusRequest;
};

export type MenuQueryFindOneArgs = {
    menuId: Scalars['String'];
};

export type Mutation = {
    __typename?: 'Mutation';
    admins: AdminMutation;
    allergies: AllergyMutation;
    categories: CategoryMutation;
    cooks: CookMutation;
    kitchens: KitchenMutation;
    languages: LanguageMutation;
    privacyPolicyUpdates: PrivacyPolicyUpdateMutation;
    sessions: SessionMutation;
    termsUpdates: TermsUpdateMutation;
    users: UserMutation;
};

export type Notification = {
    __typename?: 'Notification';
    createdAt: Scalars['DateTime'];
    message: Scalars['String'];
    notificationId: Scalars['String'];
    url?: Maybe<Scalars['URL']>;
    userId: Scalars['String'];
    wasRead?: Maybe<Scalars['Boolean']>;
};

export type NotificationConfiguration = {
    __typename?: 'NotificationConfiguration';
    createdAt: Scalars['DateTime'];
    userId: Scalars['String'];
};

export type NotificationConfigurationMutation = {
    __typename?: 'NotificationConfigurationMutation';
    userId: Scalars['String'];
};

export type NotificationConfigurationQuery = {
    __typename?: 'NotificationConfigurationQuery';
    findOne?: Maybe<NotificationConfiguration>;
    userId: Scalars['String'];
};

export type NotificationMutation = {
    __typename?: 'NotificationMutation';
    userId: Scalars['String'];
};

export type NotificationQuery = {
    __typename?: 'NotificationQuery';
    findMany?: Maybe<Array<Notification>>;
    userId: Scalars['String'];
};

export type OneTimeAccessToken = {
    __typename?: 'OneTimeAccessToken';
    createdAt: Scalars['DateTime'];
    userId: Scalars['String'];
};

export type OneTimeAccessTokenMutation = {
    __typename?: 'OneTimeAccessTokenMutation';
    createOne: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type OneTimeAccessTokenQuery = {
    __typename?: 'OneTimeAccessTokenQuery';
    findMany?: Maybe<Array<OneTimeAccessToken>>;
    userId: Scalars['String'];
};

export type PaymentQuery = {
    __typename?: 'PaymentQuery';
    stripe: StripeQuery;
};

export type PhoneNumberUpdate = {
    __typename?: 'PhoneNumberUpdate';
    createdAt: Scalars['DateTime'];
    phoneNumber: Scalars['PhoneNumber'];
    userId: Scalars['String'];
};

export type PhoneNumberUpdateMutation = {
    __typename?: 'PhoneNumberUpdateMutation';
    createOne: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type PhoneNumberUpdateMutationCreateOneArgs = {
    phoneNumber: Scalars['PhoneNumber'];
};

export type PhoneNumberUpdateQuery = {
    __typename?: 'PhoneNumberUpdateQuery';
    findOne?: Maybe<PhoneNumberUpdate>;
    userId: Scalars['String'];
};

export enum Platform {
    Android = 'ANDROID',
    Browser = 'BROWSER',
    Ios = 'IOS',
    NoInformation = 'NO_INFORMATION',
}

export type Price = {
    __typename?: 'Price';
    amount: Scalars['UnsignedInt'];
    currencyCode: CurrencyCode;
};

export type PriceInput = {
    amount: Scalars['UnsignedInt'];
    currencyCode: CurrencyCode;
};

export type PrivacyPolicyUpdate = {
    __typename?: 'PrivacyPolicyUpdate';
    admin: Admin;
    adminId: Scalars['String'];
    createdAt?: Maybe<Scalars['DateTime']>;
    englishText: Scalars['String'];
    germanText: Scalars['String'];
    privacyPolicyUpdateId: Scalars['String'];
};

export type PrivacyPolicyUpdateMutation = {
    __typename?: 'PrivacyPolicyUpdateMutation';
    createOne: Scalars['Boolean'];
};

export type PrivacyPolicyUpdateQuery = {
    __typename?: 'PrivacyPolicyUpdateQuery';
    findLatest?: Maybe<PrivacyPolicyUpdate>;
    findMany?: Maybe<Array<PrivacyPolicyUpdate>>;
};

export type PublicCook = {
    __typename?: 'PublicCook';
    biography: Scalars['String'];
    cookId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    languages: Array<Language>;
    location: Location;
    maximumParticipants?: Maybe<Scalars['UnsignedInt']>;
    maximumPrice?: Maybe<Scalars['UnsignedInt']>;
    maximumTravelDistance?: Maybe<Scalars['UnsignedInt']>;
    menus: Array<PublicMenu>;
    minimumParticipants?: Maybe<Scalars['UnsignedInt']>;
    minimumPrice?: Maybe<Scalars['UnsignedInt']>;
    rank: CookRank;
    travelExpenses: Scalars['UnsignedInt'];
    user: PublicUser;
};

export type PublicCookQuery = {
    __typename?: 'PublicCookQuery';
    findMany?: Maybe<Array<PublicCook>>;
    findOne?: Maybe<PublicCook>;
};

export type PublicCookQueryFindManyArgs = {
    request: FindManyPublicCooksRequest;
};

export type PublicCookQueryFindOneArgs = {
    cookId: Scalars['String'];
};

export type PublicMenu = {
    __typename?: 'PublicMenu';
    basePrice: Scalars['UnsignedInt'];
    basePriceCustomers: Scalars['UnsignedInt'];
    categories: Array<Category>;
    cook: PublicCook;
    cookId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    description: Scalars['String'];
    greetingFromKitchen: Scalars['Boolean'];
    kitchen?: Maybe<Kitchen>;
    kitchenId?: Maybe<Scalars['String']>;
    menuId: Scalars['String'];
    preparationTime: Scalars['UnsignedInt'];
    pricePerAdult: Scalars['UnsignedInt'];
    pricePerChild?: Maybe<Scalars['UnsignedInt']>;
    title: Scalars['String'];
};

export type PublicMenuQuery = {
    __typename?: 'PublicMenuQuery';
    findMany?: Maybe<Array<PublicMenu>>;
    findOne?: Maybe<PublicMenu>;
};

export type PublicMenuQueryFindManyArgs = {
    request: FindManyPublicMenusRequest;
};

export type PublicMenuQueryFindOneArgs = {
    menuId: Scalars['String'];
};

export type PublicPrivacyPolicyUpdate = {
    __typename?: 'PublicPrivacyPolicyUpdate';
    createdAt?: Maybe<Scalars['DateTime']>;
    englishText: Scalars['String'];
    germanText: Scalars['String'];
};

export type PublicPrivacyPolicyUpdateQuery = {
    __typename?: 'PublicPrivacyPolicyUpdateQuery';
    findLatest?: Maybe<PublicPrivacyPolicyUpdate>;
    findMany?: Maybe<Array<PublicPrivacyPolicyUpdate>>;
};

export type PublicTermsUpdate = {
    __typename?: 'PublicTermsUpdate';
    createdAt?: Maybe<Scalars['DateTime']>;
    englishText: Scalars['String'];
    germanText: Scalars['String'];
};

export type PublicTermsUpdateQuery = {
    __typename?: 'PublicTermsUpdateQuery';
    findLatest?: Maybe<PublicTermsUpdate>;
    findMany?: Maybe<Array<PublicTermsUpdate>>;
};

export type PublicUser = {
    __typename?: 'PublicUser';
    firstName: Scalars['String'];
    profilePictureUrl?: Maybe<Scalars['URL']>;
    userId: Scalars['String'];
};

export type Query = {
    __typename?: 'Query';
    admins: AdminQuery;
    allergies: AllergyQuery;
    categories: CategoryQuery;
    cooks: CookQuery;
    kitchens: KitchenQuery;
    languages: LanguageQuery;
    payments: PaymentQuery;
    privacyPolicyUpdates: PrivacyPolicyUpdateQuery;
    publicCooks: PublicCookQuery;
    publicMenus: PublicMenuQuery;
    publicPrivacyPolicyUpdates: PublicPrivacyPolicyUpdateQuery;
    publicTermsUpdates: PublicTermsUpdateQuery;
    status: StatusQuery;
    termsUpdates: TermsUpdateQuery;
    users: UserQuery;
};

export type Session = {
    __typename?: 'Session';
    createdAt: Scalars['DateTime'];
    expired: Scalars['Boolean'];
    lastExtendedAt: Scalars['DateTime'];
    platform: Platform;
    sessionId: Scalars['String'];
    title?: Maybe<Scalars['String']>;
    userId?: Maybe<Scalars['String']>;
};

export type SessionMutation = {
    __typename?: 'SessionMutation';
    assignOneByEmailAddress: Scalars['Boolean'];
    assignOneByIdentityProvider: Scalars['Boolean'];
    assignOneByPhoneNumber: Scalars['Boolean'];
};

export type SessionMutationAssignOneByEmailAddressArgs = {
    request: CreateOneSessionByEmailAddressRequest;
};

export type SessionMutationAssignOneByIdentityProviderArgs = {
    request: CreateOneSessionByIdentityProviderRequest;
};

export type SessionMutationAssignOneByPhoneNumberArgs = {
    request: CreateOneSessionByPhoneNumberRequest;
};

export type SessionQuery = {
    __typename?: 'SessionQuery';
    findMany?: Maybe<Array<Session>>;
    userId: Scalars['String'];
};

export type StatusQuery = {
    __typename?: 'StatusQuery';
    latestIosVersion: Scalars['String'];
};

export type StripeQuery = {
    __typename?: 'StripeQuery';
    publishableKey: Scalars['String'];
};

export type TermsUpdate = {
    __typename?: 'TermsUpdate';
    adminId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    englishText: Scalars['String'];
    germanText: Scalars['String'];
    termsUpdateId: Scalars['String'];
};

export type TermsUpdateMutation = {
    __typename?: 'TermsUpdateMutation';
    createOne: Scalars['Boolean'];
};

export type TermsUpdateQuery = {
    __typename?: 'TermsUpdateQuery';
    findMany?: Maybe<Array<TermsUpdate>>;
};

export type User = {
    __typename?: 'User';
    acceptedPrivacyPolicy: Scalars['DateTime'];
    acceptedTerms: Scalars['DateTime'];
    addressCount: Scalars['UnsignedInt'];
    addresses: Array<Address>;
    admin?: Maybe<Admin>;
    birthDate?: Maybe<Scalars['Date']>;
    cook?: Maybe<Cook>;
    createdAt: Scalars['DateTime'];
    emailAddress?: Maybe<Scalars['EmailAddress']>;
    firstName: Scalars['String'];
    gender: Gender;
    isAdmin: Scalars['Boolean'];
    isCook: Scalars['Boolean'];
    lastName: Scalars['String'];
    phoneNumber?: Maybe<Scalars['PhoneNumber']>;
    profilePictureUrl?: Maybe<Scalars['URL']>;
    userId: Scalars['String'];
};

export enum UserLanguage {
    English = 'ENGLISH',
    German = 'GERMAN',
}

export type UserMutation = {
    __typename?: 'UserMutation';
    acceptLatestPrivacyPolicy: Scalars['Boolean'];
    acceptLatestTerms: Scalars['Boolean'];
    addresses: AddressMutation;
    createOneByEmailAddress: Scalars['Boolean'];
    createOneByIdentityProvider: Scalars['Boolean'];
    createOneByPhoneNumber: Scalars['Boolean'];
    emailAddressUpdates: EmailAddressUpdateMutation;
    favoriteCooks: FavoriteCookQuery;
    lockOne: Scalars['Boolean'];
    notificationConfigurations: NotificationConfigurationMutation;
    notifications: NotificationMutation;
    oneTimeAccessTokens: OneTimeAccessTokenMutation;
    phoneNumberUpdates: PhoneNumberUpdateMutation;
    sessions: UserSessionMutation;
    updateGender: Scalars['Boolean'];
    updatePassword: Scalars['Boolean'];
    updateProfilePicture: Scalars['Boolean'];
};

export type UserMutationAddressesArgs = {
    userId: Scalars['String'];
};

export type UserMutationCreateOneByEmailAddressArgs = {
    request: CreateOneUserByEmailAddressRequest;
};

export type UserMutationCreateOneByIdentityProviderArgs = {
    request: CreateOneUserByIdentityProviderRequest;
};

export type UserMutationCreateOneByPhoneNumberArgs = {
    request: CreateOneUserByPhoneNumberRequest;
};

export type UserMutationEmailAddressUpdatesArgs = {
    userId: Scalars['String'];
};

export type UserMutationFavoriteCooksArgs = {
    userId: Scalars['String'];
};

export type UserMutationLockOneArgs = {
    userId: Scalars['String'];
};

export type UserMutationNotificationConfigurationsArgs = {
    userId: Scalars['String'];
};

export type UserMutationNotificationsArgs = {
    userId: Scalars['String'];
};

export type UserMutationOneTimeAccessTokensArgs = {
    userId: Scalars['String'];
};

export type UserMutationPhoneNumberUpdatesArgs = {
    userId: Scalars['String'];
};

export type UserMutationSessionsArgs = {
    userId: Scalars['String'];
};

export type UserMutationUpdateGenderArgs = {
    gender: Gender;
    userId: Scalars['String'];
};

export type UserMutationUpdatePasswordArgs = {
    password: Scalars['String'];
    userId: Scalars['String'];
};

export type UserMutationUpdateProfilePictureArgs = {
    profilePicture?: InputMaybe<Scalars['Upload']>;
    userId: Scalars['String'];
};

export type UserQuery = {
    __typename?: 'UserQuery';
    addresses: AddressQuery;
    emailAddressUpdates: EmailAddressUpdateQuery;
    favoriteCooks: FavoriteCookQuery;
    findMany?: Maybe<Array<User>>;
    findOne?: Maybe<User>;
    me?: Maybe<User>;
    notificationConfigurations: NotificationConfigurationQuery;
    notifications: NotificationQuery;
    oneTimeAccessTokens: OneTimeAccessTokenQuery;
    phoneNumberUpdates: PhoneNumberUpdateQuery;
    sessions: SessionQuery;
};

export type UserQueryAddressesArgs = {
    userId: Scalars['String'];
};

export type UserQueryEmailAddressUpdatesArgs = {
    userId: Scalars['String'];
};

export type UserQueryFavoriteCooksArgs = {
    userId: Scalars['String'];
};

export type UserQueryFindManyArgs = {
    request: FindManyUsersRequest;
};

export type UserQueryFindOneArgs = {
    userId: Scalars['String'];
};

export type UserQueryMeArgs = {
    pushToken?: InputMaybe<Scalars['String']>;
};

export type UserQueryNotificationConfigurationsArgs = {
    userId: Scalars['String'];
};

export type UserQueryNotificationsArgs = {
    userId: Scalars['String'];
};

export type UserQueryOneTimeAccessTokensArgs = {
    userId: Scalars['String'];
};

export type UserQueryPhoneNumberUpdatesArgs = {
    userId: Scalars['String'];
};

export type UserQuerySessionsArgs = {
    userId: Scalars['String'];
};

export type UserSessionMutation = {
    __typename?: 'UserSessionMutation';
    expireCurrent: Scalars['Boolean'];
    expireMany: Scalars['Boolean'];
    expireOne: Scalars['Boolean'];
};

export type UserSessionMutationExpireManyArgs = {
    request: Array<Scalars['String']>;
};

export type UserSessionMutationExpireOneArgs = {
    request: ExpireOneSessionRequest;
};

export type GetProfileQueryQueryVariables = Exact<{ [key: string]: never }>;

export type GetProfileQueryQuery = {
    __typename?: 'Query';
    users: { __typename?: 'UserQuery'; me?: { __typename?: 'User'; firstName: string } | null };
};

export const GetProfileQueryDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'GetProfileQuery' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'users' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'me' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'firstName' } }],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<GetProfileQueryQuery, GetProfileQueryQueryVariables>;
