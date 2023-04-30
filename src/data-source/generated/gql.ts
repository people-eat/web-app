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
    'mutation CreateOneUserByEmailAddress($request: CreateOneUserByEmailAddressRequest!) {\n  users {\n    success: createOneByEmailAddress(request: $request)\n  }\n}':
        types.CreateOneUserByEmailAddressDocument,
    'query FindAllergies {\n  allergies {\n    findAll {\n      allergyId\n      title\n    }\n  }\n}': types.FindAllergiesDocument,
    'query FindCategories {\n  categories {\n    findAll {\n      categoryId\n      title\n    }\n  }\n}': types.FindCategoriesDocument,
    'query FindKitchens {\n  kitchens {\n    findAll {\n      kitchenId\n      title\n    }\n  }\n}': types.FindKitchensDocument,
    'query FindManyAdmins {\n  admins {\n    findMany {\n      adminId\n      user {\n        firstName\n        createdAt\n      }\n    }\n  }\n}':
        types.FindManyAdminsDocument,
    'query FindManyCooks($request: FindManyRequest!) {\n  cooks {\n    findMany(request: $request) {\n      cookId\n      user {\n        firstName\n        lastName\n      }\n      rank\n      isLocked\n      biography\n    }\n  }\n}':
        types.FindManyCooksDocument,
    'query FindManyUsers($request: FindManyRequest!) {\n  users {\n    findMany(request: $request) {\n      userId\n      firstName\n      lastName\n      language\n      isCook\n      isAdmin\n    }\n  }\n}':
        types.FindManyUsersDocument,
    'mutation ConfirmOneEmailAddressUpdate($userId: String!, $secret: String!) {\n  users {\n    emailAddressUpdate(userId: $userId) {\n      success: confirm(secret: $secret)\n    }\n  }\n}':
        types.ConfirmOneEmailAddressUpdateDocument,
    'mutation CreateOneEmailAddressUpdate($emailAddress: EmailAddress!, $userId: String!) {\n  users {\n    emailAddressUpdate(userId: $userId) {\n      success: createOne(emailAddress: $emailAddress)\n    }\n  }\n}':
        types.CreateOneEmailAddressUpdateDocument,
    'fragment SignedInUser on User {\n  userId\n  firstName\n  profilePictureUrl\n  isCook\n}': types.SignedInUserFragmentDoc,
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
    source: 'query FindManyUsers($request: FindManyRequest!) {\n  users {\n    findMany(request: $request) {\n      userId\n      firstName\n      lastName\n      language\n      isCook\n      isAdmin\n    }\n  }\n}',
): (typeof documents)['query FindManyUsers($request: FindManyRequest!) {\n  users {\n    findMany(request: $request) {\n      userId\n      firstName\n      lastName\n      language\n      isCook\n      isAdmin\n    }\n  }\n}'];
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
    source: 'fragment SignedInUser on User {\n  userId\n  firstName\n  profilePictureUrl\n  isCook\n}',
): (typeof documents)['fragment SignedInUser on User {\n  userId\n  firstName\n  profilePictureUrl\n  isCook\n}'];
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
