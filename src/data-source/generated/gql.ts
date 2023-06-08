/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import * as types from './graphql';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    'mutation AssignOneSessionByEmailAddress($request: CreateOneSessionByEmailAddressRequest!) {\n  sessions {\n    success: assignOneByEmailAddress(request: $request)\n  }\n}':
        types.AssignOneSessionByEmailAddressDocument,
    'mutation CreateOneAnonymousGlobalBookingRequest($input: CreateOneAnonymousGlobalBookingRequestInput!) {\n  success: createOneAnonymousGlobalBookingRequest(input: $input)\n}':
        types.CreateOneAnonymousGlobalBookingRequestDocument,
    'mutation CreateOneUserByEmailAddress($request: CreateOneUserByEmailAddressRequest!) {\n  users {\n    success: createOneByEmailAddress(request: $request)\n  }\n}':
        types.CreateOneUserByEmailAddressDocument,
    'query FindAllergies {\n  allergies {\n    findAll {\n      allergyId\n      title\n    }\n  }\n}': types.FindAllergiesDocument,
    'query FindCategories {\n  categories {\n    findAll {\n      categoryId\n      title\n    }\n  }\n}': types.FindCategoriesDocument,
    'query FindKitchens {\n  kitchens {\n    findAll {\n      kitchenId\n      title\n    }\n  }\n}': types.FindKitchensDocument,
    'query FindLatestPublicPrivacyPolicyUpdate {\n  users {\n    signedInUser: me {\n      ...SignedInUser\n    }\n  }\n  publicPrivacyPolicyUpdates {\n    findLatest {\n      privacyPolicyUpdateId\n      englishText\n      germanText\n      createdAt\n    }\n  }\n}':
        types.FindLatestPublicPrivacyPolicyUpdateDocument,
    'query FindLatestPublicTermsUpdate {\n  users {\n    signedInUser: me {\n      ...SignedInUser\n    }\n  }\n  publicTermsUpdates {\n    findLatest {\n      termsUpdateId\n      englishText\n      germanText\n      createdAt\n    }\n  }\n}':
        types.FindLatestPublicTermsUpdateDocument,
    'query FindManyAdmins {\n  admins {\n    findMany {\n      adminId\n      user {\n        firstName\n        createdAt\n      }\n    }\n  }\n}':
        types.FindManyAdminsDocument,
    'query FindManyCooks($request: FindManyRequest!) {\n  cooks {\n    findMany(request: $request) {\n      cookId\n      user {\n        firstName\n        lastName\n      }\n      rank\n      isLocked\n      biography\n    }\n  }\n}':
        types.FindManyCooksDocument,
    'query FindManyPublicCooks($request: FindManyPublicCooksRequest!) {\n  users {\n    signedInUser: me {\n      ...SignedInUser\n    }\n  }\n  publicCooks {\n    findMany(request: $request) {\n      cookId\n      user {\n        userId\n        firstName\n        profilePictureUrl\n      }\n      rank\n      biography\n      location {\n        latitude\n        longitude\n      }\n      travelExpenses\n      createdAt\n    }\n  }\n}':
        types.FindManyPublicCooksDocument,
    'query FindManyUsers($request: FindManyRequest!) {\n  users {\n    findMany(request: $request) {\n      userId\n      firstName\n      lastName\n      language\n      isCook\n      isAdmin\n    }\n  }\n}':
        types.FindManyUsersDocument,
    'query GetIndividualRequestPageData {\n  categories {\n    findAll {\n      categoryId\n      title\n    }\n  }\n  kitchens {\n    findAll {\n      kitchenId\n      title\n    }\n  }\n  allergies {\n    findAll {\n      allergyId\n      title\n    }\n  }\n}':
        types.GetIndividualRequestPageDataDocument,
    'query GetCookProfileQuery($cookId: String!) {\n  cooks {\n    findOne(cookId: $cookId) {\n      cookId\n      user {\n        firstName\n        lastName\n        profilePictureUrl\n        addresses {\n          addressId\n          title\n          country\n          city\n          postCode\n          street\n          houseNumber\n          location {\n            latitude\n            longitude\n          }\n          createdAt\n        }\n      }\n      isLocked\n      isVisible\n      biography\n      location {\n        latitude\n        longitude\n      }\n      maximumParticipants\n      maximumPrice\n      maximumTravelDistance\n      minimumParticipants\n      minimumPrice\n      rank\n      travelExpenses\n    }\n  }\n}':
        types.GetCookProfileQueryDocument,
    'mutation UpdateCookBiography($cookId: String!, $biography: String!) {\n  cooks {\n    success: updateBiography(cookId: $cookId, biography: $biography)\n  }\n}':
        types.UpdateCookBiographyDocument,
    'mutation UpdateCookIsLocked($cookId: String!, $isLocked: Boolean!) {\n  cooks {\n    success: updateIsLocked(cookId: $cookId, isLocked: $isLocked)\n  }\n}':
        types.UpdateCookIsLockedDocument,
    'mutation UpdateCookIsVisible($cookId: String!, $isVisible: Boolean!) {\n  cooks {\n    success: updateIsVisible(cookId: $cookId, isVisible: $isVisible)\n  }\n}':
        types.UpdateCookIsVisibleDocument,
    'mutation UpdateCookLocation($cookId: String!, $location: LocationInput!) {\n  cooks {\n    success: updateLocation(cookId: $cookId, location: $location)\n  }\n}':
        types.UpdateCookLocationDocument,
    'mutation UpdateCookMaximumParticipants($cookId: String!, $maximumParticipants: UnsignedInt) {\n  cooks {\n    success: updateMaximumParticipants(\n      cookId: $cookId\n      maximumParticipants: $maximumParticipants\n    )\n  }\n}':
        types.UpdateCookMaximumParticipantsDocument,
    'mutation UpdateCookMaximumPrice($cookId: String!) {\n  cooks {\n    success: updateMaximumPrice(cookId: $cookId)\n  }\n}':
        types.UpdateCookMaximumPriceDocument,
    'mutation UpdateCookMaximumTravelDistance($cookId: String!, $maximumTravelDistance: UnsignedInt!) {\n  cooks {\n    success: updateMaximumTravelDistance(\n      cookId: $cookId\n      maximumTravelDistance: $maximumTravelDistance\n    )\n  }\n}':
        types.UpdateCookMaximumTravelDistanceDocument,
    'mutation UpdateCookMinimumParticipants($cookId: String!) {\n  cooks {\n    success: updateMinimumParticipants(cookId: $cookId)\n  }\n}':
        types.UpdateCookMinimumParticipantsDocument,
    'mutation UpdateCookMinimumPrice($cookId: String!) {\n  cooks {\n    success: updateMinimumPrice(cookId: $cookId)\n  }\n}':
        types.UpdateCookMinimumPriceDocument,
    'mutation UpdateCookRank($cookId: String!, $rank: CookRank!) {\n  cooks {\n    success: updateRank(cookId: $cookId, rank: $rank)\n  }\n}':
        types.UpdateCookRankDocument,
    'mutation UpdateCookTravelExpenses($cookId: String!, $travelExpenses: UnsignedInt!) {\n  cooks {\n    success: updateTravelExpenses(cookId: $cookId, travelExpenses: $travelExpenses)\n  }\n}':
        types.UpdateCookTravelExpensesDocument,
    'mutation CreateOneCookMeal($meal: CreateOneMealRequest!, $cookId: String!) {\n  cooks {\n    meals(cookId: $cookId) {\n      success: createOne(meal: $meal)\n    }\n  }\n}':
        types.CreateOneCookMealDocument,
    'query FindCookMeals($cookId: String!) {\n  cooks {\n    meals(cookId: $cookId) {\n      findMany {\n        mealId\n        cookId\n        title\n        type\n        description\n        imageUrl\n        createdAt\n      }\n    }\n  }\n}':
        types.FindCookMealsDocument,
    'mutation ConfirmOneEmailAddressUpdate($userId: String!, $secret: String!) {\n  users {\n    emailAddressUpdate(userId: $userId) {\n      success: confirm(secret: $secret)\n    }\n  }\n}':
        types.ConfirmOneEmailAddressUpdateDocument,
    'mutation CreateOneEmailAddressUpdate($emailAddress: EmailAddress!, $userId: String!) {\n  users {\n    emailAddressUpdate(userId: $userId) {\n      success: createOne(emailAddress: $emailAddress)\n    }\n  }\n}':
        types.CreateOneEmailAddressUpdateDocument,
    'fragment SignedInUser on User {\n  userId\n  firstName\n  profilePictureUrl\n  isCook\n  isAdmin\n}': types.SignedInUserFragmentDoc,
    'mutation CreateOneUserAddress($address: CreateOneAddressRequest!, $userId: String!) {\n  users {\n    addresses(userId: $userId) {\n      success: createOne(address: $address)\n    }\n  }\n}':
        types.CreateOneUserAddressDocument,
    'mutation DeleteOneUserAddress($addressId: String!, $userId: String!) {\n  users {\n    addresses(userId: $userId) {\n      success: deleteOne(addressId: $addressId)\n    }\n  }\n}':
        types.DeleteOneUserAddressDocument,
    'query GetProfileQuery {\n  users {\n    me {\n      userId\n      firstName\n      lastName\n      profilePictureUrl\n      birthDate\n      gender\n      acceptedTerms\n      acceptedPrivacyPolicy\n      emailAddress\n      phoneNumber\n      createdAt\n      isCook\n      isAdmin\n      addresses {\n        addressId\n        title\n        country\n        city\n        postCode\n        street\n        houseNumber\n        location {\n          latitude\n          longitude\n        }\n        createdAt\n      }\n    }\n  }\n}':
        types.GetProfileQueryDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation AssignOneSessionByEmailAddress($request: CreateOneSessionByEmailAddressRequest!) {\n  sessions {\n    success: assignOneByEmailAddress(request: $request)\n  }\n}',
): (typeof documents)['mutation AssignOneSessionByEmailAddress($request: CreateOneSessionByEmailAddressRequest!) {\n  sessions {\n    success: assignOneByEmailAddress(request: $request)\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation CreateOneAnonymousGlobalBookingRequest($input: CreateOneAnonymousGlobalBookingRequestInput!) {\n  success: createOneAnonymousGlobalBookingRequest(input: $input)\n}',
): (typeof documents)['mutation CreateOneAnonymousGlobalBookingRequest($input: CreateOneAnonymousGlobalBookingRequestInput!) {\n  success: createOneAnonymousGlobalBookingRequest(input: $input)\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation CreateOneUserByEmailAddress($request: CreateOneUserByEmailAddressRequest!) {\n  users {\n    success: createOneByEmailAddress(request: $request)\n  }\n}',
): (typeof documents)['mutation CreateOneUserByEmailAddress($request: CreateOneUserByEmailAddressRequest!) {\n  users {\n    success: createOneByEmailAddress(request: $request)\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'query FindAllergies {\n  allergies {\n    findAll {\n      allergyId\n      title\n    }\n  }\n}',
): (typeof documents)['query FindAllergies {\n  allergies {\n    findAll {\n      allergyId\n      title\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'query FindCategories {\n  categories {\n    findAll {\n      categoryId\n      title\n    }\n  }\n}',
): (typeof documents)['query FindCategories {\n  categories {\n    findAll {\n      categoryId\n      title\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'query FindKitchens {\n  kitchens {\n    findAll {\n      kitchenId\n      title\n    }\n  }\n}',
): (typeof documents)['query FindKitchens {\n  kitchens {\n    findAll {\n      kitchenId\n      title\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'query FindLatestPublicPrivacyPolicyUpdate {\n  users {\n    signedInUser: me {\n      ...SignedInUser\n    }\n  }\n  publicPrivacyPolicyUpdates {\n    findLatest {\n      privacyPolicyUpdateId\n      englishText\n      germanText\n      createdAt\n    }\n  }\n}',
): (typeof documents)['query FindLatestPublicPrivacyPolicyUpdate {\n  users {\n    signedInUser: me {\n      ...SignedInUser\n    }\n  }\n  publicPrivacyPolicyUpdates {\n    findLatest {\n      privacyPolicyUpdateId\n      englishText\n      germanText\n      createdAt\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'query FindLatestPublicTermsUpdate {\n  users {\n    signedInUser: me {\n      ...SignedInUser\n    }\n  }\n  publicTermsUpdates {\n    findLatest {\n      termsUpdateId\n      englishText\n      germanText\n      createdAt\n    }\n  }\n}',
): (typeof documents)['query FindLatestPublicTermsUpdate {\n  users {\n    signedInUser: me {\n      ...SignedInUser\n    }\n  }\n  publicTermsUpdates {\n    findLatest {\n      termsUpdateId\n      englishText\n      germanText\n      createdAt\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'query FindManyAdmins {\n  admins {\n    findMany {\n      adminId\n      user {\n        firstName\n        createdAt\n      }\n    }\n  }\n}',
): (typeof documents)['query FindManyAdmins {\n  admins {\n    findMany {\n      adminId\n      user {\n        firstName\n        createdAt\n      }\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'query FindManyCooks($request: FindManyRequest!) {\n  cooks {\n    findMany(request: $request) {\n      cookId\n      user {\n        firstName\n        lastName\n      }\n      rank\n      isLocked\n      biography\n    }\n  }\n}',
): (typeof documents)['query FindManyCooks($request: FindManyRequest!) {\n  cooks {\n    findMany(request: $request) {\n      cookId\n      user {\n        firstName\n        lastName\n      }\n      rank\n      isLocked\n      biography\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'query FindManyPublicCooks($request: FindManyPublicCooksRequest!) {\n  users {\n    signedInUser: me {\n      ...SignedInUser\n    }\n  }\n  publicCooks {\n    findMany(request: $request) {\n      cookId\n      user {\n        userId\n        firstName\n        profilePictureUrl\n      }\n      rank\n      biography\n      location {\n        latitude\n        longitude\n      }\n      travelExpenses\n      createdAt\n    }\n  }\n}',
): (typeof documents)['query FindManyPublicCooks($request: FindManyPublicCooksRequest!) {\n  users {\n    signedInUser: me {\n      ...SignedInUser\n    }\n  }\n  publicCooks {\n    findMany(request: $request) {\n      cookId\n      user {\n        userId\n        firstName\n        profilePictureUrl\n      }\n      rank\n      biography\n      location {\n        latitude\n        longitude\n      }\n      travelExpenses\n      createdAt\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'query FindManyUsers($request: FindManyRequest!) {\n  users {\n    findMany(request: $request) {\n      userId\n      firstName\n      lastName\n      language\n      isCook\n      isAdmin\n    }\n  }\n}',
): (typeof documents)['query FindManyUsers($request: FindManyRequest!) {\n  users {\n    findMany(request: $request) {\n      userId\n      firstName\n      lastName\n      language\n      isCook\n      isAdmin\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'query GetIndividualRequestPageData {\n  categories {\n    findAll {\n      categoryId\n      title\n    }\n  }\n  kitchens {\n    findAll {\n      kitchenId\n      title\n    }\n  }\n  allergies {\n    findAll {\n      allergyId\n      title\n    }\n  }\n}',
): (typeof documents)['query GetIndividualRequestPageData {\n  categories {\n    findAll {\n      categoryId\n      title\n    }\n  }\n  kitchens {\n    findAll {\n      kitchenId\n      title\n    }\n  }\n  allergies {\n    findAll {\n      allergyId\n      title\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'query GetCookProfileQuery($cookId: String!) {\n  cooks {\n    findOne(cookId: $cookId) {\n      cookId\n      user {\n        firstName\n        lastName\n        profilePictureUrl\n        addresses {\n          addressId\n          title\n          country\n          city\n          postCode\n          street\n          houseNumber\n          location {\n            latitude\n            longitude\n          }\n          createdAt\n        }\n      }\n      isLocked\n      isVisible\n      biography\n      location {\n        latitude\n        longitude\n      }\n      maximumParticipants\n      maximumPrice\n      maximumTravelDistance\n      minimumParticipants\n      minimumPrice\n      rank\n      travelExpenses\n    }\n  }\n}',
): (typeof documents)['query GetCookProfileQuery($cookId: String!) {\n  cooks {\n    findOne(cookId: $cookId) {\n      cookId\n      user {\n        firstName\n        lastName\n        profilePictureUrl\n        addresses {\n          addressId\n          title\n          country\n          city\n          postCode\n          street\n          houseNumber\n          location {\n            latitude\n            longitude\n          }\n          createdAt\n        }\n      }\n      isLocked\n      isVisible\n      biography\n      location {\n        latitude\n        longitude\n      }\n      maximumParticipants\n      maximumPrice\n      maximumTravelDistance\n      minimumParticipants\n      minimumPrice\n      rank\n      travelExpenses\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation UpdateCookBiography($cookId: String!, $biography: String!) {\n  cooks {\n    success: updateBiography(cookId: $cookId, biography: $biography)\n  }\n}',
): (typeof documents)['mutation UpdateCookBiography($cookId: String!, $biography: String!) {\n  cooks {\n    success: updateBiography(cookId: $cookId, biography: $biography)\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation UpdateCookIsLocked($cookId: String!, $isLocked: Boolean!) {\n  cooks {\n    success: updateIsLocked(cookId: $cookId, isLocked: $isLocked)\n  }\n}',
): (typeof documents)['mutation UpdateCookIsLocked($cookId: String!, $isLocked: Boolean!) {\n  cooks {\n    success: updateIsLocked(cookId: $cookId, isLocked: $isLocked)\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation UpdateCookIsVisible($cookId: String!, $isVisible: Boolean!) {\n  cooks {\n    success: updateIsVisible(cookId: $cookId, isVisible: $isVisible)\n  }\n}',
): (typeof documents)['mutation UpdateCookIsVisible($cookId: String!, $isVisible: Boolean!) {\n  cooks {\n    success: updateIsVisible(cookId: $cookId, isVisible: $isVisible)\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation UpdateCookLocation($cookId: String!, $location: LocationInput!) {\n  cooks {\n    success: updateLocation(cookId: $cookId, location: $location)\n  }\n}',
): (typeof documents)['mutation UpdateCookLocation($cookId: String!, $location: LocationInput!) {\n  cooks {\n    success: updateLocation(cookId: $cookId, location: $location)\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation UpdateCookMaximumParticipants($cookId: String!, $maximumParticipants: UnsignedInt) {\n  cooks {\n    success: updateMaximumParticipants(\n      cookId: $cookId\n      maximumParticipants: $maximumParticipants\n    )\n  }\n}',
): (typeof documents)['mutation UpdateCookMaximumParticipants($cookId: String!, $maximumParticipants: UnsignedInt) {\n  cooks {\n    success: updateMaximumParticipants(\n      cookId: $cookId\n      maximumParticipants: $maximumParticipants\n    )\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation UpdateCookMaximumPrice($cookId: String!) {\n  cooks {\n    success: updateMaximumPrice(cookId: $cookId)\n  }\n}',
): (typeof documents)['mutation UpdateCookMaximumPrice($cookId: String!) {\n  cooks {\n    success: updateMaximumPrice(cookId: $cookId)\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation UpdateCookMaximumTravelDistance($cookId: String!, $maximumTravelDistance: UnsignedInt!) {\n  cooks {\n    success: updateMaximumTravelDistance(\n      cookId: $cookId\n      maximumTravelDistance: $maximumTravelDistance\n    )\n  }\n}',
): (typeof documents)['mutation UpdateCookMaximumTravelDistance($cookId: String!, $maximumTravelDistance: UnsignedInt!) {\n  cooks {\n    success: updateMaximumTravelDistance(\n      cookId: $cookId\n      maximumTravelDistance: $maximumTravelDistance\n    )\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation UpdateCookMinimumParticipants($cookId: String!) {\n  cooks {\n    success: updateMinimumParticipants(cookId: $cookId)\n  }\n}',
): (typeof documents)['mutation UpdateCookMinimumParticipants($cookId: String!) {\n  cooks {\n    success: updateMinimumParticipants(cookId: $cookId)\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation UpdateCookMinimumPrice($cookId: String!) {\n  cooks {\n    success: updateMinimumPrice(cookId: $cookId)\n  }\n}',
): (typeof documents)['mutation UpdateCookMinimumPrice($cookId: String!) {\n  cooks {\n    success: updateMinimumPrice(cookId: $cookId)\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation UpdateCookRank($cookId: String!, $rank: CookRank!) {\n  cooks {\n    success: updateRank(cookId: $cookId, rank: $rank)\n  }\n}',
): (typeof documents)['mutation UpdateCookRank($cookId: String!, $rank: CookRank!) {\n  cooks {\n    success: updateRank(cookId: $cookId, rank: $rank)\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation UpdateCookTravelExpenses($cookId: String!, $travelExpenses: UnsignedInt!) {\n  cooks {\n    success: updateTravelExpenses(cookId: $cookId, travelExpenses: $travelExpenses)\n  }\n}',
): (typeof documents)['mutation UpdateCookTravelExpenses($cookId: String!, $travelExpenses: UnsignedInt!) {\n  cooks {\n    success: updateTravelExpenses(cookId: $cookId, travelExpenses: $travelExpenses)\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation CreateOneCookMeal($meal: CreateOneMealRequest!, $cookId: String!) {\n  cooks {\n    meals(cookId: $cookId) {\n      success: createOne(meal: $meal)\n    }\n  }\n}',
): (typeof documents)['mutation CreateOneCookMeal($meal: CreateOneMealRequest!, $cookId: String!) {\n  cooks {\n    meals(cookId: $cookId) {\n      success: createOne(meal: $meal)\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'query FindCookMeals($cookId: String!) {\n  cooks {\n    meals(cookId: $cookId) {\n      findMany {\n        mealId\n        cookId\n        title\n        type\n        description\n        imageUrl\n        createdAt\n      }\n    }\n  }\n}',
): (typeof documents)['query FindCookMeals($cookId: String!) {\n  cooks {\n    meals(cookId: $cookId) {\n      findMany {\n        mealId\n        cookId\n        title\n        type\n        description\n        imageUrl\n        createdAt\n      }\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation ConfirmOneEmailAddressUpdate($userId: String!, $secret: String!) {\n  users {\n    emailAddressUpdate(userId: $userId) {\n      success: confirm(secret: $secret)\n    }\n  }\n}',
): (typeof documents)['mutation ConfirmOneEmailAddressUpdate($userId: String!, $secret: String!) {\n  users {\n    emailAddressUpdate(userId: $userId) {\n      success: confirm(secret: $secret)\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation CreateOneEmailAddressUpdate($emailAddress: EmailAddress!, $userId: String!) {\n  users {\n    emailAddressUpdate(userId: $userId) {\n      success: createOne(emailAddress: $emailAddress)\n    }\n  }\n}',
): (typeof documents)['mutation CreateOneEmailAddressUpdate($emailAddress: EmailAddress!, $userId: String!) {\n  users {\n    emailAddressUpdate(userId: $userId) {\n      success: createOne(emailAddress: $emailAddress)\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'fragment SignedInUser on User {\n  userId\n  firstName\n  profilePictureUrl\n  isCook\n  isAdmin\n}',
): (typeof documents)['fragment SignedInUser on User {\n  userId\n  firstName\n  profilePictureUrl\n  isCook\n  isAdmin\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation CreateOneUserAddress($address: CreateOneAddressRequest!, $userId: String!) {\n  users {\n    addresses(userId: $userId) {\n      success: createOne(address: $address)\n    }\n  }\n}',
): (typeof documents)['mutation CreateOneUserAddress($address: CreateOneAddressRequest!, $userId: String!) {\n  users {\n    addresses(userId: $userId) {\n      success: createOne(address: $address)\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation DeleteOneUserAddress($addressId: String!, $userId: String!) {\n  users {\n    addresses(userId: $userId) {\n      success: deleteOne(addressId: $addressId)\n    }\n  }\n}',
): (typeof documents)['mutation DeleteOneUserAddress($addressId: String!, $userId: String!) {\n  users {\n    addresses(userId: $userId) {\n      success: deleteOne(addressId: $addressId)\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'query GetProfileQuery {\n  users {\n    me {\n      userId\n      firstName\n      lastName\n      profilePictureUrl\n      birthDate\n      gender\n      acceptedTerms\n      acceptedPrivacyPolicy\n      emailAddress\n      phoneNumber\n      createdAt\n      isCook\n      isAdmin\n      addresses {\n        addressId\n        title\n        country\n        city\n        postCode\n        street\n        houseNumber\n        location {\n          latitude\n          longitude\n        }\n        createdAt\n      }\n    }\n  }\n}',
): (typeof documents)['query GetProfileQuery {\n  users {\n    me {\n      userId\n      firstName\n      lastName\n      profilePictureUrl\n      birthDate\n      gender\n      acceptedTerms\n      acceptedPrivacyPolicy\n      emailAddress\n      phoneNumber\n      createdAt\n      isCook\n      isAdmin\n      addresses {\n        addressId\n        title\n        country\n        city\n        postCode\n        street\n        houseNumber\n        location {\n          latitude\n          longitude\n        }\n        createdAt\n      }\n    }\n  }\n}'];

export function gql(source: string) {
    return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<infer TType, any>
    ? TType
    : never;
