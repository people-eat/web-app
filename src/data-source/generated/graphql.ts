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
    /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
    Date: string;
    /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
    DateTime: Date;
    /** A field whose value conforms to the standard internet email address format as specified in HTML Spec: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address. */
    EmailAddress: string;
    /** A field whose value is a valid decimal degrees latitude number (53.471): https://en.wikipedia.org/wiki/Latitude */
    Latitude: number;
    /** A field whose value is a valid decimal degrees longitude number (53.471): https://en.wikipedia.org/wiki/Longitude */
    Longitude: number;
    /** A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234. */
    PhoneNumber: string;
    /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
    URL: any;
    /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
    UUID: string;
    /** Integers that will have a value of 0 or more. */
    UnsignedInt: any;
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

export type Admin = {
    __typename?: 'Admin';
    adminId: Scalars['String'];
    user: PublicUser;
};

export type AdminMutation = {
    __typename?: 'AdminMutation';
    createOne: Scalars['Boolean'];
};

export type AdminQuery = {
    __typename?: 'AdminQuery';
    findMany: Array<Admin>;
    findOne?: Maybe<Admin>;
};

export type AdminQueryFindManyArgs = {
    request?: InputMaybe<FindManyRequest>;
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

export type AllergyQuery = {
    __typename?: 'AllergyQuery';
    findAll: Array<Allergy>;
};

export type AnonymousSession = {
    __typename?: 'AnonymousSession';
    anonymousUser?: Maybe<AnonymousUser>;
    platform: Platform;
    sessionId: Scalars['String'];
    userId?: Maybe<Scalars['String']>;
};

export type AnonymousUser = {
    __typename?: 'AnonymousUser';
    birthDate?: Maybe<Scalars['Date']>;
    createdAt: Scalars['DateTime'];
    gender: Gender;
    language: UserLanguage;
};

export type BookingRequest = {
    __typename?: 'BookingRequest';
    adultParticipants: Scalars['UnsignedInt'];
    allergies: Array<Allergy>;
    bookingRequestId: Scalars['String'];
    children: Scalars['UnsignedInt'];
    cook: PublicCook;
    cookAccepted: Scalars['String'];
    cookFee: Scalars['UnsignedInt'];
    cookId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    customerFee: Scalars['UnsignedInt'];
    dateTime: Scalars['DateTime'];
    duration?: Maybe<Scalars['UnsignedInt']>;
    globalBookingRequestId?: Maybe<Scalars['String']>;
    latitude: Scalars['Latitude'];
    longitude: Scalars['Longitude'];
    occasion: Scalars['String'];
    preparationTime?: Maybe<Scalars['UnsignedInt']>;
    price: Price;
    user: PublicUser;
    userAccepted: Scalars['Boolean'];
    userId: Scalars['String'];
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

export type CategoryQuery = {
    __typename?: 'CategoryQuery';
    findAll: Array<Category>;
};

export type Cook = {
    __typename?: 'Cook';
    biography: Scalars['String'];
    bookingRequests: Array<BookingRequest>;
    cookId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    followerCount: Scalars['UnsignedInt'];
    followers: Array<Following>;
    isLocked: Scalars['Boolean'];
    isVisible: Scalars['Boolean'];
    languages: Array<Language>;
    location: Location;
    maximumParticipants?: Maybe<Scalars['UnsignedInt']>;
    maximumPrice?: Maybe<Scalars['UnsignedInt']>;
    maximumTravelDistance?: Maybe<Scalars['UnsignedInt']>;
    mealCount: Scalars['UnsignedInt'];
    meals: Array<Meal>;
    menuCount: Scalars['UnsignedInt'];
    menus: Array<Menu>;
    minimumParticipants?: Maybe<Scalars['UnsignedInt']>;
    minimumPrice?: Maybe<Scalars['UnsignedInt']>;
    rank: CookRank;
    travelExpenses: Scalars['UnsignedInt'];
    user: User;
};

export type CookBookingRequestMutation = {
    __typename?: 'CookBookingRequestMutation';
    acceptBookingRequest: Scalars['Boolean'];
    cookId: Scalars['String'];
    declineBookingRequest: Scalars['Boolean'];
};

export type CookBookingRequestMutationAcceptBookingRequestArgs = {
    bookingRequestId: Scalars['String'];
};

export type CookBookingRequestMutationDeclineBookingRequestArgs = {
    bookingRequestId: Scalars['String'];
};

export type CookBookingRequestQuery = {
    __typename?: 'CookBookingRequestQuery';
    cookId: Scalars['String'];
    findMany: Array<BookingRequest>;
    findOne?: Maybe<BookingRequest>;
};

export type CookBookingRequestQueryFindManyArgs = {
    request?: InputMaybe<FindManyRequest>;
};

export type CookBookingRequestQueryFindOneArgs = {
    bookingRequestId: Scalars['String'];
};

export type CookCookRatingQuery = {
    __typename?: 'CookCookRatingQuery';
    cookId: Scalars['String'];
    findMany: Array<CookRating>;
};

export type CookCookVisitQuery = {
    __typename?: 'CookCookVisitQuery';
    cookId: Scalars['String'];
    findMany?: Maybe<Array<Address>>;
};

export type CookCookVisitQueryFindManyArgs = {
    request?: InputMaybe<FindManyRequest>;
};

export type CookFollowingQuery = {
    __typename?: 'CookFollowingQuery';
    findAll: Array<Following>;
};

export type CookMealMutation = {
    __typename?: 'CookMealMutation';
    cookId: Scalars['String'];
    createOne: Scalars['Boolean'];
    updateDescription: Scalars['Boolean'];
    updateImageUrl: Scalars['Boolean'];
    updateTitle: Scalars['Boolean'];
    updateType: Scalars['Boolean'];
};

export type CookMealMutationCreateOneArgs = {
    meal: CreateOneMealRequest;
};

export type CookMealMutationUpdateDescriptionArgs = {
    description: Scalars['String'];
};

export type CookMealMutationUpdateImageUrlArgs = {
    imageUrl?: InputMaybe<Scalars['URL']>;
};

export type CookMealMutationUpdateTitleArgs = {
    title: Scalars['String'];
};

export type CookMealMutationUpdateTypeArgs = {
    type: MealType;
};

export type CookMealQuery = {
    __typename?: 'CookMealQuery';
    cookId: Scalars['String'];
    findMany: Array<Meal>;
    findOne?: Maybe<Meal>;
};

export type CookMealQueryFindManyArgs = {
    request?: InputMaybe<FindManyRequest>;
};

export type CookMealQueryFindOneArgs = {
    mealId: Scalars['String'];
};

export type CookMenuCourseMutation = {
    __typename?: 'CookMenuCourseMutation';
    createOne: Scalars['Boolean'];
    deleteOne: Scalars['Boolean'];
    menuId: Scalars['String'];
};

export type CookMenuCourseMutationCreateOneArgs = {
    request: CreateOneCourseRequest;
};

export type CookMenuCourseQuery = {
    __typename?: 'CookMenuCourseQuery';
    findAll: Array<Course>;
    findOne?: Maybe<Course>;
    menuId: Scalars['String'];
};

export type CookMenuCourseQueryFindOneArgs = {
    courseId: Scalars['String'];
};

export type CookMenuVisitQuery = {
    __typename?: 'CookMenuVisitQuery';
    cookId: Scalars['String'];
    findMany?: Maybe<Array<Address>>;
};

export type CookMenuVisitQueryFindManyArgs = {
    request?: InputMaybe<FindManyRequest>;
};

export type CookMutation = {
    __typename?: 'CookMutation';
    bookingRequests: CookBookingRequestMutation;
    createOne: Scalars['Boolean'];
    meals: CookMealMutation;
    menus: MenuMutation;
    updateBiography: Scalars['Boolean'];
    updateIsLocked: Scalars['Boolean'];
    updateIsVisible: Scalars['Boolean'];
    updateLocation: Scalars['Boolean'];
    updateMaximumParticipants: Scalars['Boolean'];
    updateMaximumPrice: Scalars['Boolean'];
    updateMaximumTravelDistance: Scalars['Boolean'];
    updateMinimumParticipants: Scalars['Boolean'];
    updateMinimumPrice: Scalars['Boolean'];
    updateRank: Scalars['Boolean'];
    updateTravelExpenses: Scalars['Boolean'];
};

export type CookMutationBookingRequestsArgs = {
    cookId: Scalars['String'];
};

export type CookMutationCreateOneArgs = {
    request: CreateOneCookRequest;
};

export type CookMutationMealsArgs = {
    cookId: Scalars['String'];
};

export type CookMutationMenusArgs = {
    cookId: Scalars['String'];
};

export type CookMutationUpdateBiographyArgs = {
    biography: Scalars['String'];
    cookId: Scalars['String'];
};

export type CookMutationUpdateIsLockedArgs = {
    cookId: Scalars['String'];
    isLocked: Scalars['Boolean'];
};

export type CookMutationUpdateIsVisibleArgs = {
    cookId: Scalars['String'];
    isVisible: Scalars['Boolean'];
};

export type CookMutationUpdateLocationArgs = {
    cookId: Scalars['String'];
    location: LocationInput;
};

export type CookMutationUpdateMaximumParticipantsArgs = {
    cookId: Scalars['String'];
    maximumParticipants?: InputMaybe<Scalars['UnsignedInt']>;
};

export type CookMutationUpdateMaximumPriceArgs = {
    cookId: Scalars['String'];
    maximumPrice?: InputMaybe<Scalars['UnsignedInt']>;
};

export type CookMutationUpdateMaximumTravelDistanceArgs = {
    cookId: Scalars['String'];
    maximumTravelDistance?: InputMaybe<Scalars['UnsignedInt']>;
};

export type CookMutationUpdateMinimumParticipantsArgs = {
    cookId: Scalars['String'];
    minimumParticipants?: InputMaybe<Scalars['UnsignedInt']>;
};

export type CookMutationUpdateMinimumPriceArgs = {
    cookId: Scalars['String'];
    minimumPrice?: InputMaybe<Scalars['UnsignedInt']>;
};

export type CookMutationUpdateRankArgs = {
    cookId: Scalars['String'];
    rank: CookRank;
};

export type CookMutationUpdateTravelExpensesArgs = {
    cookId: Scalars['String'];
    travelExpenses: Scalars['UnsignedInt'];
};

export type CookQuery = {
    __typename?: 'CookQuery';
    bookingRequests: CookBookingRequestQuery;
    cookRatings: CookCookRatingQuery;
    cookVisits: UserAddressQuery;
    findMany: Array<Cook>;
    findOne?: Maybe<Cook>;
    followers: CookFollowingQuery;
    meals: CookMealQuery;
    menuVisits: UserAddressQuery;
    menus: MenuQuery;
    userRatings: CookUserRatingQuery;
};

export type CookQueryBookingRequestsArgs = {
    cookId: Scalars['String'];
};

export type CookQueryCookRatingsArgs = {
    cookId: Scalars['String'];
};

export type CookQueryCookVisitsArgs = {
    cookId: Scalars['String'];
};

export type CookQueryFindManyArgs = {
    request?: InputMaybe<FindManyRequest>;
};

export type CookQueryFindOneArgs = {
    cookId: Scalars['String'];
};

export type CookQueryMealsArgs = {
    cookId: Scalars['String'];
};

export type CookQueryMenuVisitsArgs = {
    cookId: Scalars['String'];
};

export type CookQueryMenusArgs = {
    cookId: Scalars['String'];
};

export type CookQueryUserRatingsArgs = {
    cookId: Scalars['String'];
};

export type CookRank = 'HOBBY' | 'MASTER' | 'PROFESSIONAL';

export type CookRating = {
    __typename?: 'CookRating';
    bookingRequest: BookingRequest;
    bookingRequestId: Scalars['String'];
    comment?: Maybe<Scalars['String']>;
    cook: PublicCook;
    cookId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    user: PublicUser;
    userId: Scalars['String'];
    value: Scalars['UnsignedInt'];
};

export type CookSpecificFee = {
    __typename?: 'CookSpecificFee';
    cookId: Scalars['String'];
};

export type CookSpecificFeeMutation = {
    __typename?: 'CookSpecificFeeMutation';
    createOne: Scalars['Boolean'];
};

export type CookSpecificFeeQuery = {
    __typename?: 'CookSpecificFeeQuery';
    findMany: Array<CookSpecificFee>;
    findOne?: Maybe<CookSpecificFee>;
};

export type CookSpecificFeeQueryFindManyArgs = {
    request?: InputMaybe<FindManyRequest>;
};

export type CookSpecificFeeQueryFindOneArgs = {
    cookId: Scalars['String'];
};

export type CookUserRatingQuery = {
    __typename?: 'CookUserRatingQuery';
    cookId: Scalars['String'];
    findMany: Array<UserRating>;
};

export type CookVisit = {
    __typename?: 'CookVisit';
    cook: PublicCook;
    cookId: Scalars['String'];
    cookVisitId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    session: AnonymousSession;
    sessionId: Scalars['String'];
};

export type Course = {
    __typename?: 'Course';
    courseId: Scalars['String'];
    mealOptionCount: Scalars['UnsignedInt'];
    mealOptions: Array<MealOption>;
    user: PublicUser;
};

export type CourseMutation = {
    __typename?: 'CourseMutation';
    mealOptions: MealOptionMutation;
};

export type CourseMutationMealOptionsArgs = {
    cookId: Scalars['String'];
};

export type CourseQuery = {
    __typename?: 'CourseQuery';
    mealOptions: MealOptionQuery;
};

export type CourseQueryMealOptionsArgs = {
    cookId: Scalars['String'];
};

export type CreateBookingRequestRequest = {
    adultParticipants: Scalars['UnsignedInt'];
    children: Scalars['UnsignedInt'];
    cookId: Scalars['String'];
    dateTime: Scalars['DateTime'];
    duration?: InputMaybe<Scalars['UnsignedInt']>;
    globalBookingRequestId?: InputMaybe<Scalars['String']>;
    latitude: Scalars['Latitude'];
    longitude: Scalars['Longitude'];
    occasion: Scalars['String'];
    preparationTime?: InputMaybe<Scalars['UnsignedInt']>;
    price: PriceInput;
    userId: Scalars['String'];
};

export type CreateOneAddressRequest = {
    city: Scalars['String'];
    country: Scalars['String'];
    houseNumber: Scalars['String'];
    location: LocationInput;
    postCode: Scalars['String'];
    street: Scalars['String'];
    title: Scalars['String'];
};

export type CreateOneAnonymousGlobalBookingRequestInput = {
    adults: Scalars['UnsignedInt'];
    budget: Scalars['String'];
    children: Scalars['UnsignedInt'];
    customerEmailAddress: Scalars['EmailAddress'];
    customerFirstName: Scalars['String'];
    customerLastName: Scalars['String'];
    customerPhoneNumber?: InputMaybe<Scalars['PhoneNumber']>;
    dateTime: Scalars['DateTime'];
    location?: InputMaybe<LocationInput>;
    locationName: Scalars['String'];
    message: Scalars['String'];
    occasion?: InputMaybe<Scalars['String']>;
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

export type CreateOneCourseRequest = {
    title: Scalars['String'];
};

export type CreateOneGlobalBookingRequestRequest = {
    adultParticipants: Scalars['UnsignedInt'];
    children: Scalars['UnsignedInt'];
    dateTime: Scalars['DateTime'];
    duration?: InputMaybe<Scalars['UnsignedInt']>;
    latitude: Scalars['Latitude'];
    longitude: Scalars['Longitude'];
    occasion: Scalars['String'];
    price: PriceInput;
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

export type CreateOneNotificationRequest = {
    message: Scalars['String'];
    url?: InputMaybe<Scalars['URL']>;
};

export type CreateOnePrivacyPolicyUpdateRequest = {
    englishText: Scalars['String'];
    germanText: Scalars['String'];
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

export type CreateOneTermsUpdateRequest = {
    englishText: Scalars['String'];
    germanText: Scalars['String'];
};

export type CreateOneUserByEmailAddressRequest = {
    birthDate?: InputMaybe<Scalars['Date']>;
    cook?: InputMaybe<CreateOneCookRequest>;
    emailAddress: Scalars['EmailAddress'];
    firstName: Scalars['String'];
    gender: Gender;
    language: UserLanguage;
    lastName: Scalars['String'];
    password: Scalars['String'];
    profilePictureUrl?: InputMaybe<Scalars['URL']>;
};

export type CreateOneUserByIdentityProviderRequest = {
    birthDate?: InputMaybe<Scalars['Date']>;
    cook?: InputMaybe<CreateOneCookRequest>;
    firstName: Scalars['String'];
    gender: Gender;
    idToken: Scalars['String'];
    identityProvider: IdentityProvider;
    language: UserLanguage;
    lastName: Scalars['String'];
    profilePictureUrl?: InputMaybe<Scalars['URL']>;
};

export type CreateOneUserByPhoneNumberRequest = {
    birthDate?: InputMaybe<Scalars['Date']>;
    cook?: InputMaybe<CreateOneCookRequest>;
    firstName: Scalars['String'];
    gender: Gender;
    language: UserLanguage;
    lastName: Scalars['String'];
    password: Scalars['String'];
    phoneNumber: Scalars['PhoneNumber'];
    profilePictureUrl?: InputMaybe<Scalars['URL']>;
};

export type CurrencyCode = 'EUR' | 'USD';

export type CustomerFeeUpdate = {
    __typename?: 'CustomerFeeUpdate';
    adminId: Scalars['String'];
    user: PublicUser;
};

export type CustomerFeeUpdateMutation = {
    __typename?: 'CustomerFeeUpdateMutation';
    createOne: Scalars['Boolean'];
};

export type CustomerFeeUpdateQuery = {
    __typename?: 'CustomerFeeUpdateQuery';
    findMany: Array<Admin>;
    findOne?: Maybe<Admin>;
};

export type CustomerFeeUpdateQueryFindManyArgs = {
    request?: InputMaybe<FindManyRequest>;
};

export type CustomerFeeUpdateQueryFindOneArgs = {
    adminId: Scalars['String'];
};

export type EmailAddressUpdate = {
    __typename?: 'EmailAddressUpdate';
    createdAt: Scalars['DateTime'];
    emailAddress: Scalars['EmailAddress'];
    userId: Scalars['String'];
};

export type ExpireOneSessionRequest = {
    sessionId: Scalars['String'];
    userId: Scalars['String'];
};

export type FindManyPublicCooksRequest = {
    adultParticipants: Scalars['UnsignedInt'];
    categoryIds?: InputMaybe<Array<Scalars['String']>>;
    children?: InputMaybe<Scalars['UnsignedInt']>;
    dateTime: Scalars['DateTime'];
    kitchenIds?: InputMaybe<Array<Scalars['String']>>;
    location: LocationInput;
    price?: InputMaybe<PriceInput>;
    searchText?: InputMaybe<Scalars['String']>;
    skip?: InputMaybe<Scalars['UnsignedInt']>;
    take?: InputMaybe<Scalars['UnsignedInt']>;
};

export type FindManyPublicMenusRequest = {
    adultParticipants: Scalars['UnsignedInt'];
    categoryIds?: InputMaybe<Array<Scalars['String']>>;
    children?: InputMaybe<Scalars['UnsignedInt']>;
    dateTime: Scalars['DateTime'];
    kitchenIds?: InputMaybe<Array<Scalars['String']>>;
    location: LocationInput;
    price?: InputMaybe<PriceInput>;
    searchText?: InputMaybe<Scalars['String']>;
    skip?: InputMaybe<Scalars['UnsignedInt']>;
    take?: InputMaybe<Scalars['UnsignedInt']>;
};

export type FindManyRequest = {
    searchText?: InputMaybe<Scalars['String']>;
    skip?: InputMaybe<Scalars['UnsignedInt']>;
    take?: InputMaybe<Scalars['UnsignedInt']>;
};

export type Following = {
    __typename?: 'Following';
    cook: PublicCook;
    cookId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    user: AnonymousUser;
    userId: Scalars['String'];
};

export type Gender = 'DIVERSE' | 'FEMALE' | 'MALE' | 'NO_INFORMATION';

export type GlobalBookingRequest = {
    __typename?: 'GlobalBookingRequest';
    adultParticipants: Scalars['UnsignedInt'];
    allergies: Array<Allergy>;
    children: Scalars['UnsignedInt'];
    createdAt: Scalars['DateTime'];
    dateTime: Scalars['DateTime'];
    duration?: Maybe<Scalars['UnsignedInt']>;
    globalBookingRequestId: Scalars['String'];
    latitude: Scalars['Latitude'];
    longitude: Scalars['Longitude'];
    occasion: Scalars['String'];
    price: Price;
    user: PublicUser;
    userId: Scalars['String'];
};

export type GlobalBookingRequestMutation = {
    __typename?: 'GlobalBookingRequestMutation';
    acceptGlobalBookingRequest: Scalars['Boolean'];
};

export type GlobalBookingRequestMutationAcceptGlobalBookingRequestArgs = {
    globalBookingRequestId: Scalars['String'];
};

export type GlobalBookingRequestQuery = {
    __typename?: 'GlobalBookingRequestQuery';
    findMany: Array<GlobalBookingRequest>;
    findOne?: Maybe<GlobalBookingRequest>;
};

export type GlobalBookingRequestQueryFindManyArgs = {
    request?: InputMaybe<FindManyRequest>;
};

export type GlobalBookingRequestQueryFindOneArgs = {
    globalBookingRequestId: Scalars['String'];
};

export type IdentityProvider = 'APPLE' | 'GOOGLE';

export type Kitchen = {
    __typename?: 'Kitchen';
    kitchenId: Scalars['String'];
    title: Scalars['String'];
};

export type KitchenMutation = {
    __typename?: 'KitchenMutation';
    createOne: Scalars['Boolean'];
};

export type KitchenQuery = {
    __typename?: 'KitchenQuery';
    findAll: Array<Kitchen>;
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

export type LanguageQuery = {
    __typename?: 'LanguageQuery';
    findAll: Array<Language>;
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

export type MealOption = {
    __typename?: 'MealOption';
    meal: Meal;
    mealId: Scalars['String'];
    mealOptionId: Scalars['String'];
};

export type MealOptionMutation = {
    __typename?: 'MealOptionMutation';
    cookId: Scalars['String'];
    createOne: Scalars['Boolean'];
    menuId: Scalars['String'];
};

export type MealOptionQuery = {
    __typename?: 'MealOptionQuery';
    cookId: Scalars['String'];
    findMany: Array<MealOption>;
    findOne?: Maybe<MealOption>;
    menuId: Scalars['String'];
};

export type MealOptionQueryFindManyArgs = {
    request?: InputMaybe<FindManyRequest>;
};

export type MealOptionQueryFindOneArgs = {
    mealOptionId: Scalars['String'];
};

export type MealType = 'DESSERT' | 'MAIN_COURSE' | 'STARTER';

export type Menu = {
    __typename?: 'Menu';
    basePrice: Scalars['UnsignedInt'];
    basePriceCustomers: Scalars['UnsignedInt'];
    categories: Array<Category>;
    cook: Cook;
    cookId: Scalars['String'];
    courseCount: Scalars['UnsignedInt'];
    courses: Array<Course>;
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

export type MenuConfiguration = {
    __typename?: 'MenuConfiguration';
    bookingRequestId: Scalars['String'];
    categories: Array<Category>;
    categoryIds: Array<Scalars['String']>;
    courses: Array<MenuConfigurationCourse>;
    greetingsFromKitchen: Scalars['Boolean'];
    kitchen: Kitchen;
    kitchenId: Scalars['String'];
    menuDescription: Scalars['String'];
    menuId: Scalars['String'];
    menuTitle: Scalars['String'];
};

export type MenuConfigurationCourse = {
    __typename?: 'MenuConfigurationCourse';
    courseTitle: Scalars['String'];
    mealDescription: Scalars['String'];
    mealImageUrl: Scalars['URL'];
    mealTitle: Scalars['String'];
    mealType: MealType;
};

export type MenuMutation = {
    __typename?: 'MenuMutation';
    cookId: Scalars['String'];
    courses: CookMenuCourseMutation;
    createOne: Scalars['Boolean'];
};

export type MenuMutationCoursesArgs = {
    menuId: Scalars['String'];
};

export type MenuMutationCreateOneArgs = {
    menu: CreateOneMenuRequest;
};

export type MenuQuery = {
    __typename?: 'MenuQuery';
    cookId: Scalars['String'];
    courses: CookMenuCourseQuery;
    findMany: Array<Menu>;
    findOne?: Maybe<Menu>;
};

export type MenuQueryCoursesArgs = {
    menuId: Scalars['String'];
};

export type MenuQueryFindManyArgs = {
    request?: InputMaybe<FindManyRequest>;
};

export type MenuQueryFindOneArgs = {
    menuId: Scalars['String'];
};

export type MenuVisit = {
    __typename?: 'MenuVisit';
    createdAt: Scalars['DateTime'];
    menu: PublicMenu;
    menuId: Scalars['String'];
    menuVisitId: Scalars['String'];
    session: AnonymousSession;
    sessionId: Scalars['String'];
};

export type Mutation = {
    __typename?: 'Mutation';
    admins: AdminMutation;
    allergies: AllergyMutation;
    categories: CategoryMutation;
    cookSpecificFees: CookSpecificFeeMutation;
    cooks: CookMutation;
    createOneAnonymousGlobalBookingRequest: Scalars['Boolean'];
    customerFeeUpdates: CustomerFeeUpdateMutation;
    globalBookingRequests: GlobalBookingRequestMutation;
    kitchens: KitchenMutation;
    languages: LanguageMutation;
    notifications: NotificationMutation;
    privacyPolicyUpdates: PrivacyPolicyUpdateMutation;
    sessions: SessionMutation;
    termsUpdates: TermsUpdateMutation;
    users: UserMutation;
};

export type MutationCreateOneAnonymousGlobalBookingRequestArgs = {
    input: CreateOneAnonymousGlobalBookingRequestInput;
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
    emailsForAccount: Scalars['Boolean'];
    emailsForBookingRequests: Scalars['Boolean'];
    emailsForFavoriteCooks: Scalars['Boolean'];
    emailsForOffers: Scalars['Boolean'];
    pushesForAccount: Scalars['Boolean'];
    pushesForBookingRequests: Scalars['Boolean'];
    pushesForFavoriteCooks: Scalars['Boolean'];
    pushesForOffers: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type NotificationConfigurationMutation = {
    __typename?: 'NotificationConfigurationMutation';
    update: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type NotificationConfigurationQuery = {
    __typename?: 'NotificationConfigurationQuery';
    findOne: NotificationConfiguration;
    userId: Scalars['String'];
};

export type NotificationMutation = {
    __typename?: 'NotificationMutation';
    createOne: Scalars['Boolean'];
};

export type NotificationMutationCreateOneArgs = {
    request: CreateOneNotificationRequest;
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

export type PaymentProvider = 'STRIPE';

export type PhoneNumberUpdate = {
    __typename?: 'PhoneNumberUpdate';
    createdAt: Scalars['DateTime'];
    phoneNumber: Scalars['PhoneNumber'];
    userId: Scalars['String'];
};

export type Platform = 'ANDROID' | 'BROWSER' | 'IOS' | 'UNKNOWN';

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
    createdAt: Scalars['DateTime'];
    englishText: Scalars['String'];
    germanText: Scalars['String'];
    privacyPolicyUpdateId: Scalars['String'];
};

export type PrivacyPolicyUpdateMutation = {
    __typename?: 'PrivacyPolicyUpdateMutation';
    createOne: Scalars['Boolean'];
};

export type PrivacyPolicyUpdateMutationCreateOneArgs = {
    request: CreateOnePrivacyPolicyUpdateRequest;
};

export type PrivacyPolicyUpdateQuery = {
    __typename?: 'PrivacyPolicyUpdateQuery';
    findAll: Array<PrivacyPolicyUpdate>;
    findLatest?: Maybe<PrivacyPolicyUpdate>;
    findOne?: Maybe<PrivacyPolicyUpdate>;
};

export type PrivacyPolicyUpdateQueryFindOneArgs = {
    privacyPolicyUpdateId: Scalars['String'];
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
    minimumParticipants?: Maybe<Scalars['UnsignedInt']>;
    minimumPrice?: Maybe<Scalars['UnsignedInt']>;
    rank: CookRank;
    travelExpenses: Scalars['UnsignedInt'];
    user: PublicUser;
};

export type PublicCookQuery = {
    __typename?: 'PublicCookQuery';
    findMany: Array<PublicCook>;
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
    findMany: Array<PublicMenu>;
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
    createdAt: Scalars['DateTime'];
    englishText: Scalars['String'];
    germanText: Scalars['String'];
    privacyPolicyUpdateId: Scalars['String'];
};

export type PublicPrivacyPolicyUpdateQuery = {
    __typename?: 'PublicPrivacyPolicyUpdateQuery';
    findAll: Array<PublicPrivacyPolicyUpdate>;
    findLatest?: Maybe<PublicPrivacyPolicyUpdate>;
    findOne?: Maybe<PublicPrivacyPolicyUpdate>;
};

export type PublicPrivacyPolicyUpdateQueryFindOneArgs = {
    privacyPolicyUpdateId: Scalars['String'];
};

export type PublicTermsUpdate = {
    __typename?: 'PublicTermsUpdate';
    createdAt: Scalars['DateTime'];
    englishText: Scalars['String'];
    germanText: Scalars['String'];
    termsUpdateId: Scalars['String'];
};

export type PublicTermsUpdateQuery = {
    __typename?: 'PublicTermsUpdateQuery';
    findAll: Array<PublicTermsUpdate>;
    findLatest?: Maybe<PublicTermsUpdate>;
    findOne?: Maybe<PublicTermsUpdate>;
};

export type PublicTermsUpdateQueryFindOneArgs = {
    termsUpdateId: Scalars['String'];
};

export type PublicUser = {
    __typename?: 'PublicUser';
    createdAt: Scalars['DateTime'];
    firstName: Scalars['String'];
    language: UserLanguage;
    profilePictureUrl?: Maybe<Scalars['URL']>;
    userId: Scalars['String'];
};

export type Query = {
    __typename?: 'Query';
    admins: AdminQuery;
    allergies: AllergyQuery;
    categories: CategoryQuery;
    cookSpecificFees: CookSpecificFeeQuery;
    cooks: CookQuery;
    customerFeeUpdates: CustomerFeeUpdateQuery;
    globalBookingRequests: GlobalBookingRequestQuery;
    kitchens: KitchenQuery;
    languages: LanguageQuery;
    privacyPolicyUpdates: PrivacyPolicyUpdateQuery;
    publicCooks: PublicCookQuery;
    publicMenus: MenuQuery;
    publicPrivacyPolicyUpdates: PublicPrivacyPolicyUpdateQuery;
    publicTermsUpdates: PublicTermsUpdateQuery;
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

export type TermsUpdate = {
    __typename?: 'TermsUpdate';
    admin: Admin;
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

export type TermsUpdateMutationCreateOneArgs = {
    request: CreateOneTermsUpdateRequest;
};

export type TermsUpdateQuery = {
    __typename?: 'TermsUpdateQuery';
    findAll: Array<TermsUpdate>;
    findLatest?: Maybe<TermsUpdate>;
    findOne?: Maybe<TermsUpdate>;
};

export type TermsUpdateQueryFindOneArgs = {
    termsUpdateId: Scalars['String'];
};

export type User = {
    __typename?: 'User';
    acceptedPrivacyPolicy: Scalars['DateTime'];
    acceptedTerms: Scalars['DateTime'];
    activeSessionCount: Scalars['UnsignedInt'];
    activeSessions: Array<Session>;
    addressCount: Scalars['UnsignedInt'];
    addresses: Array<Address>;
    admin?: Maybe<Admin>;
    birthDate?: Maybe<Scalars['Date']>;
    bookingRequests: Array<BookingRequest>;
    cook?: Maybe<Cook>;
    createdAt: Scalars['DateTime'];
    emailAddress?: Maybe<Scalars['EmailAddress']>;
    emailAddressUpdate?: Maybe<EmailAddressUpdate>;
    firstName: Scalars['String'];
    followingCount: Scalars['UnsignedInt'];
    followings: Array<Following>;
    gender: Gender;
    isAdmin: Scalars['Boolean'];
    isCook: Scalars['Boolean'];
    isLocked: Scalars['Boolean'];
    language: UserLanguage;
    lastName: Scalars['String'];
    notificationConfiguration: NotificationConfiguration;
    notifications: Array<Notification>;
    oneTimeAccessToken?: Maybe<OneTimeAccessToken>;
    phoneNumber?: Maybe<Scalars['PhoneNumber']>;
    phoneNumberUpdate?: Maybe<PhoneNumberUpdate>;
    profilePictureUrl?: Maybe<Scalars['URL']>;
    unreadNotificationCount: Scalars['UnsignedInt'];
    userId: Scalars['String'];
};

export type UserAddressMutation = {
    __typename?: 'UserAddressMutation';
    createOne: Scalars['Boolean'];
    deleteOne: Scalars['Boolean'];
    updateCity: Scalars['Boolean'];
    updateCountry: Scalars['Boolean'];
    updateHouseNumber: Scalars['Boolean'];
    updatePostCode: Scalars['Boolean'];
    updateStreet: Scalars['Boolean'];
    updateTitle: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type UserAddressMutationCreateOneArgs = {
    address: CreateOneAddressRequest;
};

export type UserAddressMutationDeleteOneArgs = {
    addressId: Scalars['String'];
};

export type UserAddressMutationUpdateCityArgs = {
    addressId: Scalars['String'];
    city: Scalars['String'];
};

export type UserAddressMutationUpdateCountryArgs = {
    addressId: Scalars['String'];
    country: Scalars['String'];
};

export type UserAddressMutationUpdateHouseNumberArgs = {
    addressId: Scalars['String'];
    houseNumber: Scalars['String'];
};

export type UserAddressMutationUpdatePostCodeArgs = {
    addressId: Scalars['String'];
    postCode: Scalars['String'];
};

export type UserAddressMutationUpdateStreetArgs = {
    addressId: Scalars['String'];
    street: Scalars['String'];
};

export type UserAddressMutationUpdateTitleArgs = {
    addressId: Scalars['String'];
    title: Scalars['String'];
};

export type UserAddressQuery = {
    __typename?: 'UserAddressQuery';
    findMany?: Maybe<Array<Address>>;
    userId: Scalars['String'];
};

export type UserAddressQueryFindManyArgs = {
    request?: InputMaybe<FindManyRequest>;
};

export type UserBookingRequestMutation = {
    __typename?: 'UserBookingRequestMutation';
    acceptBookingRequest: Scalars['Boolean'];
    declineBookingRequest: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type UserBookingRequestMutationAcceptBookingRequestArgs = {
    bookingRequestId: Scalars['String'];
};

export type UserBookingRequestMutationDeclineBookingRequestArgs = {
    bookingRequestId: Scalars['String'];
};

export type UserBookingRequestQuery = {
    __typename?: 'UserBookingRequestQuery';
    findMany: Array<BookingRequest>;
    findOne?: Maybe<BookingRequest>;
    userId: Scalars['String'];
};

export type UserBookingRequestQueryFindManyArgs = {
    request?: InputMaybe<FindManyRequest>;
};

export type UserBookingRequestQueryFindOneArgs = {
    bookingRequestId: Scalars['String'];
};

export type UserCookRatingQuery = {
    __typename?: 'UserCookRatingQuery';
    findMany: Array<CookRating>;
    userId: Scalars['String'];
};

export type UserCookVisitQuery = {
    __typename?: 'UserCookVisitQuery';
    findMany?: Maybe<Array<Address>>;
    userId: Scalars['String'];
};

export type UserCookVisitQueryFindManyArgs = {
    request?: InputMaybe<FindManyRequest>;
};

export type UserEmailAddressUpdateMutation = {
    __typename?: 'UserEmailAddressUpdateMutation';
    confirm: Scalars['Boolean'];
    createOne: Scalars['Boolean'];
    deleteOne: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type UserEmailAddressUpdateMutationConfirmArgs = {
    secret: Scalars['String'];
};

export type UserEmailAddressUpdateMutationCreateOneArgs = {
    emailAddress: Scalars['EmailAddress'];
};

export type UserEmailAddressUpdateQuery = {
    __typename?: 'UserEmailAddressUpdateQuery';
    findOne?: Maybe<EmailAddressUpdate>;
    userId: Scalars['String'];
};

export type UserFollowingMutation = {
    __typename?: 'UserFollowingMutation';
    createOne: Scalars['Boolean'];
    deleteOne: Scalars['Boolean'];
};

export type UserFollowingMutationCreateOneArgs = {
    cookId: Scalars['String'];
};

export type UserFollowingMutationDeleteOneArgs = {
    cookId: Scalars['String'];
};

export type UserFollowingQuery = {
    __typename?: 'UserFollowingQuery';
    findAll: Array<Following>;
};

export type UserGlobalBookingRequestMutation = {
    __typename?: 'UserGlobalBookingRequestMutation';
    createOne: Scalars['Boolean'];
};

export type UserGlobalBookingRequestMutationCreateOneArgs = {
    request: Scalars['String'];
    userId: Scalars['String'];
};

export type UserLanguage = 'ENGLISH' | 'GERMAN';

export type UserMenuVisitQuery = {
    __typename?: 'UserMenuVisitQuery';
    findMany?: Maybe<Array<Address>>;
    userId: Scalars['String'];
};

export type UserMenuVisitQueryFindManyArgs = {
    request?: InputMaybe<FindManyRequest>;
};

export type UserMutation = {
    __typename?: 'UserMutation';
    acceptLatestPrivacyPolicy: Scalars['Boolean'];
    acceptLatestTerms: Scalars['Boolean'];
    addresses: UserAddressMutation;
    bookingRequests: UserBookingRequestMutation;
    createOneByEmailAddress: Scalars['Boolean'];
    createOneByIdentityProvider: Scalars['Boolean'];
    createOneByPhoneNumber: Scalars['Boolean'];
    emailAddressUpdate: UserEmailAddressUpdateMutation;
    followings: UserFollowingMutation;
    globalBookingRequests: UserGlobalBookingRequestMutation;
    notificationConfiguration: NotificationConfigurationMutation;
    notifications: UserNotificationMutation;
    oneTimeAccessToken: UserOneTimeAccessTokenMutation;
    phoneNumberUpdate: UserPhoneNumberUpdateMutation;
    sessions: UserSessionMutation;
    updateGender: Scalars['Boolean'];
    updateIsLocked: Scalars['Boolean'];
    updatePassword: Scalars['Boolean'];
    updateProfilePicture: Scalars['Boolean'];
};

export type UserMutationAddressesArgs = {
    userId: Scalars['String'];
};

export type UserMutationBookingRequestsArgs = {
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

export type UserMutationEmailAddressUpdateArgs = {
    userId: Scalars['String'];
};

export type UserMutationNotificationConfigurationArgs = {
    userId: Scalars['String'];
};

export type UserMutationNotificationsArgs = {
    userId: Scalars['String'];
};

export type UserMutationOneTimeAccessTokenArgs = {
    userId: Scalars['String'];
};

export type UserMutationPhoneNumberUpdateArgs = {
    userId: Scalars['String'];
};

export type UserMutationSessionsArgs = {
    userId: Scalars['String'];
};

export type UserMutationUpdateGenderArgs = {
    gender: Gender;
    userId: Scalars['String'];
};

export type UserMutationUpdateIsLockedArgs = {
    isLocked: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type UserMutationUpdatePasswordArgs = {
    password: Scalars['String'];
    userId: Scalars['String'];
};

export type UserMutationUpdateProfilePictureArgs = {
    profilePictureUrl?: InputMaybe<Scalars['URL']>;
    userId: Scalars['String'];
};

export type UserNotificationMutation = {
    __typename?: 'UserNotificationMutation';
    deleteAll: Scalars['Boolean'];
    deleteOne: Scalars['Boolean'];
    updateAllWasRead: Scalars['Boolean'];
    updateOneWasRead: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type UserNotificationMutationDeleteOneArgs = {
    notificationId: Scalars['String'];
};

export type UserNotificationMutationUpdateAllWasReadArgs = {
    wasRead: Scalars['Boolean'];
};

export type UserNotificationMutationUpdateOneWasReadArgs = {
    notificationId: Scalars['String'];
    wasRead: Scalars['Boolean'];
};

export type UserOneTimeAccessTokenMutation = {
    __typename?: 'UserOneTimeAccessTokenMutation';
    confirm: Scalars['Boolean'];
    createOneForEmailAddress: Scalars['Boolean'];
    createOneForPhoneNumber: Scalars['Boolean'];
    deleteOne: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type UserOneTimeAccessTokenMutationConfirmArgs = {
    secret: Scalars['String'];
};

export type UserOneTimeAccessTokenMutationCreateOneForEmailAddressArgs = {
    emailAddress: Scalars['EmailAddress'];
};

export type UserOneTimeAccessTokenMutationCreateOneForPhoneNumberArgs = {
    phoneNumber: Scalars['PhoneNumber'];
};

export type UserOneTimeAccessTokenQuery = {
    __typename?: 'UserOneTimeAccessTokenQuery';
    findOne?: Maybe<OneTimeAccessToken>;
    userId: Scalars['String'];
};

export type UserPhoneNumberUpdateMutation = {
    __typename?: 'UserPhoneNumberUpdateMutation';
    confirm: Scalars['Boolean'];
    createOne: Scalars['Boolean'];
    deleteOne: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type UserPhoneNumberUpdateMutationConfirmArgs = {
    secret: Scalars['String'];
};

export type UserPhoneNumberUpdateMutationCreateOneArgs = {
    phoneNumber: Scalars['PhoneNumber'];
};

export type UserPhoneNumberUpdateQuery = {
    __typename?: 'UserPhoneNumberUpdateQuery';
    findOne?: Maybe<PhoneNumberUpdate>;
    userId: Scalars['String'];
};

export type UserQuery = {
    __typename?: 'UserQuery';
    addresses: UserAddressQuery;
    bookingRequests: UserBookingRequestQuery;
    cookRatings: UserCookRatingQuery;
    cookVisits: UserAddressQuery;
    emailAddressUpdate: UserEmailAddressUpdateQuery;
    findMany?: Maybe<Array<User>>;
    findOne?: Maybe<User>;
    followings: UserFollowingQuery;
    me?: Maybe<User>;
    menuVisits: UserAddressQuery;
    notificationConfiguration?: Maybe<NotificationConfigurationQuery>;
    notifications: NotificationQuery;
    oneTimeAccessToken: UserOneTimeAccessTokenQuery;
    phoneNumberUpdate: UserPhoneNumberUpdateQuery;
    sessions: UserSessionQuery;
    userRatings: UserUserRatingQuery;
};

export type UserQueryAddressesArgs = {
    userId: Scalars['String'];
};

export type UserQueryBookingRequestsArgs = {
    userId: Scalars['String'];
};

export type UserQueryCookRatingsArgs = {
    userId: Scalars['String'];
};

export type UserQueryCookVisitsArgs = {
    userId: Scalars['String'];
};

export type UserQueryEmailAddressUpdateArgs = {
    userId: Scalars['String'];
};

export type UserQueryFindManyArgs = {
    request: FindManyRequest;
};

export type UserQueryFindOneArgs = {
    userId: Scalars['String'];
};

export type UserQueryMenuVisitsArgs = {
    userId: Scalars['String'];
};

export type UserQueryNotificationConfigurationArgs = {
    userId: Scalars['String'];
};

export type UserQueryNotificationsArgs = {
    userId: Scalars['String'];
};

export type UserQueryOneTimeAccessTokenArgs = {
    userId: Scalars['String'];
};

export type UserQueryPhoneNumberUpdateArgs = {
    userId: Scalars['String'];
};

export type UserQuerySessionsArgs = {
    userId: Scalars['String'];
};

export type UserQueryUserRatingsArgs = {
    userId: Scalars['String'];
};

export type UserRating = {
    __typename?: 'UserRating';
    bookingRequest: BookingRequest;
    bookingRequestId: Scalars['String'];
    comment?: Maybe<Scalars['String']>;
    cook: PublicCook;
    cookId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    user: PublicUser;
    userId: Scalars['String'];
    value: Scalars['UnsignedInt'];
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

export type UserSessionQuery = {
    __typename?: 'UserSessionQuery';
    findMany?: Maybe<Array<Session>>;
    userId: Scalars['String'];
};

export type UserUserRatingQuery = {
    __typename?: 'UserUserRatingQuery';
    findMany: Array<UserRating>;
    userId: Scalars['String'];
};

export type AssignOneSessionByEmailAddressMutationVariables = Exact<{
    request: CreateOneSessionByEmailAddressRequest;
}>;

export type AssignOneSessionByEmailAddressMutation = {
    __typename?: 'Mutation';
    sessions: { __typename?: 'SessionMutation'; success: boolean };
};

export type CreateOneUserByEmailAddressMutationVariables = Exact<{
    request: CreateOneUserByEmailAddressRequest;
}>;

export type CreateOneUserByEmailAddressMutation = { __typename?: 'Mutation'; users: { __typename?: 'UserMutation'; success: boolean } };

export type FindAllergiesQueryVariables = Exact<{ [key: string]: never }>;

export type FindAllergiesQuery = {
    __typename?: 'Query';
    allergies: { __typename?: 'AllergyQuery'; findAll: Array<{ __typename?: 'Allergy'; allergyId: string; title: string }> };
};

export type FindCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type FindCategoriesQuery = {
    __typename?: 'Query';
    categories: { __typename?: 'CategoryQuery'; findAll: Array<{ __typename?: 'Category'; categoryId: string; title: string }> };
};

export type FindKitchensQueryVariables = Exact<{ [key: string]: never }>;

export type FindKitchensQuery = {
    __typename?: 'Query';
    kitchens: { __typename?: 'KitchenQuery'; findAll: Array<{ __typename?: 'Kitchen'; kitchenId: string; title: string }> };
};

export type FindLatestPublicTermsUpdateQueryVariables = Exact<{ [key: string]: never }>;

export type FindLatestPublicTermsUpdateQuery = {
    __typename?: 'Query';
    publicTermsUpdates: {
        __typename?: 'PublicTermsUpdateQuery';
        findLatest?: {
            __typename?: 'PublicTermsUpdate';
            termsUpdateId: string;
            englishText: string;
            germanText: string;
            createdAt: Date;
        } | null;
    };
};

export type FindManyAdminsQueryVariables = Exact<{ [key: string]: never }>;

export type FindManyAdminsQuery = {
    __typename?: 'Query';
    admins: {
        __typename?: 'AdminQuery';
        findMany: Array<{ __typename?: 'Admin'; adminId: string; user: { __typename?: 'PublicUser'; firstName: string; createdAt: Date } }>;
    };
};

export type FindManyCooksQueryVariables = Exact<{ [key: string]: never }>;

export type FindManyCooksQuery = {
    __typename?: 'Query';
    cooks: {
        __typename?: 'CookQuery';
        findMany: Array<{
            __typename?: 'Cook';
            cookId: string;
            rank: CookRank;
            isLocked: boolean;
            biography: string;
            user: { __typename?: 'User'; firstName: string; lastName: string };
        }>;
    };
};

export type FindManyUsersQueryVariables = Exact<{
    request: FindManyRequest;
}>;

export type FindManyUsersQuery = {
    __typename?: 'Query';
    users: {
        __typename?: 'UserQuery';
        findMany?: Array<{
            __typename?: 'User';
            userId: string;
            firstName: string;
            lastName: string;
            language: UserLanguage;
            isCook: boolean;
            isAdmin: boolean;
        }> | null;
    };
};

export type GetProfileQueryQueryVariables = Exact<{ [key: string]: never }>;

export type GetProfileQueryQuery = {
    __typename?: 'Query';
    users: { __typename?: 'UserQuery'; me?: { __typename?: 'User'; firstName: string } | null };
};

export const AssignOneSessionByEmailAddressDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'AssignOneSessionByEmailAddress' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateOneSessionByEmailAddressRequest' } },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sessions' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'success' },
                                    name: { kind: 'Name', value: 'assignOneByEmailAddress' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'request' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<AssignOneSessionByEmailAddressMutation, AssignOneSessionByEmailAddressMutationVariables>;
export const CreateOneUserByEmailAddressDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'CreateOneUserByEmailAddress' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateOneUserByEmailAddressRequest' } },
                    },
                },
            ],
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
                                    alias: { kind: 'Name', value: 'success' },
                                    name: { kind: 'Name', value: 'createOneByEmailAddress' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'request' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<CreateOneUserByEmailAddressMutation, CreateOneUserByEmailAddressMutationVariables>;
export const FindAllergiesDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'FindAllergies' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'allergies' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'findAll' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'allergyId' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<FindAllergiesQuery, FindAllergiesQueryVariables>;
export const FindCategoriesDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'FindCategories' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'categories' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'findAll' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'categoryId' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<FindCategoriesQuery, FindCategoriesQueryVariables>;
export const FindKitchensDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'FindKitchens' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'kitchens' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'findAll' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'kitchenId' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<FindKitchensQuery, FindKitchensQueryVariables>;
export const FindLatestPublicTermsUpdateDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'FindLatestPublicTermsUpdate' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'publicTermsUpdates' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'findLatest' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'termsUpdateId' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'englishText' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'germanText' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<FindLatestPublicTermsUpdateQuery, FindLatestPublicTermsUpdateQueryVariables>;
export const FindManyAdminsDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'FindManyAdmins' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'admins' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'findMany' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'adminId' } },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'user' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<FindManyAdminsQuery, FindManyAdminsQueryVariables>;
export const FindManyCooksDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'FindManyCooks' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'cooks' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'findMany' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'cookId' } },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'user' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                                    ],
                                                },
                                            },
                                            { kind: 'Field', name: { kind: 'Name', value: 'rank' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'isLocked' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'biography' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<FindManyCooksQuery, FindManyCooksQueryVariables>;
export const FindManyUsersDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'FindManyUsers' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'FindManyRequest' } } },
                },
            ],
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
                                    name: { kind: 'Name', value: 'findMany' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'request' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'language' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'isCook' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'isAdmin' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<FindManyUsersQuery, FindManyUsersQueryVariables>;
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
