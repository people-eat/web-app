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
    URL: string;
    /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
    UUID: string;
    /** Integers that will have a value of 0 or more. */
    UnsignedInt: number;
    /** The `Upload` scalar type represents a file upload. */
    Upload: File;
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

export type AdminMutationCreateOneArgs = {
    request: CreateOneAdminRequest;
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
    ratingAverage: Scalars['UnsignedInt'];
    ratingCount: Scalars['UnsignedInt'];
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
    deleteOne: Scalars['Boolean'];
    updateDescription: Scalars['Boolean'];
    updateImage: Scalars['Boolean'];
    updateTitle: Scalars['Boolean'];
    updateType: Scalars['Boolean'];
};

export type CookMealMutationCreateOneArgs = {
    image?: InputMaybe<Scalars['Upload']>;
    meal: CreateOneMealRequest;
};

export type CookMealMutationDeleteOneArgs = {
    mealId: Scalars['String'];
};

export type CookMealMutationUpdateDescriptionArgs = {
    description: Scalars['String'];
    mealId: Scalars['String'];
};

export type CookMealMutationUpdateImageArgs = {
    image?: InputMaybe<Scalars['Upload']>;
    mealId: Scalars['String'];
};

export type CookMealMutationUpdateTitleArgs = {
    mealId: Scalars['String'];
    title: Scalars['String'];
};

export type CookMealMutationUpdateTypeArgs = {
    mealId: Scalars['String'];
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

export type CookMenuMutation = {
    __typename?: 'CookMenuMutation';
    cookId: Scalars['String'];
    createOne: Scalars['Boolean'];
    deleteOne: Scalars['Boolean'];
    updateBasePrice: Scalars['Boolean'];
    updateBasePriceCustomers: Scalars['Boolean'];
    updateCurrencyCode: Scalars['Boolean'];
    updateDescription: Scalars['Boolean'];
    updateGreetingFromKitchen: Scalars['Boolean'];
    updateIsVisible: Scalars['Boolean'];
    updateKitchenId: Scalars['Boolean'];
    updatePreparationTime: Scalars['Boolean'];
    updatePricePerAdult: Scalars['Boolean'];
    updatePricePerChild: Scalars['Boolean'];
    updateTitle: Scalars['Boolean'];
};

export type CookMenuMutationCreateOneArgs = {
    menu: CreateOneMenuRequest;
};

export type CookMenuMutationDeleteOneArgs = {
    menuId: Scalars['String'];
};

export type CookMenuMutationUpdateBasePriceArgs = {
    basePrice: Scalars['UnsignedInt'];
    menuId: Scalars['String'];
};

export type CookMenuMutationUpdateBasePriceCustomersArgs = {
    basePriceCustomers: Scalars['UnsignedInt'];
    menuId: Scalars['String'];
};

export type CookMenuMutationUpdateCurrencyCodeArgs = {
    currencyCode: CurrencyCode;
    menuId: Scalars['String'];
};

export type CookMenuMutationUpdateDescriptionArgs = {
    description: Scalars['String'];
    menuId: Scalars['String'];
};

export type CookMenuMutationUpdateGreetingFromKitchenArgs = {
    greetingFromKitchen?: InputMaybe<Scalars['String']>;
    menuId: Scalars['String'];
};

export type CookMenuMutationUpdateIsVisibleArgs = {
    isVisible: Scalars['Boolean'];
    menuId: Scalars['String'];
};

export type CookMenuMutationUpdateKitchenIdArgs = {
    kitchenId?: InputMaybe<Scalars['String']>;
    menuId: Scalars['String'];
};

export type CookMenuMutationUpdatePreparationTimeArgs = {
    menuId: Scalars['String'];
    preparationTime: Scalars['UnsignedInt'];
};

export type CookMenuMutationUpdatePricePerAdultArgs = {
    menuId: Scalars['String'];
    pricePerAdult: Scalars['UnsignedInt'];
};

export type CookMenuMutationUpdatePricePerChildArgs = {
    menuId: Scalars['String'];
    pricePerChild?: InputMaybe<Scalars['UnsignedInt']>;
};

export type CookMenuMutationUpdateTitleArgs = {
    menuId: Scalars['String'];
    title: Scalars['String'];
};

export type CookMenuQuery = {
    __typename?: 'CookMenuQuery';
    cookId: Scalars['String'];
    findMany: Array<Menu>;
    findOne?: Maybe<Menu>;
};

export type CookMenuQueryFindManyArgs = {
    request?: InputMaybe<FindManyRequest>;
};

export type CookMenuQueryFindOneArgs = {
    menuId: Scalars['String'];
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
    addOneLanguage: Scalars['Boolean'];
    bookingRequests: CookBookingRequestMutation;
    createOne: Scalars['Boolean'];
    meals: CookMealMutation;
    menus: CookMenuMutation;
    removeOneLanguage: Scalars['Boolean'];
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

export type CookMutationAddOneLanguageArgs = {
    cookId: Scalars['String'];
    languageId: Scalars['String'];
};

export type CookMutationBookingRequestsArgs = {
    cookId: Scalars['String'];
};

export type CookMutationCreateOneArgs = {
    cookId: Scalars['String'];
    request: CreateOneCookRequest;
};

export type CookMutationMealsArgs = {
    cookId: Scalars['String'];
};

export type CookMutationMenusArgs = {
    cookId: Scalars['String'];
};

export type CookMutationRemoveOneLanguageArgs = {
    cookId: Scalars['String'];
    languageId: Scalars['String'];
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
    menus: CookMenuQuery;
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
    request: FindManyRequest;
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

export type CreateOneAdminRequest = {
    adminId: Scalars['String'];
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
    languageIds?: InputMaybe<Array<Scalars['String']>>;
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
    index: Scalars['UnsignedInt'];
    mealOptions?: InputMaybe<Array<CreateOneMealOptionRequest>>;
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

export type CreateOneMealOptionRequest = {
    index: Scalars['UnsignedInt'];
    mealId: Scalars['String'];
};

export type CreateOneMealRequest = {
    description: Scalars['String'];
    title: Scalars['String'];
    type: MealType;
};

export type CreateOneMenuRequest = {
    basePrice: Scalars['UnsignedInt'];
    basePriceCustomers: Scalars['UnsignedInt'];
    categoryIds?: InputMaybe<Array<Scalars['String']>>;
    courses?: InputMaybe<Array<CreateOneCourseRequest>>;
    currencyCode: CurrencyCode;
    description: Scalars['String'];
    greetingFromKitchen?: InputMaybe<Scalars['String']>;
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

export type MealOptionMutationCreateOneArgs = {
    mealOption: CreateOneMealOptionRequest;
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

export type MealType = 'DESSERT' | 'MAIN_COURSE' | 'OTHER' | 'SALAD' | 'SOUP' | 'STARTER';

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
    greetingFromKitchen?: Maybe<Scalars['String']>;
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
    courses: CookMenuCourseMutation;
};

export type MenuMutationCoursesArgs = {
    menuId: Scalars['String'];
};

export type MenuQuery = {
    __typename?: 'MenuQuery';
    courses: CookMenuCourseQuery;
};

export type MenuQueryCoursesArgs = {
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

export type Platform = 'ANDROID' | 'BROWSER' | 'IOS' | 'NO_INFORMATION';

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
    update: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type UserAddressMutationCreateOneArgs = {
    address: CreateOneAddressRequest;
};

export type UserAddressMutationDeleteOneArgs = {
    addressId: Scalars['String'];
};

export type UserAddressMutationUpdateArgs = {
    address: CreateOneAddressRequest;
    addressId: Scalars['String'];
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
    profilePicture?: InputMaybe<Scalars['Upload']>;
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
    profilePicture?: InputMaybe<Scalars['Upload']>;
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

export type CreateOneAnonymousGlobalBookingRequestMutationVariables = Exact<{
    input: CreateOneAnonymousGlobalBookingRequestInput;
}>;

export type CreateOneAnonymousGlobalBookingRequestMutation = { __typename?: 'Mutation'; success: boolean };

export type CreateOneUserByEmailAddressMutationVariables = Exact<{
    request: CreateOneUserByEmailAddressRequest;
    profilePicture?: InputMaybe<Scalars['Upload']>;
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

export type FindLanguagesQueryVariables = Exact<{ [key: string]: never }>;

export type FindLanguagesQuery = {
    __typename?: 'Query';
    languages: { __typename?: 'LanguageQuery'; findAll: Array<{ __typename?: 'Language'; languageId: string; title: string }> };
};

export type FindLatestPublicPrivacyPolicyUpdateQueryVariables = Exact<{ [key: string]: never }>;

export type FindLatestPublicPrivacyPolicyUpdateQuery = {
    __typename?: 'Query';
    users: {
        __typename?: 'UserQuery';
        signedInUser?: ({ __typename?: 'User' } & { ' $fragmentRefs'?: { SignedInUserFragment: SignedInUserFragment } }) | null;
    };
    publicPrivacyPolicyUpdates: {
        __typename?: 'PublicPrivacyPolicyUpdateQuery';
        findLatest?: {
            __typename?: 'PublicPrivacyPolicyUpdate';
            privacyPolicyUpdateId: string;
            englishText: string;
            germanText: string;
            createdAt: Date;
        } | null;
    };
};

export type FindLatestPublicTermsUpdateQueryVariables = Exact<{ [key: string]: never }>;

export type FindLatestPublicTermsUpdateQuery = {
    __typename?: 'Query';
    users: {
        __typename?: 'UserQuery';
        signedInUser?: ({ __typename?: 'User' } & { ' $fragmentRefs'?: { SignedInUserFragment: SignedInUserFragment } }) | null;
    };
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

export type FindManyCooksQueryVariables = Exact<{
    request: FindManyRequest;
}>;

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

export type FindManyPublicCooksQueryVariables = Exact<{
    request: FindManyPublicCooksRequest;
}>;

export type FindManyPublicCooksQuery = {
    __typename?: 'Query';
    users: {
        __typename?: 'UserQuery';
        signedInUser?: ({ __typename?: 'User' } & { ' $fragmentRefs'?: { SignedInUserFragment: SignedInUserFragment } }) | null;
    };
    publicCooks: {
        __typename?: 'PublicCookQuery';
        findMany: Array<{
            __typename?: 'PublicCook';
            cookId: string;
            rank: CookRank;
            biography: string;
            travelExpenses: number;
            createdAt: Date;
            user: { __typename?: 'PublicUser'; userId: string; firstName: string; profilePictureUrl?: string | null };
            location: { __typename?: 'Location'; latitude: number; longitude: number };
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

export type GetCookSignUpPageDataQueryVariables = Exact<{ [key: string]: never }>;

export type GetCookSignUpPageDataQuery = {
    __typename?: 'Query';
    users: {
        __typename?: 'UserQuery';
        signedInUser?: ({ __typename?: 'User' } & { ' $fragmentRefs'?: { SignedInUserFragment: SignedInUserFragment } }) | null;
    };
    languages: { __typename?: 'LanguageQuery'; findAll: Array<{ __typename?: 'Language'; languageId: string; title: string }> };
};

export type GetIndividualRequestPageDataQueryVariables = Exact<{ [key: string]: never }>;

export type GetIndividualRequestPageDataQuery = {
    __typename?: 'Query';
    users: {
        __typename?: 'UserQuery';
        signedInUser?: ({ __typename?: 'User' } & { ' $fragmentRefs'?: { SignedInUserFragment: SignedInUserFragment } }) | null;
    };
    categories: { __typename?: 'CategoryQuery'; findAll: Array<{ __typename?: 'Category'; categoryId: string; title: string }> };
    kitchens: { __typename?: 'KitchenQuery'; findAll: Array<{ __typename?: 'Kitchen'; kitchenId: string; title: string }> };
    allergies: { __typename?: 'AllergyQuery'; findAll: Array<{ __typename?: 'Allergy'; allergyId: string; title: string }> };
};

export type GetPublicCookPageDataQueryVariables = Exact<{
    cookId: Scalars['String'];
}>;

export type GetPublicCookPageDataQuery = {
    __typename?: 'Query';
    users: {
        __typename?: 'UserQuery';
        signedInUser?: ({ __typename?: 'User' } & { ' $fragmentRefs'?: { SignedInUserFragment: SignedInUserFragment } }) | null;
    };
    publicCooks: {
        __typename?: 'PublicCookQuery';
        findOne?: {
            __typename?: 'PublicCook';
            cookId: string;
            rank: CookRank;
            biography: string;
            travelExpenses: number;
            createdAt: Date;
            user: { __typename?: 'PublicUser'; userId: string; firstName: string; profilePictureUrl?: string | null };
            location: { __typename?: 'Location'; latitude: number; longitude: number };
        } | null;
    };
};

export type GetCookProfileQueryQueryVariables = Exact<{
    cookId: Scalars['String'];
}>;

export type GetCookProfileQueryQuery = {
    __typename?: 'Query';
    cooks: {
        __typename?: 'CookQuery';
        findOne?: {
            __typename?: 'Cook';
            cookId: string;
            isLocked: boolean;
            isVisible: boolean;
            biography: string;
            maximumParticipants?: number | null;
            maximumPrice?: number | null;
            maximumTravelDistance?: number | null;
            minimumParticipants?: number | null;
            minimumPrice?: number | null;
            rank: CookRank;
            travelExpenses: number;
            ratingAverage: number;
            ratingCount: number;
            user: {
                __typename?: 'User';
                firstName: string;
                lastName: string;
                profilePictureUrl?: string | null;
                addresses: Array<{
                    __typename?: 'Address';
                    addressId: string;
                    title: string;
                    country: string;
                    city: string;
                    postCode: string;
                    street: string;
                    houseNumber: string;
                    createdAt: Date;
                    location: { __typename?: 'Location'; latitude: number; longitude: number };
                }>;
            };
            languages: Array<{ __typename?: 'Language'; languageId: string; title: string }>;
            location: { __typename?: 'Location'; latitude: number; longitude: number };
        } | null;
    };
};

export type AddOneCookLanguageMutationVariables = Exact<{
    cookId: Scalars['String'];
    languageId: Scalars['String'];
}>;

export type AddOneCookLanguageMutation = { __typename?: 'Mutation'; cooks: { __typename?: 'CookMutation'; success: boolean } };

export type RemoveOneCookLanguageMutationVariables = Exact<{
    cookId: Scalars['String'];
    languageId: Scalars['String'];
}>;

export type RemoveOneCookLanguageMutation = { __typename?: 'Mutation'; cooks: { __typename?: 'CookMutation'; success: boolean } };

export type CreateOneCookMealMutationVariables = Exact<{
    meal: CreateOneMealRequest;
    cookId: Scalars['String'];
    image?: InputMaybe<Scalars['Upload']>;
}>;

export type CreateOneCookMealMutation = {
    __typename?: 'Mutation';
    cooks: { __typename?: 'CookMutation'; meals: { __typename?: 'CookMealMutation'; success: boolean } };
};

export type DeleteOneCookMealMutationVariables = Exact<{
    mealId: Scalars['String'];
    cookId: Scalars['String'];
}>;

export type DeleteOneCookMealMutation = {
    __typename?: 'Mutation';
    cooks: { __typename?: 'CookMutation'; meals: { __typename?: 'CookMealMutation'; success: boolean } };
};

export type FindCookMealQueryVariables = Exact<{
    mealId: Scalars['String'];
    cookId: Scalars['String'];
}>;

export type FindCookMealQuery = {
    __typename?: 'Query';
    cooks: {
        __typename?: 'CookQuery';
        meals: {
            __typename?: 'CookMealQuery';
            findOne?: {
                __typename?: 'Meal';
                mealId: string;
                title: string;
                description: string;
                imageUrl?: string | null;
                type: MealType;
                createdAt: Date;
            } | null;
        };
    };
};

export type FindCookMealsQueryVariables = Exact<{
    cookId: Scalars['String'];
}>;

export type FindCookMealsQuery = {
    __typename?: 'Query';
    cooks: {
        __typename?: 'CookQuery';
        meals: {
            __typename?: 'CookMealQuery';
            findMany: Array<{
                __typename?: 'Meal';
                mealId: string;
                cookId: string;
                title: string;
                type: MealType;
                description: string;
                imageUrl?: string | null;
                createdAt: Date;
            }>;
        };
    };
};

export type UpdateCookMealDescriptionMutationVariables = Exact<{
    mealId: Scalars['String'];
    description: Scalars['String'];
    cookId: Scalars['String'];
}>;

export type UpdateCookMealDescriptionMutation = {
    __typename?: 'Mutation';
    cooks: { __typename?: 'CookMutation'; meals: { __typename?: 'CookMealMutation'; success: boolean } };
};

export type UpdateCookMealImageMutationVariables = Exact<{
    mealId: Scalars['String'];
    cookId: Scalars['String'];
    image?: InputMaybe<Scalars['Upload']>;
}>;

export type UpdateCookMealImageMutation = {
    __typename?: 'Mutation';
    cooks: { __typename?: 'CookMutation'; meals: { __typename?: 'CookMealMutation'; success: boolean } };
};

export type UpdateCookMealTitleMutationVariables = Exact<{
    mealId: Scalars['String'];
    title: Scalars['String'];
    cookId: Scalars['String'];
}>;

export type UpdateCookMealTitleMutation = {
    __typename?: 'Mutation';
    cooks: { __typename?: 'CookMutation'; meals: { __typename?: 'CookMealMutation'; success: boolean } };
};

export type UpdateCookMealTypeMutationVariables = Exact<{
    mealId: Scalars['String'];
    type: MealType;
    cookId: Scalars['String'];
}>;

export type UpdateCookMealTypeMutation = {
    __typename?: 'Mutation';
    cooks: { __typename?: 'CookMutation'; meals: { __typename?: 'CookMealMutation'; success: boolean } };
};

export type CreateOneCookMenuMutationVariables = Exact<{
    menu: CreateOneMenuRequest;
    cookId: Scalars['String'];
}>;

export type CreateOneCookMenuMutation = {
    __typename?: 'Mutation';
    cooks: { __typename?: 'CookMutation'; menus: { __typename?: 'CookMenuMutation'; success: boolean } };
};

export type DeleteOneCookMenuMutationVariables = Exact<{
    menuId: Scalars['String'];
    cookId: Scalars['String'];
}>;

export type DeleteOneCookMenuMutation = {
    __typename?: 'Mutation';
    cooks: { __typename?: 'CookMutation'; menus: { __typename?: 'CookMenuMutation'; success: boolean } };
};

export type FindCookMenuQueryVariables = Exact<{
    menuId: Scalars['String'];
    cookId: Scalars['String'];
}>;

export type FindCookMenuQuery = {
    __typename?: 'Query';
    cooks: {
        __typename?: 'CookQuery';
        menus: {
            __typename?: 'CookMenuQuery';
            findOne?: {
                __typename?: 'Menu';
                menuId: string;
                isVisible: boolean;
                title: string;
                description: string;
                basePrice: number;
                basePriceCustomers: number;
                pricePerAdult: number;
                pricePerChild?: number | null;
                currencyCode: CurrencyCode;
                greetingFromKitchen?: string | null;
                preparationTime: number;
                createdAt: Date;
                kitchen?: { __typename?: 'Kitchen'; kitchenId: string; title: string } | null;
                categories: Array<{ __typename?: 'Category'; categoryId: string; title: string }>;
            } | null;
        };
    };
};

export type FindCookMenusQueryVariables = Exact<{
    cookId: Scalars['String'];
}>;

export type FindCookMenusQuery = {
    __typename?: 'Query';
    users: { __typename?: 'UserQuery'; me?: { __typename?: 'User'; firstName: string; profilePictureUrl?: string | null } | null };
    cooks: {
        __typename?: 'CookQuery';
        menus: {
            __typename?: 'CookMenuQuery';
            findMany: Array<{
                __typename?: 'Menu';
                menuId: string;
                title: string;
                description: string;
                basePrice: number;
                basePriceCustomers: number;
                createdAt: Date;
                currencyCode: CurrencyCode;
                preparationTime: number;
                pricePerAdult: number;
                pricePerChild?: number | null;
                isVisible: boolean;
                categories: Array<{ __typename?: 'Category'; categoryId: string; title: string }>;
                kitchen?: { __typename?: 'Kitchen'; kitchenId: string; title: string } | null;
            }>;
        };
    };
};

export type UpdateCookMenuBasePriceMutationVariables = Exact<{
    menuId: Scalars['String'];
    basePrice: Scalars['UnsignedInt'];
    cookId: Scalars['String'];
}>;

export type UpdateCookMenuBasePriceMutation = {
    __typename?: 'Mutation';
    cooks: { __typename?: 'CookMutation'; menus: { __typename?: 'CookMenuMutation'; success: boolean } };
};

export type UpdateCookMenuBasePriceCustomersMutationVariables = Exact<{
    menuId: Scalars['String'];
    basePriceCustomers: Scalars['UnsignedInt'];
    cookId: Scalars['String'];
}>;

export type UpdateCookMenuBasePriceCustomersMutation = {
    __typename?: 'Mutation';
    cooks: { __typename?: 'CookMutation'; menus: { __typename?: 'CookMenuMutation'; success: boolean } };
};

export type UpdateCookMenuCurrencyCodeMutationVariables = Exact<{
    menuId: Scalars['String'];
    currencyCode: CurrencyCode;
    cookId: Scalars['String'];
}>;

export type UpdateCookMenuCurrencyCodeMutation = {
    __typename?: 'Mutation';
    cooks: { __typename?: 'CookMutation'; menus: { __typename?: 'CookMenuMutation'; success: boolean } };
};

export type UpdateCookMenuDescriptionMutationVariables = Exact<{
    menuId: Scalars['String'];
    description: Scalars['String'];
    cookId: Scalars['String'];
}>;

export type UpdateCookMenuDescriptionMutation = {
    __typename?: 'Mutation';
    cooks: { __typename?: 'CookMutation'; menus: { __typename?: 'CookMenuMutation'; success: boolean } };
};

export type UpdateCookMenuGreetingFromKitchenMutationVariables = Exact<{
    menuId: Scalars['String'];
    cookId: Scalars['String'];
}>;

export type UpdateCookMenuGreetingFromKitchenMutation = {
    __typename?: 'Mutation';
    cooks: { __typename?: 'CookMutation'; menus: { __typename?: 'CookMenuMutation'; success: boolean } };
};

export type UpdateCookMenuIsVisibleMutationVariables = Exact<{
    menuId: Scalars['String'];
    isVisible: Scalars['Boolean'];
    cookId: Scalars['String'];
}>;

export type UpdateCookMenuIsVisibleMutation = {
    __typename?: 'Mutation';
    cooks: { __typename?: 'CookMutation'; menus: { __typename?: 'CookMenuMutation'; success: boolean } };
};

export type UpdateCookMenuKitchenIdMutationVariables = Exact<{
    menuId: Scalars['String'];
    cookId: Scalars['String'];
}>;

export type UpdateCookMenuKitchenIdMutation = {
    __typename?: 'Mutation';
    cooks: { __typename?: 'CookMutation'; menus: { __typename?: 'CookMenuMutation'; success: boolean } };
};

export type UpdateCookMenuPreparationTimeMutationVariables = Exact<{
    menuId: Scalars['String'];
    preparationTime: Scalars['UnsignedInt'];
    cookId: Scalars['String'];
}>;

export type UpdateCookMenuPreparationTimeMutation = {
    __typename?: 'Mutation';
    cooks: { __typename?: 'CookMutation'; menus: { __typename?: 'CookMenuMutation'; success: boolean } };
};

export type UpdateCookMenuPricePerAdultMutationVariables = Exact<{
    menuId: Scalars['String'];
    pricePerAdult: Scalars['UnsignedInt'];
    cookId: Scalars['String'];
}>;

export type UpdateCookMenuPricePerAdultMutation = {
    __typename?: 'Mutation';
    cooks: { __typename?: 'CookMutation'; menus: { __typename?: 'CookMenuMutation'; success: boolean } };
};

export type UpdateCookMenuPricePerChildMutationVariables = Exact<{
    menuId: Scalars['String'];
    cookId: Scalars['String'];
}>;

export type UpdateCookMenuPricePerChildMutation = {
    __typename?: 'Mutation';
    cooks: { __typename?: 'CookMutation'; menus: { __typename?: 'CookMenuMutation'; success: boolean } };
};

export type UpdateCookMenuTitleMutationVariables = Exact<{
    menuId: Scalars['String'];
    title: Scalars['String'];
    cookId: Scalars['String'];
}>;

export type UpdateCookMenuTitleMutation = {
    __typename?: 'Mutation';
    cooks: { __typename?: 'CookMutation'; menus: { __typename?: 'CookMenuMutation'; success: boolean } };
};

export type UpdateCookBiographyMutationVariables = Exact<{
    cookId: Scalars['String'];
    biography: Scalars['String'];
}>;

export type UpdateCookBiographyMutation = { __typename?: 'Mutation'; cooks: { __typename?: 'CookMutation'; success: boolean } };

export type UpdateCookIsLockedMutationVariables = Exact<{
    cookId: Scalars['String'];
    isLocked: Scalars['Boolean'];
}>;

export type UpdateCookIsLockedMutation = { __typename?: 'Mutation'; cooks: { __typename?: 'CookMutation'; success: boolean } };

export type UpdateCookIsVisibleMutationVariables = Exact<{
    cookId: Scalars['String'];
    isVisible: Scalars['Boolean'];
}>;

export type UpdateCookIsVisibleMutation = { __typename?: 'Mutation'; cooks: { __typename?: 'CookMutation'; success: boolean } };

export type UpdateCookLocationMutationVariables = Exact<{
    cookId: Scalars['String'];
    location: LocationInput;
}>;

export type UpdateCookLocationMutation = { __typename?: 'Mutation'; cooks: { __typename?: 'CookMutation'; success: boolean } };

export type UpdateCookMaximumParticipantsMutationVariables = Exact<{
    cookId: Scalars['String'];
    maximumParticipants?: InputMaybe<Scalars['UnsignedInt']>;
}>;

export type UpdateCookMaximumParticipantsMutation = { __typename?: 'Mutation'; cooks: { __typename?: 'CookMutation'; success: boolean } };

export type UpdateCookMaximumPriceMutationVariables = Exact<{
    cookId: Scalars['String'];
}>;

export type UpdateCookMaximumPriceMutation = { __typename?: 'Mutation'; cooks: { __typename?: 'CookMutation'; success: boolean } };

export type UpdateCookMaximumTravelDistanceMutationVariables = Exact<{
    cookId: Scalars['String'];
    maximumTravelDistance?: InputMaybe<Scalars['UnsignedInt']>;
}>;

export type UpdateCookMaximumTravelDistanceMutation = { __typename?: 'Mutation'; cooks: { __typename?: 'CookMutation'; success: boolean } };

export type UpdateCookMinimumParticipantsMutationVariables = Exact<{
    cookId: Scalars['String'];
}>;

export type UpdateCookMinimumParticipantsMutation = { __typename?: 'Mutation'; cooks: { __typename?: 'CookMutation'; success: boolean } };

export type UpdateCookMinimumPriceMutationVariables = Exact<{
    cookId: Scalars['String'];
}>;

export type UpdateCookMinimumPriceMutation = { __typename?: 'Mutation'; cooks: { __typename?: 'CookMutation'; success: boolean } };

export type UpdateCookRankMutationVariables = Exact<{
    cookId: Scalars['String'];
    rank: CookRank;
}>;

export type UpdateCookRankMutation = { __typename?: 'Mutation'; cooks: { __typename?: 'CookMutation'; success: boolean } };

export type UpdateCookTravelExpensesMutationVariables = Exact<{
    cookId: Scalars['String'];
    travelExpenses: Scalars['UnsignedInt'];
}>;

export type UpdateCookTravelExpensesMutation = { __typename?: 'Mutation'; cooks: { __typename?: 'CookMutation'; success: boolean } };

export type ConfirmOneEmailAddressUpdateMutationVariables = Exact<{
    userId: Scalars['String'];
    secret: Scalars['String'];
}>;

export type ConfirmOneEmailAddressUpdateMutation = {
    __typename?: 'Mutation';
    users: { __typename?: 'UserMutation'; emailAddressUpdate: { __typename?: 'UserEmailAddressUpdateMutation'; success: boolean } };
};

export type CreateOneEmailAddressUpdateMutationVariables = Exact<{
    emailAddress: Scalars['EmailAddress'];
    userId: Scalars['String'];
}>;

export type CreateOneEmailAddressUpdateMutation = {
    __typename?: 'Mutation';
    users: { __typename?: 'UserMutation'; emailAddressUpdate: { __typename?: 'UserEmailAddressUpdateMutation'; success: boolean } };
};

export type SignedInUserFragment = {
    __typename?: 'User';
    userId: string;
    firstName: string;
    profilePictureUrl?: string | null;
    isCook: boolean;
    isAdmin: boolean;
} & { ' $fragmentName'?: 'SignedInUserFragment' };

export type CreateOneUserAddressMutationVariables = Exact<{
    address: CreateOneAddressRequest;
    userId: Scalars['String'];
}>;

export type CreateOneUserAddressMutation = {
    __typename?: 'Mutation';
    users: { __typename?: 'UserMutation'; addresses: { __typename?: 'UserAddressMutation'; success: boolean } };
};

export type DeleteOneUserAddressMutationVariables = Exact<{
    addressId: Scalars['String'];
    userId: Scalars['String'];
}>;

export type DeleteOneUserAddressMutation = {
    __typename?: 'Mutation';
    users: { __typename?: 'UserMutation'; addresses: { __typename?: 'UserAddressMutation'; success: boolean } };
};

export type GetProfileQueryQueryVariables = Exact<{ [key: string]: never }>;

export type GetProfileQueryQuery = {
    __typename?: 'Query';
    users: {
        __typename?: 'UserQuery';
        me?: {
            __typename?: 'User';
            userId: string;
            firstName: string;
            lastName: string;
            profilePictureUrl?: string | null;
            birthDate?: string | null;
            gender: Gender;
            acceptedTerms: Date;
            acceptedPrivacyPolicy: Date;
            emailAddress?: string | null;
            phoneNumber?: string | null;
            createdAt: Date;
            isCook: boolean;
            isAdmin: boolean;
            addresses: Array<{
                __typename?: 'Address';
                addressId: string;
                title: string;
                country: string;
                city: string;
                postCode: string;
                street: string;
                houseNumber: string;
                createdAt: Date;
                location: { __typename?: 'Location'; latitude: number; longitude: number };
            }>;
        } | null;
    };
};

export type UpdateOneUserAddressMutationVariables = Exact<{
    addressId: Scalars['String'];
    address: CreateOneAddressRequest;
    userId: Scalars['String'];
}>;

export type UpdateOneUserAddressMutation = {
    __typename?: 'Mutation';
    users: { __typename?: 'UserMutation'; addresses: { __typename?: 'UserAddressMutation'; success: boolean } };
};

export type UpdateUserGenderMutationVariables = Exact<{
    userId: Scalars['String'];
    gender: Gender;
}>;

export type UpdateUserGenderMutation = { __typename?: 'Mutation'; users: { __typename?: 'UserMutation'; success: boolean } };

export type UpdateUserPasswordMutationVariables = Exact<{
    userId: Scalars['String'];
    password: Scalars['String'];
}>;

export type UpdateUserPasswordMutation = { __typename?: 'Mutation'; users: { __typename?: 'UserMutation'; success: boolean } };

export type UpdateUserProfilePictureMutationVariables = Exact<{
    userId: Scalars['String'];
    profilePicture?: InputMaybe<Scalars['Upload']>;
}>;

export type UpdateUserProfilePictureMutation = { __typename?: 'Mutation'; users: { __typename?: 'UserMutation'; success: boolean } };

export const SignedInUserFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'SignedInUser' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'profilePictureUrl' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'isCook' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'isAdmin' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<SignedInUserFragment, unknown>;
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
export const CreateOneAnonymousGlobalBookingRequestDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'CreateOneAnonymousGlobalBookingRequest' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateOneAnonymousGlobalBookingRequestInput' } },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'success' },
                        name: { kind: 'Name', value: 'createOneAnonymousGlobalBookingRequest' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'input' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                            },
                        ],
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<CreateOneAnonymousGlobalBookingRequestMutation, CreateOneAnonymousGlobalBookingRequestMutationVariables>;
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
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'profilePicture' } },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'Upload' } },
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
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'profilePicture' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'profilePicture' } },
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
export const FindLanguagesDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'FindLanguages' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'languages' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'findAll' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'languageId' } },
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
} as unknown as DocumentNode<FindLanguagesQuery, FindLanguagesQueryVariables>;
export const FindLatestPublicPrivacyPolicyUpdateDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'FindLatestPublicPrivacyPolicyUpdate' },
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
                                    alias: { kind: 'Name', value: 'signedInUser' },
                                    name: { kind: 'Name', value: 'me' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SignedInUser' } }],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'publicPrivacyPolicyUpdates' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'findLatest' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'privacyPolicyUpdateId' } },
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
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'SignedInUser' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'profilePictureUrl' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'isCook' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'isAdmin' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<FindLatestPublicPrivacyPolicyUpdateQuery, FindLatestPublicPrivacyPolicyUpdateQueryVariables>;
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
                        name: { kind: 'Name', value: 'users' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'signedInUser' },
                                    name: { kind: 'Name', value: 'me' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SignedInUser' } }],
                                    },
                                },
                            ],
                        },
                    },
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
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'SignedInUser' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'profilePictureUrl' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'isCook' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'isAdmin' } },
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
                        name: { kind: 'Name', value: 'cooks' },
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
export const FindManyPublicCooksDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'FindManyPublicCooks' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'request' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'FindManyPublicCooksRequest' } } },
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
                                    alias: { kind: 'Name', value: 'signedInUser' },
                                    name: { kind: 'Name', value: 'me' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SignedInUser' } }],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'publicCooks' },
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
                                            { kind: 'Field', name: { kind: 'Name', value: 'cookId' } },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'user' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'profilePictureUrl' } },
                                                    ],
                                                },
                                            },
                                            { kind: 'Field', name: { kind: 'Name', value: 'rank' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'biography' } },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'location' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
                                                    ],
                                                },
                                            },
                                            { kind: 'Field', name: { kind: 'Name', value: 'travelExpenses' } },
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
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'SignedInUser' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'profilePictureUrl' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'isCook' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'isAdmin' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<FindManyPublicCooksQuery, FindManyPublicCooksQueryVariables>;
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
export const GetCookSignUpPageDataDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'GetCookSignUpPageData' },
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
                                    alias: { kind: 'Name', value: 'signedInUser' },
                                    name: { kind: 'Name', value: 'me' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SignedInUser' } }],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'languages' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'findAll' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'languageId' } },
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
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'SignedInUser' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'profilePictureUrl' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'isCook' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'isAdmin' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<GetCookSignUpPageDataQuery, GetCookSignUpPageDataQueryVariables>;
export const GetIndividualRequestPageDataDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'GetIndividualRequestPageData' },
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
                                    alias: { kind: 'Name', value: 'signedInUser' },
                                    name: { kind: 'Name', value: 'me' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SignedInUser' } }],
                                    },
                                },
                            ],
                        },
                    },
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
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'SignedInUser' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'profilePictureUrl' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'isCook' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'isAdmin' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<GetIndividualRequestPageDataQuery, GetIndividualRequestPageDataQueryVariables>;
export const GetPublicCookPageDataDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'GetPublicCookPageData' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
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
                                    alias: { kind: 'Name', value: 'signedInUser' },
                                    name: { kind: 'Name', value: 'me' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'SignedInUser' } }],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'publicCooks' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'findOne' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                    ],
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
                                                        { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'profilePictureUrl' } },
                                                    ],
                                                },
                                            },
                                            { kind: 'Field', name: { kind: 'Name', value: 'rank' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'biography' } },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'location' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
                                                    ],
                                                },
                                            },
                                            { kind: 'Field', name: { kind: 'Name', value: 'travelExpenses' } },
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
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'SignedInUser' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'profilePictureUrl' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'isCook' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'isAdmin' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<GetPublicCookPageDataQuery, GetPublicCookPageDataQueryVariables>;
export const GetCookProfileQueryDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'GetCookProfileQuery' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
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
                                    name: { kind: 'Name', value: 'findOne' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                    ],
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
                                                        { kind: 'Field', name: { kind: 'Name', value: 'profilePictureUrl' } },
                                                        {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'addresses' },
                                                            selectionSet: {
                                                                kind: 'SelectionSet',
                                                                selections: [
                                                                    { kind: 'Field', name: { kind: 'Name', value: 'addressId' } },
                                                                    { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                                                    { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                                                                    { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                                                                    { kind: 'Field', name: { kind: 'Name', value: 'postCode' } },
                                                                    { kind: 'Field', name: { kind: 'Name', value: 'street' } },
                                                                    { kind: 'Field', name: { kind: 'Name', value: 'houseNumber' } },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: { kind: 'Name', value: 'location' },
                                                                        selectionSet: {
                                                                            kind: 'SelectionSet',
                                                                            selections: [
                                                                                {
                                                                                    kind: 'Field',
                                                                                    name: { kind: 'Name', value: 'latitude' },
                                                                                },
                                                                                {
                                                                                    kind: 'Field',
                                                                                    name: { kind: 'Name', value: 'longitude' },
                                                                                },
                                                                            ],
                                                                        },
                                                                    },
                                                                    { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                                                ],
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'languages' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        { kind: 'Field', name: { kind: 'Name', value: 'languageId' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                                    ],
                                                },
                                            },
                                            { kind: 'Field', name: { kind: 'Name', value: 'isLocked' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'isVisible' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'biography' } },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'location' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
                                                    ],
                                                },
                                            },
                                            { kind: 'Field', name: { kind: 'Name', value: 'maximumParticipants' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'maximumPrice' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'maximumTravelDistance' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'minimumParticipants' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'minimumPrice' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'rank' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'travelExpenses' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'ratingAverage' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'ratingCount' } },
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
} as unknown as DocumentNode<GetCookProfileQueryQuery, GetCookProfileQueryQueryVariables>;
export const AddOneCookLanguageDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'AddOneCookLanguage' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'languageId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
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
                                    alias: { kind: 'Name', value: 'success' },
                                    name: { kind: 'Name', value: 'addOneLanguage' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'languageId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'languageId' } },
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
} as unknown as DocumentNode<AddOneCookLanguageMutation, AddOneCookLanguageMutationVariables>;
export const RemoveOneCookLanguageDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'RemoveOneCookLanguage' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'languageId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
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
                                    alias: { kind: 'Name', value: 'success' },
                                    name: { kind: 'Name', value: 'removeOneLanguage' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'languageId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'languageId' } },
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
} as unknown as DocumentNode<RemoveOneCookLanguageMutation, RemoveOneCookLanguageMutationVariables>;
export const CreateOneCookMealDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'CreateOneCookMeal' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'meal' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateOneMealRequest' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'image' } },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'Upload' } },
                },
            ],
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
                                    name: { kind: 'Name', value: 'meals' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                alias: { kind: 'Name', value: 'success' },
                                                name: { kind: 'Name', value: 'createOne' },
                                                arguments: [
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'meal' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'meal' } },
                                                    },
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'image' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'image' } },
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
            },
        },
    ],
} as unknown as DocumentNode<CreateOneCookMealMutation, CreateOneCookMealMutationVariables>;
export const DeleteOneCookMealDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'DeleteOneCookMeal' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'mealId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
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
                                    name: { kind: 'Name', value: 'meals' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                alias: { kind: 'Name', value: 'success' },
                                                name: { kind: 'Name', value: 'deleteOne' },
                                                arguments: [
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'mealId' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'mealId' } },
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
            },
        },
    ],
} as unknown as DocumentNode<DeleteOneCookMealMutation, DeleteOneCookMealMutationVariables>;
export const FindCookMealDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'FindCookMeal' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'mealId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
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
                                    name: { kind: 'Name', value: 'meals' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'findOne' },
                                                arguments: [
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'mealId' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'mealId' } },
                                                    },
                                                ],
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        { kind: 'Field', name: { kind: 'Name', value: 'mealId' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'imageUrl' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'type' } },
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
} as unknown as DocumentNode<FindCookMealQuery, FindCookMealQueryVariables>;
export const FindCookMealsDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'FindCookMeals' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
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
                                    name: { kind: 'Name', value: 'meals' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'findMany' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        { kind: 'Field', name: { kind: 'Name', value: 'mealId' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'cookId' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'imageUrl' } },
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
} as unknown as DocumentNode<FindCookMealsQuery, FindCookMealsQueryVariables>;
export const UpdateCookMealDescriptionDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateCookMealDescription' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'mealId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
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
                                    name: { kind: 'Name', value: 'meals' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                alias: { kind: 'Name', value: 'success' },
                                                name: { kind: 'Name', value: 'updateDescription' },
                                                arguments: [
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'mealId' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'mealId' } },
                                                    },
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'description' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
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
            },
        },
    ],
} as unknown as DocumentNode<UpdateCookMealDescriptionMutation, UpdateCookMealDescriptionMutationVariables>;
export const UpdateCookMealImageDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateCookMealImage' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'mealId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'image' } },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'Upload' } },
                },
            ],
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
                                    name: { kind: 'Name', value: 'meals' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                alias: { kind: 'Name', value: 'success' },
                                                name: { kind: 'Name', value: 'updateImage' },
                                                arguments: [
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'mealId' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'mealId' } },
                                                    },
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'image' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'image' } },
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
            },
        },
    ],
} as unknown as DocumentNode<UpdateCookMealImageMutation, UpdateCookMealImageMutationVariables>;
export const UpdateCookMealTitleDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateCookMealTitle' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'mealId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
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
                                    name: { kind: 'Name', value: 'meals' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                alias: { kind: 'Name', value: 'success' },
                                                name: { kind: 'Name', value: 'updateTitle' },
                                                arguments: [
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'mealId' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'mealId' } },
                                                    },
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'title' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
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
            },
        },
    ],
} as unknown as DocumentNode<UpdateCookMealTitleMutation, UpdateCookMealTitleMutationVariables>;
export const UpdateCookMealTypeDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateCookMealType' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'mealId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'MealType' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
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
                                    name: { kind: 'Name', value: 'meals' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                alias: { kind: 'Name', value: 'success' },
                                                name: { kind: 'Name', value: 'updateType' },
                                                arguments: [
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'mealId' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'mealId' } },
                                                    },
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'type' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
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
            },
        },
    ],
} as unknown as DocumentNode<UpdateCookMealTypeMutation, UpdateCookMealTypeMutationVariables>;
export const CreateOneCookMenuDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'CreateOneCookMenu' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'menu' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateOneMenuRequest' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
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
                                    name: { kind: 'Name', value: 'menus' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                alias: { kind: 'Name', value: 'success' },
                                                name: { kind: 'Name', value: 'createOne' },
                                                arguments: [
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'menu' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'menu' } },
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
            },
        },
    ],
} as unknown as DocumentNode<CreateOneCookMenuMutation, CreateOneCookMenuMutationVariables>;
export const DeleteOneCookMenuDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'DeleteOneCookMenu' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'menuId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
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
                                    name: { kind: 'Name', value: 'menus' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                alias: { kind: 'Name', value: 'success' },
                                                name: { kind: 'Name', value: 'deleteOne' },
                                                arguments: [
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'menuId' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'menuId' } },
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
            },
        },
    ],
} as unknown as DocumentNode<DeleteOneCookMenuMutation, DeleteOneCookMenuMutationVariables>;
export const FindCookMenuDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'FindCookMenu' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'menuId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
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
                                    name: { kind: 'Name', value: 'menus' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'findOne' },
                                                arguments: [
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'menuId' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'menuId' } },
                                                    },
                                                ],
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        { kind: 'Field', name: { kind: 'Name', value: 'menuId' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'isVisible' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'basePrice' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'basePriceCustomers' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'pricePerAdult' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'pricePerChild' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'greetingFromKitchen' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'preparationTime' } },
                                                        {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'kitchen' },
                                                            selectionSet: {
                                                                kind: 'SelectionSet',
                                                                selections: [
                                                                    { kind: 'Field', name: { kind: 'Name', value: 'kitchenId' } },
                                                                    { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                                                ],
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'categories' },
                                                            selectionSet: {
                                                                kind: 'SelectionSet',
                                                                selections: [
                                                                    { kind: 'Field', name: { kind: 'Name', value: 'categoryId' } },
                                                                    { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                                                ],
                                                            },
                                                        },
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
} as unknown as DocumentNode<FindCookMenuQuery, FindCookMenuQueryVariables>;
export const FindCookMenusDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'FindCookMenus' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
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
                                    name: { kind: 'Name', value: 'me' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'profilePictureUrl' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'cooks' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'menus' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'findMany' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        { kind: 'Field', name: { kind: 'Name', value: 'menuId' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'basePrice' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'basePriceCustomers' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'preparationTime' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'pricePerAdult' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'pricePerChild' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'isVisible' } },
                                                        {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'categories' },
                                                            selectionSet: {
                                                                kind: 'SelectionSet',
                                                                selections: [
                                                                    { kind: 'Field', name: { kind: 'Name', value: 'categoryId' } },
                                                                    { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                                                ],
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'kitchen' },
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
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<FindCookMenusQuery, FindCookMenusQueryVariables>;
export const UpdateCookMenuBasePriceDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateCookMenuBasePrice' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'menuId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'basePrice' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'UnsignedInt' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
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
                                    name: { kind: 'Name', value: 'menus' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                alias: { kind: 'Name', value: 'success' },
                                                name: { kind: 'Name', value: 'updateBasePrice' },
                                                arguments: [
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'menuId' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'menuId' } },
                                                    },
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'basePrice' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'basePrice' } },
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
            },
        },
    ],
} as unknown as DocumentNode<UpdateCookMenuBasePriceMutation, UpdateCookMenuBasePriceMutationVariables>;
export const UpdateCookMenuBasePriceCustomersDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateCookMenuBasePriceCustomers' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'menuId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'basePriceCustomers' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'UnsignedInt' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
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
                                    name: { kind: 'Name', value: 'menus' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                alias: { kind: 'Name', value: 'success' },
                                                name: { kind: 'Name', value: 'updateBasePriceCustomers' },
                                                arguments: [
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'menuId' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'menuId' } },
                                                    },
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'basePriceCustomers' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'basePriceCustomers' } },
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
            },
        },
    ],
} as unknown as DocumentNode<UpdateCookMenuBasePriceCustomersMutation, UpdateCookMenuBasePriceCustomersMutationVariables>;
export const UpdateCookMenuCurrencyCodeDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateCookMenuCurrencyCode' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'menuId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'currencyCode' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'CurrencyCode' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
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
                                    name: { kind: 'Name', value: 'menus' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                alias: { kind: 'Name', value: 'success' },
                                                name: { kind: 'Name', value: 'updateCurrencyCode' },
                                                arguments: [
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'menuId' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'menuId' } },
                                                    },
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'currencyCode' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'currencyCode' } },
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
            },
        },
    ],
} as unknown as DocumentNode<UpdateCookMenuCurrencyCodeMutation, UpdateCookMenuCurrencyCodeMutationVariables>;
export const UpdateCookMenuDescriptionDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateCookMenuDescription' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'menuId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
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
                                    name: { kind: 'Name', value: 'menus' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                alias: { kind: 'Name', value: 'success' },
                                                name: { kind: 'Name', value: 'updateDescription' },
                                                arguments: [
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'menuId' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'menuId' } },
                                                    },
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'description' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'description' } },
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
            },
        },
    ],
} as unknown as DocumentNode<UpdateCookMenuDescriptionMutation, UpdateCookMenuDescriptionMutationVariables>;
export const UpdateCookMenuGreetingFromKitchenDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateCookMenuGreetingFromKitchen' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'menuId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
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
                                    name: { kind: 'Name', value: 'menus' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                alias: { kind: 'Name', value: 'success' },
                                                name: { kind: 'Name', value: 'updateGreetingFromKitchen' },
                                                arguments: [
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'menuId' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'menuId' } },
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
            },
        },
    ],
} as unknown as DocumentNode<UpdateCookMenuGreetingFromKitchenMutation, UpdateCookMenuGreetingFromKitchenMutationVariables>;
export const UpdateCookMenuIsVisibleDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateCookMenuIsVisible' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'menuId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'isVisible' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
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
                                    name: { kind: 'Name', value: 'menus' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                alias: { kind: 'Name', value: 'success' },
                                                name: { kind: 'Name', value: 'updateIsVisible' },
                                                arguments: [
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'menuId' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'menuId' } },
                                                    },
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'isVisible' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'isVisible' } },
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
            },
        },
    ],
} as unknown as DocumentNode<UpdateCookMenuIsVisibleMutation, UpdateCookMenuIsVisibleMutationVariables>;
export const UpdateCookMenuKitchenIdDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateCookMenuKitchenId' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'menuId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
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
                                    name: { kind: 'Name', value: 'menus' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                alias: { kind: 'Name', value: 'success' },
                                                name: { kind: 'Name', value: 'updateKitchenId' },
                                                arguments: [
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'menuId' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'menuId' } },
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
            },
        },
    ],
} as unknown as DocumentNode<UpdateCookMenuKitchenIdMutation, UpdateCookMenuKitchenIdMutationVariables>;
export const UpdateCookMenuPreparationTimeDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateCookMenuPreparationTime' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'menuId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'preparationTime' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'UnsignedInt' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
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
                                    name: { kind: 'Name', value: 'menus' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                alias: { kind: 'Name', value: 'success' },
                                                name: { kind: 'Name', value: 'updatePreparationTime' },
                                                arguments: [
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'menuId' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'menuId' } },
                                                    },
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'preparationTime' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'preparationTime' } },
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
            },
        },
    ],
} as unknown as DocumentNode<UpdateCookMenuPreparationTimeMutation, UpdateCookMenuPreparationTimeMutationVariables>;
export const UpdateCookMenuPricePerAdultDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateCookMenuPricePerAdult' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'menuId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'pricePerAdult' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'UnsignedInt' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
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
                                    name: { kind: 'Name', value: 'menus' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                alias: { kind: 'Name', value: 'success' },
                                                name: { kind: 'Name', value: 'updatePricePerAdult' },
                                                arguments: [
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'menuId' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'menuId' } },
                                                    },
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'pricePerAdult' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'pricePerAdult' } },
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
            },
        },
    ],
} as unknown as DocumentNode<UpdateCookMenuPricePerAdultMutation, UpdateCookMenuPricePerAdultMutationVariables>;
export const UpdateCookMenuPricePerChildDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateCookMenuPricePerChild' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'menuId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
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
                                    name: { kind: 'Name', value: 'menus' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                alias: { kind: 'Name', value: 'success' },
                                                name: { kind: 'Name', value: 'updatePricePerChild' },
                                                arguments: [
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'menuId' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'menuId' } },
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
            },
        },
    ],
} as unknown as DocumentNode<UpdateCookMenuPricePerChildMutation, UpdateCookMenuPricePerChildMutationVariables>;
export const UpdateCookMenuTitleDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateCookMenuTitle' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'menuId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
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
                                    name: { kind: 'Name', value: 'menus' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                alias: { kind: 'Name', value: 'success' },
                                                name: { kind: 'Name', value: 'updateTitle' },
                                                arguments: [
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'menuId' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'menuId' } },
                                                    },
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'title' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
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
            },
        },
    ],
} as unknown as DocumentNode<UpdateCookMenuTitleMutation, UpdateCookMenuTitleMutationVariables>;
export const UpdateCookBiographyDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateCookBiography' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'biography' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
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
                                    alias: { kind: 'Name', value: 'success' },
                                    name: { kind: 'Name', value: 'updateBiography' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'biography' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'biography' } },
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
} as unknown as DocumentNode<UpdateCookBiographyMutation, UpdateCookBiographyMutationVariables>;
export const UpdateCookIsLockedDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateCookIsLocked' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'isLocked' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } } },
                },
            ],
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
                                    alias: { kind: 'Name', value: 'success' },
                                    name: { kind: 'Name', value: 'updateIsLocked' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'isLocked' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'isLocked' } },
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
} as unknown as DocumentNode<UpdateCookIsLockedMutation, UpdateCookIsLockedMutationVariables>;
export const UpdateCookIsVisibleDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateCookIsVisible' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'isVisible' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } } },
                },
            ],
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
                                    alias: { kind: 'Name', value: 'success' },
                                    name: { kind: 'Name', value: 'updateIsVisible' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'isVisible' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'isVisible' } },
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
} as unknown as DocumentNode<UpdateCookIsVisibleMutation, UpdateCookIsVisibleMutationVariables>;
export const UpdateCookLocationDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateCookLocation' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'location' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'LocationInput' } } },
                },
            ],
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
                                    alias: { kind: 'Name', value: 'success' },
                                    name: { kind: 'Name', value: 'updateLocation' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'location' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'location' } },
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
} as unknown as DocumentNode<UpdateCookLocationMutation, UpdateCookLocationMutationVariables>;
export const UpdateCookMaximumParticipantsDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateCookMaximumParticipants' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'maximumParticipants' } },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'UnsignedInt' } },
                },
            ],
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
                                    alias: { kind: 'Name', value: 'success' },
                                    name: { kind: 'Name', value: 'updateMaximumParticipants' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'maximumParticipants' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'maximumParticipants' } },
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
} as unknown as DocumentNode<UpdateCookMaximumParticipantsMutation, UpdateCookMaximumParticipantsMutationVariables>;
export const UpdateCookMaximumPriceDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateCookMaximumPrice' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
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
                                    alias: { kind: 'Name', value: 'success' },
                                    name: { kind: 'Name', value: 'updateMaximumPrice' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
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
} as unknown as DocumentNode<UpdateCookMaximumPriceMutation, UpdateCookMaximumPriceMutationVariables>;
export const UpdateCookMaximumTravelDistanceDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateCookMaximumTravelDistance' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'maximumTravelDistance' } },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'UnsignedInt' } },
                },
            ],
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
                                    alias: { kind: 'Name', value: 'success' },
                                    name: { kind: 'Name', value: 'updateMaximumTravelDistance' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'maximumTravelDistance' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'maximumTravelDistance' } },
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
} as unknown as DocumentNode<UpdateCookMaximumTravelDistanceMutation, UpdateCookMaximumTravelDistanceMutationVariables>;
export const UpdateCookMinimumParticipantsDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateCookMinimumParticipants' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
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
                                    alias: { kind: 'Name', value: 'success' },
                                    name: { kind: 'Name', value: 'updateMinimumParticipants' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
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
} as unknown as DocumentNode<UpdateCookMinimumParticipantsMutation, UpdateCookMinimumParticipantsMutationVariables>;
export const UpdateCookMinimumPriceDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateCookMinimumPrice' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
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
                                    alias: { kind: 'Name', value: 'success' },
                                    name: { kind: 'Name', value: 'updateMinimumPrice' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
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
} as unknown as DocumentNode<UpdateCookMinimumPriceMutation, UpdateCookMinimumPriceMutationVariables>;
export const UpdateCookRankDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateCookRank' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'rank' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'CookRank' } } },
                },
            ],
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
                                    alias: { kind: 'Name', value: 'success' },
                                    name: { kind: 'Name', value: 'updateRank' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'rank' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'rank' } },
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
} as unknown as DocumentNode<UpdateCookRankMutation, UpdateCookRankMutationVariables>;
export const UpdateCookTravelExpensesDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateCookTravelExpenses' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'travelExpenses' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'UnsignedInt' } } },
                },
            ],
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
                                    alias: { kind: 'Name', value: 'success' },
                                    name: { kind: 'Name', value: 'updateTravelExpenses' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'cookId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'cookId' } },
                                        },
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'travelExpenses' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'travelExpenses' } },
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
} as unknown as DocumentNode<UpdateCookTravelExpensesMutation, UpdateCookTravelExpensesMutationVariables>;
export const ConfirmOneEmailAddressUpdateDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'ConfirmOneEmailAddressUpdate' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'secret' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
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
                                    name: { kind: 'Name', value: 'emailAddressUpdate' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'userId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                alias: { kind: 'Name', value: 'success' },
                                                name: { kind: 'Name', value: 'confirm' },
                                                arguments: [
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'secret' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'secret' } },
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
            },
        },
    ],
} as unknown as DocumentNode<ConfirmOneEmailAddressUpdateMutation, ConfirmOneEmailAddressUpdateMutationVariables>;
export const CreateOneEmailAddressUpdateDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'CreateOneEmailAddressUpdate' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'emailAddress' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'EmailAddress' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
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
                                    name: { kind: 'Name', value: 'emailAddressUpdate' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'userId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                alias: { kind: 'Name', value: 'success' },
                                                name: { kind: 'Name', value: 'createOne' },
                                                arguments: [
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'emailAddress' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'emailAddress' } },
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
            },
        },
    ],
} as unknown as DocumentNode<CreateOneEmailAddressUpdateMutation, CreateOneEmailAddressUpdateMutationVariables>;
export const CreateOneUserAddressDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'CreateOneUserAddress' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'address' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateOneAddressRequest' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
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
                                    name: { kind: 'Name', value: 'addresses' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'userId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                alias: { kind: 'Name', value: 'success' },
                                                name: { kind: 'Name', value: 'createOne' },
                                                arguments: [
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'address' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'address' } },
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
            },
        },
    ],
} as unknown as DocumentNode<CreateOneUserAddressMutation, CreateOneUserAddressMutationVariables>;
export const DeleteOneUserAddressDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'DeleteOneUserAddress' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'addressId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
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
                                    name: { kind: 'Name', value: 'addresses' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'userId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                alias: { kind: 'Name', value: 'success' },
                                                name: { kind: 'Name', value: 'deleteOne' },
                                                arguments: [
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'addressId' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'addressId' } },
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
            },
        },
    ],
} as unknown as DocumentNode<DeleteOneUserAddressMutation, DeleteOneUserAddressMutationVariables>;
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
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'profilePictureUrl' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'birthDate' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'gender' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'acceptedTerms' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'acceptedPrivacyPolicy' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'emailAddress' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'phoneNumber' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'isCook' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'isAdmin' } },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'addresses' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        { kind: 'Field', name: { kind: 'Name', value: 'addressId' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'postCode' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'street' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'houseNumber' } },
                                                        {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'location' },
                                                            selectionSet: {
                                                                kind: 'SelectionSet',
                                                                selections: [
                                                                    { kind: 'Field', name: { kind: 'Name', value: 'latitude' } },
                                                                    { kind: 'Field', name: { kind: 'Name', value: 'longitude' } },
                                                                ],
                                                            },
                                                        },
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
} as unknown as DocumentNode<GetProfileQueryQuery, GetProfileQueryQueryVariables>;
export const UpdateOneUserAddressDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateOneUserAddress' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'addressId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'address' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateOneAddressRequest' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
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
                                    name: { kind: 'Name', value: 'addresses' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'userId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                alias: { kind: 'Name', value: 'success' },
                                                name: { kind: 'Name', value: 'update' },
                                                arguments: [
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'addressId' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'addressId' } },
                                                    },
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'address' },
                                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'address' } },
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
            },
        },
    ],
} as unknown as DocumentNode<UpdateOneUserAddressMutation, UpdateOneUserAddressMutationVariables>;
export const UpdateUserGenderDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateUserGender' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'gender' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Gender' } } },
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
                                    name: { kind: 'Name', value: 'updateGender' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'userId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
                                        },
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'gender' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'gender' } },
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
} as unknown as DocumentNode<UpdateUserGenderMutation, UpdateUserGenderMutationVariables>;
export const UpdateUserPasswordDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateUserPassword' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
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
                                    name: { kind: 'Name', value: 'updatePassword' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'userId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
                                        },
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'password' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
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
} as unknown as DocumentNode<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>;
export const UpdateUserProfilePictureDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateUserProfilePicture' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'profilePicture' } },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'Upload' } },
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
                                    name: { kind: 'Name', value: 'updateProfilePicture' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'userId' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
                                        },
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'profilePicture' },
                                            value: { kind: 'Variable', name: { kind: 'Name', value: 'profilePicture' } },
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
} as unknown as DocumentNode<UpdateUserProfilePictureMutation, UpdateUserProfilePictureMutationVariables>;
