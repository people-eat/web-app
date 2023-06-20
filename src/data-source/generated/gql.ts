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
    'mutation CreateOneUserByEmailAddress($request: CreateOneUserByEmailAddressRequest!, $profilePicture: Upload) {\n  users {\n    success: createOneByEmailAddress(\n      request: $request\n      profilePicture: $profilePicture\n    )\n  }\n}':
        types.CreateOneUserByEmailAddressDocument,
    'mutation ExpireCurrentSession($userId: String!) {\n  users {\n    sessions(userId: $userId) {\n      success: expireCurrent\n    }\n  }\n}':
        types.ExpireCurrentSessionDocument,
    'query FindAllergies {\n  allergies {\n    findAll {\n      allergyId\n      title\n    }\n  }\n}': types.FindAllergiesDocument,
    'query FindCategories {\n  categories {\n    findAll {\n      categoryId\n      title\n    }\n  }\n}': types.FindCategoriesDocument,
    'query FindKitchens {\n  kitchens {\n    findAll {\n      kitchenId\n      title\n    }\n  }\n}': types.FindKitchensDocument,
    'query FindLanguages {\n  languages {\n    findAll {\n      languageId\n      title\n    }\n  }\n}': types.FindLanguagesDocument,
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
    'query GetCookSignUpPageData {\n  users {\n    signedInUser: me {\n      ...SignedInUser\n    }\n  }\n  languages {\n    findAll {\n      languageId\n      title\n    }\n  }\n}':
        types.GetCookSignUpPageDataDocument,
    'query GetIndividualRequestPageData {\n  users {\n    signedInUser: me {\n      ...SignedInUser\n    }\n  }\n  categories {\n    findAll {\n      categoryId\n      title\n    }\n  }\n  kitchens {\n    findAll {\n      kitchenId\n      title\n    }\n  }\n  allergies {\n    findAll {\n      allergyId\n      title\n    }\n  }\n}':
        types.GetIndividualRequestPageDataDocument,
    'query GetPublicCookPageData($cookId: String!) {\n  users {\n    signedInUser: me {\n      ...SignedInUser\n    }\n  }\n  publicCooks {\n    findOne(cookId: $cookId) {\n      cookId\n      user {\n        userId\n        firstName\n        profilePictureUrl\n      }\n      rank\n      biography\n      location {\n        latitude\n        longitude\n      }\n      travelExpenses\n      createdAt\n    }\n  }\n}':
        types.GetPublicCookPageDataDocument,
    'query GetCookProfileQuery($cookId: String!) {\n  cooks {\n    findOne(cookId: $cookId) {\n      cookId\n      user {\n        firstName\n        lastName\n        profilePictureUrl\n        addresses {\n          addressId\n          title\n          country\n          city\n          postCode\n          street\n          houseNumber\n          location {\n            latitude\n            longitude\n          }\n          createdAt\n        }\n      }\n      languages {\n        languageId\n        title\n      }\n      isLocked\n      isVisible\n      biography\n      location {\n        latitude\n        longitude\n      }\n      maximumParticipants\n      maximumPrice\n      maximumTravelDistance\n      minimumParticipants\n      minimumPrice\n      rank\n      travelExpenses\n      ratingAverage\n      ratingCount\n    }\n  }\n}':
        types.GetCookProfileQueryDocument,
    'mutation AddOneCookLanguage($cookId: String!, $languageId: String!) {\n  cooks {\n    success: addOneLanguage(cookId: $cookId, languageId: $languageId)\n  }\n}':
        types.AddOneCookLanguageDocument,
    'mutation RemoveOneCookLanguage($cookId: String!, $languageId: String!) {\n  cooks {\n    success: removeOneLanguage(cookId: $cookId, languageId: $languageId)\n  }\n}':
        types.RemoveOneCookLanguageDocument,
    'mutation CreateOneCookMeal($meal: CreateOneMealRequest!, $cookId: String!, $image: Upload) {\n  cooks {\n    meals(cookId: $cookId) {\n      success: createOne(meal: $meal, image: $image)\n    }\n  }\n}':
        types.CreateOneCookMealDocument,
    'mutation DeleteOneCookMeal($mealId: String!, $cookId: String!) {\n  cooks {\n    meals(cookId: $cookId) {\n      success: deleteOne(mealId: $mealId)\n    }\n  }\n}':
        types.DeleteOneCookMealDocument,
    'query FindCookMeal($mealId: String!, $cookId: String!) {\n  cooks {\n    meals(cookId: $cookId) {\n      findOne(mealId: $mealId) {\n        mealId\n        title\n        description\n        imageUrl\n        type\n        createdAt\n      }\n    }\n  }\n}':
        types.FindCookMealDocument,
    'query FindCookMeals($cookId: String!) {\n  cooks {\n    meals(cookId: $cookId) {\n      findMany {\n        mealId\n        cookId\n        title\n        type\n        description\n        imageUrl\n        createdAt\n      }\n    }\n  }\n}':
        types.FindCookMealsDocument,
    'mutation UpdateCookMealDescription($mealId: String!, $description: String!, $cookId: String!) {\n  cooks {\n    meals(cookId: $cookId) {\n      success: updateDescription(mealId: $mealId, description: $description)\n    }\n  }\n}':
        types.UpdateCookMealDescriptionDocument,
    'mutation UpdateCookMealImage($mealId: String!, $cookId: String!, $image: Upload) {\n  cooks {\n    meals(cookId: $cookId) {\n      success: updateImage(mealId: $mealId, image: $image)\n    }\n  }\n}':
        types.UpdateCookMealImageDocument,
    'mutation UpdateCookMealTitle($mealId: String!, $title: String!, $cookId: String!) {\n  cooks {\n    meals(cookId: $cookId) {\n      success: updateTitle(mealId: $mealId, title: $title)\n    }\n  }\n}':
        types.UpdateCookMealTitleDocument,
    'mutation UpdateCookMealType($mealId: String!, $type: MealType!, $cookId: String!) {\n  cooks {\n    meals(cookId: $cookId) {\n      success: updateType(mealId: $mealId, type: $type)\n    }\n  }\n}':
        types.UpdateCookMealTypeDocument,
    'mutation CreateOneCookMenu($menu: CreateOneMenuRequest!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: createOne(menu: $menu)\n    }\n  }\n}':
        types.CreateOneCookMenuDocument,
    'mutation DeleteOneCookMenu($menuId: String!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: deleteOne(menuId: $menuId)\n    }\n  }\n}':
        types.DeleteOneCookMenuDocument,
    'query FindCookMenu($menuId: String!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      findOne(menuId: $menuId) {\n        menuId\n        isVisible\n        title\n        description\n        basePrice\n        basePriceCustomers\n        pricePerAdult\n        pricePerChild\n        currencyCode\n        greetingFromKitchen\n        preparationTime\n        kitchen {\n          kitchenId\n          title\n        }\n        categories {\n          categoryId\n          title\n        }\n        createdAt\n      }\n    }\n  }\n}':
        types.FindCookMenuDocument,
    'query FindCookMenus($cookId: String!) {\n  users {\n    me {\n      firstName\n      profilePictureUrl\n    }\n  }\n  cooks {\n    menus(cookId: $cookId) {\n      findMany {\n        menuId\n        title\n        description\n        basePrice\n        basePriceCustomers\n        createdAt\n        currencyCode\n        preparationTime\n        pricePerAdult\n        pricePerChild\n        isVisible\n        categories {\n          categoryId\n          title\n        }\n        kitchen {\n          kitchenId\n          title\n        }\n      }\n    }\n  }\n}':
        types.FindCookMenusDocument,
    'mutation UpdateCookMenuBasePrice($menuId: String!, $basePrice: UnsignedInt!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: updateBasePrice(menuId: $menuId, basePrice: $basePrice)\n    }\n  }\n}':
        types.UpdateCookMenuBasePriceDocument,
    'mutation UpdateCookMenuBasePriceCustomers($menuId: String!, $basePriceCustomers: UnsignedInt!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: updateBasePriceCustomers(\n        menuId: $menuId\n        basePriceCustomers: $basePriceCustomers\n      )\n    }\n  }\n}':
        types.UpdateCookMenuBasePriceCustomersDocument,
    'mutation UpdateCookMenuCurrencyCode($menuId: String!, $currencyCode: CurrencyCode!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: updateCurrencyCode(menuId: $menuId, currencyCode: $currencyCode)\n    }\n  }\n}':
        types.UpdateCookMenuCurrencyCodeDocument,
    'mutation UpdateCookMenuDescription($menuId: String!, $description: String!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: updateDescription(menuId: $menuId, description: $description)\n    }\n  }\n}':
        types.UpdateCookMenuDescriptionDocument,
    'mutation UpdateCookMenuGreetingFromKitchen($menuId: String!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: updateGreetingFromKitchen(menuId: $menuId)\n    }\n  }\n}':
        types.UpdateCookMenuGreetingFromKitchenDocument,
    'mutation UpdateCookMenuIsVisible($menuId: String!, $isVisible: Boolean!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: updateIsVisible(menuId: $menuId, isVisible: $isVisible)\n    }\n  }\n}':
        types.UpdateCookMenuIsVisibleDocument,
    'mutation UpdateCookMenuKitchenId($menuId: String!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: updateKitchenId(menuId: $menuId)\n    }\n  }\n}':
        types.UpdateCookMenuKitchenIdDocument,
    'mutation UpdateCookMenuPreparationTime($menuId: String!, $preparationTime: UnsignedInt!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: updatePreparationTime(\n        menuId: $menuId\n        preparationTime: $preparationTime\n      )\n    }\n  }\n}':
        types.UpdateCookMenuPreparationTimeDocument,
    'mutation UpdateCookMenuPricePerAdult($menuId: String!, $pricePerAdult: UnsignedInt!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: updatePricePerAdult(menuId: $menuId, pricePerAdult: $pricePerAdult)\n    }\n  }\n}':
        types.UpdateCookMenuPricePerAdultDocument,
    'mutation UpdateCookMenuPricePerChild($menuId: String!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: updatePricePerChild(menuId: $menuId)\n    }\n  }\n}':
        types.UpdateCookMenuPricePerChildDocument,
    'mutation UpdateCookMenuTitle($menuId: String!, $title: String!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: updateTitle(menuId: $menuId, title: $title)\n    }\n  }\n}':
        types.UpdateCookMenuTitleDocument,
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
    'mutation UpdateCookMaximumTravelDistance($cookId: String!, $maximumTravelDistance: UnsignedInt) {\n  cooks {\n    success: updateMaximumTravelDistance(\n      cookId: $cookId\n      maximumTravelDistance: $maximumTravelDistance\n    )\n  }\n}':
        types.UpdateCookMaximumTravelDistanceDocument,
    'mutation UpdateCookMinimumParticipants($cookId: String!) {\n  cooks {\n    success: updateMinimumParticipants(cookId: $cookId)\n  }\n}':
        types.UpdateCookMinimumParticipantsDocument,
    'mutation UpdateCookMinimumPrice($cookId: String!) {\n  cooks {\n    success: updateMinimumPrice(cookId: $cookId)\n  }\n}':
        types.UpdateCookMinimumPriceDocument,
    'mutation UpdateCookRank($cookId: String!, $rank: CookRank!) {\n  cooks {\n    success: updateRank(cookId: $cookId, rank: $rank)\n  }\n}':
        types.UpdateCookRankDocument,
    'mutation UpdateCookTravelExpenses($cookId: String!, $travelExpenses: UnsignedInt!) {\n  cooks {\n    success: updateTravelExpenses(cookId: $cookId, travelExpenses: $travelExpenses)\n  }\n}':
        types.UpdateCookTravelExpensesDocument,
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
    'mutation UpdateOneUserAddress($addressId: String!, $address: CreateOneAddressRequest!, $userId: String!) {\n  users {\n    addresses(userId: $userId) {\n      success: update(addressId: $addressId, address: $address)\n    }\n  }\n}':
        types.UpdateOneUserAddressDocument,
    'mutation UpdateUserGender($userId: String!, $gender: Gender!) {\n  users {\n    success: updateGender(userId: $userId, gender: $gender)\n  }\n}':
        types.UpdateUserGenderDocument,
    'mutation UpdateUserPassword($userId: String!, $password: String!) {\n  users {\n    success: updatePassword(userId: $userId, password: $password)\n  }\n}':
        types.UpdateUserPasswordDocument,
    'mutation UpdateUserProfilePicture($userId: String!, $profilePicture: Upload) {\n  users {\n    success: updateProfilePicture(userId: $userId, profilePicture: $profilePicture)\n  }\n}':
        types.UpdateUserProfilePictureDocument,
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
    source: 'mutation CreateOneUserByEmailAddress($request: CreateOneUserByEmailAddressRequest!, $profilePicture: Upload) {\n  users {\n    success: createOneByEmailAddress(\n      request: $request\n      profilePicture: $profilePicture\n    )\n  }\n}',
): (typeof documents)['mutation CreateOneUserByEmailAddress($request: CreateOneUserByEmailAddressRequest!, $profilePicture: Upload) {\n  users {\n    success: createOneByEmailAddress(\n      request: $request\n      profilePicture: $profilePicture\n    )\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation ExpireCurrentSession($userId: String!) {\n  users {\n    sessions(userId: $userId) {\n      success: expireCurrent\n    }\n  }\n}',
): (typeof documents)['mutation ExpireCurrentSession($userId: String!) {\n  users {\n    sessions(userId: $userId) {\n      success: expireCurrent\n    }\n  }\n}'];
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
    source: 'query FindLanguages {\n  languages {\n    findAll {\n      languageId\n      title\n    }\n  }\n}',
): (typeof documents)['query FindLanguages {\n  languages {\n    findAll {\n      languageId\n      title\n    }\n  }\n}'];
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
    source: 'query GetCookSignUpPageData {\n  users {\n    signedInUser: me {\n      ...SignedInUser\n    }\n  }\n  languages {\n    findAll {\n      languageId\n      title\n    }\n  }\n}',
): (typeof documents)['query GetCookSignUpPageData {\n  users {\n    signedInUser: me {\n      ...SignedInUser\n    }\n  }\n  languages {\n    findAll {\n      languageId\n      title\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'query GetIndividualRequestPageData {\n  users {\n    signedInUser: me {\n      ...SignedInUser\n    }\n  }\n  categories {\n    findAll {\n      categoryId\n      title\n    }\n  }\n  kitchens {\n    findAll {\n      kitchenId\n      title\n    }\n  }\n  allergies {\n    findAll {\n      allergyId\n      title\n    }\n  }\n}',
): (typeof documents)['query GetIndividualRequestPageData {\n  users {\n    signedInUser: me {\n      ...SignedInUser\n    }\n  }\n  categories {\n    findAll {\n      categoryId\n      title\n    }\n  }\n  kitchens {\n    findAll {\n      kitchenId\n      title\n    }\n  }\n  allergies {\n    findAll {\n      allergyId\n      title\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'query GetPublicCookPageData($cookId: String!) {\n  users {\n    signedInUser: me {\n      ...SignedInUser\n    }\n  }\n  publicCooks {\n    findOne(cookId: $cookId) {\n      cookId\n      user {\n        userId\n        firstName\n        profilePictureUrl\n      }\n      rank\n      biography\n      location {\n        latitude\n        longitude\n      }\n      travelExpenses\n      createdAt\n    }\n  }\n}',
): (typeof documents)['query GetPublicCookPageData($cookId: String!) {\n  users {\n    signedInUser: me {\n      ...SignedInUser\n    }\n  }\n  publicCooks {\n    findOne(cookId: $cookId) {\n      cookId\n      user {\n        userId\n        firstName\n        profilePictureUrl\n      }\n      rank\n      biography\n      location {\n        latitude\n        longitude\n      }\n      travelExpenses\n      createdAt\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'query GetCookProfileQuery($cookId: String!) {\n  cooks {\n    findOne(cookId: $cookId) {\n      cookId\n      user {\n        firstName\n        lastName\n        profilePictureUrl\n        addresses {\n          addressId\n          title\n          country\n          city\n          postCode\n          street\n          houseNumber\n          location {\n            latitude\n            longitude\n          }\n          createdAt\n        }\n      }\n      languages {\n        languageId\n        title\n      }\n      isLocked\n      isVisible\n      biography\n      location {\n        latitude\n        longitude\n      }\n      maximumParticipants\n      maximumPrice\n      maximumTravelDistance\n      minimumParticipants\n      minimumPrice\n      rank\n      travelExpenses\n      ratingAverage\n      ratingCount\n    }\n  }\n}',
): (typeof documents)['query GetCookProfileQuery($cookId: String!) {\n  cooks {\n    findOne(cookId: $cookId) {\n      cookId\n      user {\n        firstName\n        lastName\n        profilePictureUrl\n        addresses {\n          addressId\n          title\n          country\n          city\n          postCode\n          street\n          houseNumber\n          location {\n            latitude\n            longitude\n          }\n          createdAt\n        }\n      }\n      languages {\n        languageId\n        title\n      }\n      isLocked\n      isVisible\n      biography\n      location {\n        latitude\n        longitude\n      }\n      maximumParticipants\n      maximumPrice\n      maximumTravelDistance\n      minimumParticipants\n      minimumPrice\n      rank\n      travelExpenses\n      ratingAverage\n      ratingCount\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation AddOneCookLanguage($cookId: String!, $languageId: String!) {\n  cooks {\n    success: addOneLanguage(cookId: $cookId, languageId: $languageId)\n  }\n}',
): (typeof documents)['mutation AddOneCookLanguage($cookId: String!, $languageId: String!) {\n  cooks {\n    success: addOneLanguage(cookId: $cookId, languageId: $languageId)\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation RemoveOneCookLanguage($cookId: String!, $languageId: String!) {\n  cooks {\n    success: removeOneLanguage(cookId: $cookId, languageId: $languageId)\n  }\n}',
): (typeof documents)['mutation RemoveOneCookLanguage($cookId: String!, $languageId: String!) {\n  cooks {\n    success: removeOneLanguage(cookId: $cookId, languageId: $languageId)\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation CreateOneCookMeal($meal: CreateOneMealRequest!, $cookId: String!, $image: Upload) {\n  cooks {\n    meals(cookId: $cookId) {\n      success: createOne(meal: $meal, image: $image)\n    }\n  }\n}',
): (typeof documents)['mutation CreateOneCookMeal($meal: CreateOneMealRequest!, $cookId: String!, $image: Upload) {\n  cooks {\n    meals(cookId: $cookId) {\n      success: createOne(meal: $meal, image: $image)\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation DeleteOneCookMeal($mealId: String!, $cookId: String!) {\n  cooks {\n    meals(cookId: $cookId) {\n      success: deleteOne(mealId: $mealId)\n    }\n  }\n}',
): (typeof documents)['mutation DeleteOneCookMeal($mealId: String!, $cookId: String!) {\n  cooks {\n    meals(cookId: $cookId) {\n      success: deleteOne(mealId: $mealId)\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'query FindCookMeal($mealId: String!, $cookId: String!) {\n  cooks {\n    meals(cookId: $cookId) {\n      findOne(mealId: $mealId) {\n        mealId\n        title\n        description\n        imageUrl\n        type\n        createdAt\n      }\n    }\n  }\n}',
): (typeof documents)['query FindCookMeal($mealId: String!, $cookId: String!) {\n  cooks {\n    meals(cookId: $cookId) {\n      findOne(mealId: $mealId) {\n        mealId\n        title\n        description\n        imageUrl\n        type\n        createdAt\n      }\n    }\n  }\n}'];
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
    source: 'mutation UpdateCookMealDescription($mealId: String!, $description: String!, $cookId: String!) {\n  cooks {\n    meals(cookId: $cookId) {\n      success: updateDescription(mealId: $mealId, description: $description)\n    }\n  }\n}',
): (typeof documents)['mutation UpdateCookMealDescription($mealId: String!, $description: String!, $cookId: String!) {\n  cooks {\n    meals(cookId: $cookId) {\n      success: updateDescription(mealId: $mealId, description: $description)\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation UpdateCookMealImage($mealId: String!, $cookId: String!, $image: Upload) {\n  cooks {\n    meals(cookId: $cookId) {\n      success: updateImage(mealId: $mealId, image: $image)\n    }\n  }\n}',
): (typeof documents)['mutation UpdateCookMealImage($mealId: String!, $cookId: String!, $image: Upload) {\n  cooks {\n    meals(cookId: $cookId) {\n      success: updateImage(mealId: $mealId, image: $image)\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation UpdateCookMealTitle($mealId: String!, $title: String!, $cookId: String!) {\n  cooks {\n    meals(cookId: $cookId) {\n      success: updateTitle(mealId: $mealId, title: $title)\n    }\n  }\n}',
): (typeof documents)['mutation UpdateCookMealTitle($mealId: String!, $title: String!, $cookId: String!) {\n  cooks {\n    meals(cookId: $cookId) {\n      success: updateTitle(mealId: $mealId, title: $title)\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation UpdateCookMealType($mealId: String!, $type: MealType!, $cookId: String!) {\n  cooks {\n    meals(cookId: $cookId) {\n      success: updateType(mealId: $mealId, type: $type)\n    }\n  }\n}',
): (typeof documents)['mutation UpdateCookMealType($mealId: String!, $type: MealType!, $cookId: String!) {\n  cooks {\n    meals(cookId: $cookId) {\n      success: updateType(mealId: $mealId, type: $type)\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation CreateOneCookMenu($menu: CreateOneMenuRequest!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: createOne(menu: $menu)\n    }\n  }\n}',
): (typeof documents)['mutation CreateOneCookMenu($menu: CreateOneMenuRequest!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: createOne(menu: $menu)\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation DeleteOneCookMenu($menuId: String!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: deleteOne(menuId: $menuId)\n    }\n  }\n}',
): (typeof documents)['mutation DeleteOneCookMenu($menuId: String!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: deleteOne(menuId: $menuId)\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'query FindCookMenu($menuId: String!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      findOne(menuId: $menuId) {\n        menuId\n        isVisible\n        title\n        description\n        basePrice\n        basePriceCustomers\n        pricePerAdult\n        pricePerChild\n        currencyCode\n        greetingFromKitchen\n        preparationTime\n        kitchen {\n          kitchenId\n          title\n        }\n        categories {\n          categoryId\n          title\n        }\n        createdAt\n      }\n    }\n  }\n}',
): (typeof documents)['query FindCookMenu($menuId: String!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      findOne(menuId: $menuId) {\n        menuId\n        isVisible\n        title\n        description\n        basePrice\n        basePriceCustomers\n        pricePerAdult\n        pricePerChild\n        currencyCode\n        greetingFromKitchen\n        preparationTime\n        kitchen {\n          kitchenId\n          title\n        }\n        categories {\n          categoryId\n          title\n        }\n        createdAt\n      }\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'query FindCookMenus($cookId: String!) {\n  users {\n    me {\n      firstName\n      profilePictureUrl\n    }\n  }\n  cooks {\n    menus(cookId: $cookId) {\n      findMany {\n        menuId\n        title\n        description\n        basePrice\n        basePriceCustomers\n        createdAt\n        currencyCode\n        preparationTime\n        pricePerAdult\n        pricePerChild\n        isVisible\n        categories {\n          categoryId\n          title\n        }\n        kitchen {\n          kitchenId\n          title\n        }\n      }\n    }\n  }\n}',
): (typeof documents)['query FindCookMenus($cookId: String!) {\n  users {\n    me {\n      firstName\n      profilePictureUrl\n    }\n  }\n  cooks {\n    menus(cookId: $cookId) {\n      findMany {\n        menuId\n        title\n        description\n        basePrice\n        basePriceCustomers\n        createdAt\n        currencyCode\n        preparationTime\n        pricePerAdult\n        pricePerChild\n        isVisible\n        categories {\n          categoryId\n          title\n        }\n        kitchen {\n          kitchenId\n          title\n        }\n      }\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation UpdateCookMenuBasePrice($menuId: String!, $basePrice: UnsignedInt!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: updateBasePrice(menuId: $menuId, basePrice: $basePrice)\n    }\n  }\n}',
): (typeof documents)['mutation UpdateCookMenuBasePrice($menuId: String!, $basePrice: UnsignedInt!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: updateBasePrice(menuId: $menuId, basePrice: $basePrice)\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation UpdateCookMenuBasePriceCustomers($menuId: String!, $basePriceCustomers: UnsignedInt!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: updateBasePriceCustomers(\n        menuId: $menuId\n        basePriceCustomers: $basePriceCustomers\n      )\n    }\n  }\n}',
): (typeof documents)['mutation UpdateCookMenuBasePriceCustomers($menuId: String!, $basePriceCustomers: UnsignedInt!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: updateBasePriceCustomers(\n        menuId: $menuId\n        basePriceCustomers: $basePriceCustomers\n      )\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation UpdateCookMenuCurrencyCode($menuId: String!, $currencyCode: CurrencyCode!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: updateCurrencyCode(menuId: $menuId, currencyCode: $currencyCode)\n    }\n  }\n}',
): (typeof documents)['mutation UpdateCookMenuCurrencyCode($menuId: String!, $currencyCode: CurrencyCode!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: updateCurrencyCode(menuId: $menuId, currencyCode: $currencyCode)\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation UpdateCookMenuDescription($menuId: String!, $description: String!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: updateDescription(menuId: $menuId, description: $description)\n    }\n  }\n}',
): (typeof documents)['mutation UpdateCookMenuDescription($menuId: String!, $description: String!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: updateDescription(menuId: $menuId, description: $description)\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation UpdateCookMenuGreetingFromKitchen($menuId: String!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: updateGreetingFromKitchen(menuId: $menuId)\n    }\n  }\n}',
): (typeof documents)['mutation UpdateCookMenuGreetingFromKitchen($menuId: String!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: updateGreetingFromKitchen(menuId: $menuId)\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation UpdateCookMenuIsVisible($menuId: String!, $isVisible: Boolean!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: updateIsVisible(menuId: $menuId, isVisible: $isVisible)\n    }\n  }\n}',
): (typeof documents)['mutation UpdateCookMenuIsVisible($menuId: String!, $isVisible: Boolean!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: updateIsVisible(menuId: $menuId, isVisible: $isVisible)\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation UpdateCookMenuKitchenId($menuId: String!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: updateKitchenId(menuId: $menuId)\n    }\n  }\n}',
): (typeof documents)['mutation UpdateCookMenuKitchenId($menuId: String!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: updateKitchenId(menuId: $menuId)\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation UpdateCookMenuPreparationTime($menuId: String!, $preparationTime: UnsignedInt!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: updatePreparationTime(\n        menuId: $menuId\n        preparationTime: $preparationTime\n      )\n    }\n  }\n}',
): (typeof documents)['mutation UpdateCookMenuPreparationTime($menuId: String!, $preparationTime: UnsignedInt!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: updatePreparationTime(\n        menuId: $menuId\n        preparationTime: $preparationTime\n      )\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation UpdateCookMenuPricePerAdult($menuId: String!, $pricePerAdult: UnsignedInt!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: updatePricePerAdult(menuId: $menuId, pricePerAdult: $pricePerAdult)\n    }\n  }\n}',
): (typeof documents)['mutation UpdateCookMenuPricePerAdult($menuId: String!, $pricePerAdult: UnsignedInt!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: updatePricePerAdult(menuId: $menuId, pricePerAdult: $pricePerAdult)\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation UpdateCookMenuPricePerChild($menuId: String!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: updatePricePerChild(menuId: $menuId)\n    }\n  }\n}',
): (typeof documents)['mutation UpdateCookMenuPricePerChild($menuId: String!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: updatePricePerChild(menuId: $menuId)\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation UpdateCookMenuTitle($menuId: String!, $title: String!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: updateTitle(menuId: $menuId, title: $title)\n    }\n  }\n}',
): (typeof documents)['mutation UpdateCookMenuTitle($menuId: String!, $title: String!, $cookId: String!) {\n  cooks {\n    menus(cookId: $cookId) {\n      success: updateTitle(menuId: $menuId, title: $title)\n    }\n  }\n}'];
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
    source: 'mutation UpdateCookMaximumTravelDistance($cookId: String!, $maximumTravelDistance: UnsignedInt) {\n  cooks {\n    success: updateMaximumTravelDistance(\n      cookId: $cookId\n      maximumTravelDistance: $maximumTravelDistance\n    )\n  }\n}',
): (typeof documents)['mutation UpdateCookMaximumTravelDistance($cookId: String!, $maximumTravelDistance: UnsignedInt) {\n  cooks {\n    success: updateMaximumTravelDistance(\n      cookId: $cookId\n      maximumTravelDistance: $maximumTravelDistance\n    )\n  }\n}'];
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
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation UpdateOneUserAddress($addressId: String!, $address: CreateOneAddressRequest!, $userId: String!) {\n  users {\n    addresses(userId: $userId) {\n      success: update(addressId: $addressId, address: $address)\n    }\n  }\n}',
): (typeof documents)['mutation UpdateOneUserAddress($addressId: String!, $address: CreateOneAddressRequest!, $userId: String!) {\n  users {\n    addresses(userId: $userId) {\n      success: update(addressId: $addressId, address: $address)\n    }\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation UpdateUserGender($userId: String!, $gender: Gender!) {\n  users {\n    success: updateGender(userId: $userId, gender: $gender)\n  }\n}',
): (typeof documents)['mutation UpdateUserGender($userId: String!, $gender: Gender!) {\n  users {\n    success: updateGender(userId: $userId, gender: $gender)\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation UpdateUserPassword($userId: String!, $password: String!) {\n  users {\n    success: updatePassword(userId: $userId, password: $password)\n  }\n}',
): (typeof documents)['mutation UpdateUserPassword($userId: String!, $password: String!) {\n  users {\n    success: updatePassword(userId: $userId, password: $password)\n  }\n}'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
    source: 'mutation UpdateUserProfilePicture($userId: String!, $profilePicture: Upload) {\n  users {\n    success: updateProfilePicture(userId: $userId, profilePicture: $profilePicture)\n  }\n}',
): (typeof documents)['mutation UpdateUserProfilePicture($userId: String!, $profilePicture: Upload) {\n  users {\n    success: updateProfilePicture(userId: $userId, profilePicture: $profilePicture)\n  }\n}'];

export function gql(source: string) {
    return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<infer TType, any>
    ? TType
    : never;
