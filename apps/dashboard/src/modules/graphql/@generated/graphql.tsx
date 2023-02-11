import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AddPlantToContainerInput = {
  containerUuid: Scalars['String'];
  plantUuid: Scalars['String'];
};

export type Auth = {
  __typename?: 'Auth';
  /** JWT access token */
  accessToken: Scalars['String'];
  /** JWT refresh token */
  refreshToken: Scalars['String'];
  user: User;
};

export type Container = {
  __typename?: 'Container';
  createdAt: Scalars['DateTime'];
  /** Dirth depth of the container */
  dirtDepth: Scalars['Float'];
  /** Type of the container */
  type: ContainerType;
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
  uuid: Scalars['String'];
};

export type ContainerResponse = {
  __typename?: 'ContainerResponse';
  container?: Maybe<Container>;
  errors?: Maybe<Array<Error>>;
};

/** The type of a conatiner */
export enum ContainerType {
  Bag = 'Bag',
  Plot = 'Plot',
}

export type ContainersResponse = {
  __typename?: 'ContainersResponse';
  containers?: Maybe<Array<Container>>;
  errors?: Maybe<Array<Error>>;
};

export type CreateContainerInput = {
  /** Dirth depth of the container */
  dirtDepth: Scalars['Float'];
  /** Type of the container */
  type: ContainerType;
  /** Owner of the container */
  userUuid: Scalars['String'];
};

export type CreateHeightRegistrationInput = {
  height: Scalars['Float'];
  plantUuid: Scalars['String'];
};

export type CreatePlantInput = {
  container: FindContainerInput;
  plantedSeedsOn?: InputMaybe<Scalars['DateTime']>;
  seedsSproutedOn?: InputMaybe<Scalars['DateTime']>;
  type: PlantType;
  variety: Scalars['String'];
};

export type DeleteObjectResponse = {
  __typename?: 'DeleteObjectResponse';
  deleted?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<Error>>;
};

export type Error = {
  __typename?: 'Error';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FindContainerInput = {
  uuid: Scalars['String'];
};

export type FindHeightRegistrationInput = {
  height?: InputMaybe<Scalars['Float']>;
  uuid?: InputMaybe<Scalars['String']>;
};

export type FindPlantInput = {
  uuid: Scalars['String'];
};

export type FindUserContainersInput = {
  userUuid: Scalars['String'];
};

export type FindUserInput = {
  uuid: Scalars['String'];
};

export type HeightRegistration = {
  __typename?: 'HeightRegistration';
  createdAt: Scalars['DateTime'];
  height?: Maybe<Scalars['Float']>;
  plant?: Maybe<Plant>;
  updatedAt: Scalars['DateTime'];
  uuid: Scalars['String'];
};

export type HeightRegistrationResponse = {
  __typename?: 'HeightRegistrationResponse';
  errors?: Maybe<Array<Error>>;
  heightRegistration?: Maybe<HeightRegistration>;
};

export type HeightRegistrationsResponse = {
  __typename?: 'HeightRegistrationsResponse';
  errors?: Maybe<Array<Error>>;
  heightRegistrations?: Maybe<Array<HeightRegistration>>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addPlantToContainer: ContainerResponse;
  createContainer: ContainerResponse;
  createHeightRegistration: HeightRegistrationResponse;
  createPlant: PlantResponse;
  deleteContainer: DeleteObjectResponse;
  deleteHeightRegistration: DeleteObjectResponse;
  deletePlant: DeleteObjectResponse;
  login: Auth;
  refreshToken: Token;
  removePlantFromContainer: DeleteObjectResponse;
  signup: Auth;
  updatePlant: PlantResponse;
};

export type MutationAddPlantToContainerArgs = {
  input: AddPlantToContainerInput;
};

export type MutationCreateContainerArgs = {
  input: CreateContainerInput;
};

export type MutationCreateHeightRegistrationArgs = {
  input: CreateHeightRegistrationInput;
};

export type MutationCreatePlantArgs = {
  input: CreatePlantInput;
};

export type MutationDeleteContainerArgs = {
  input: FindContainerInput;
};

export type MutationDeleteHeightRegistrationArgs = {
  find: FindHeightRegistrationInput;
};

export type MutationDeletePlantArgs = {
  input: FindPlantInput;
};

export type MutationLoginArgs = {
  data: LoginInput;
};

export type MutationRefreshTokenArgs = {
  input: RefreshTokenInput;
};

export type MutationRemovePlantFromContainerArgs = {
  input: RemovePlantFromContainerInput;
};

export type MutationSignupArgs = {
  data: SignupInput;
};

export type MutationUpdatePlantArgs = {
  input: UpdatePlantInput;
};

export type Plant = {
  __typename?: 'Plant';
  container?: Maybe<Container>;
  createdAt: Scalars['DateTime'];
  plantedSeedsOn?: Maybe<Scalars['DateTime']>;
  seedsSproutedOn?: Maybe<Scalars['DateTime']>;
  type?: Maybe<PlantType>;
  updatedAt: Scalars['DateTime'];
  uuid: Scalars['String'];
  variety?: Maybe<Scalars['String']>;
};

export type PlantResponse = {
  __typename?: 'PlantResponse';
  errors?: Maybe<Array<Error>>;
  plant?: Maybe<Plant>;
};

/** Used for declaring the type of plant. */
export enum PlantType {
  Bean = 'BEAN',
  Beet = 'BEET',
  Broccoli = 'BROCCOLI',
  Cabbage = 'CABBAGE',
  Carrot = 'CARROT',
  Celery = 'CELERY',
  Corn = 'CORN',
  Cucumber = 'CUCUMBER',
  Eggplant = 'EGGPLANT',
  Garlic = 'GARLIC',
  Ginger = 'GINGER',
  GreenBean = 'GREEN_BEAN',
  Kale = 'KALE',
  Lettuce = 'LETTUCE',
  Mustard = 'MUSTARD',
  None = 'NONE',
  Onion = 'ONION',
  Pea = 'PEA',
  Pepper = 'PEPPER',
  Potato = 'POTATO',
  Squash = 'SQUASH',
  Tomato = 'TOMATO',
  Watermelon = 'WATERMELON',
}

export type PlantsResponse = {
  __typename?: 'PlantsResponse';
  errors?: Maybe<Array<Error>>;
  plants?: Maybe<Array<Plant>>;
};

export type Query = {
  __typename?: 'Query';
  findContainer: ContainerResponse;
  findContainers: ContainersResponse;
  findHeightRegistration: HeightRegistrationResponse;
  findPlant: PlantResponse;
  findPlantHeightRegistrations: HeightRegistrationsResponse;
  findPlants: PlantsResponse;
  findUser: UserResponse;
  findUserContainers: ContainersResponse;
};

export type QueryFindContainerArgs = {
  input: FindContainerInput;
};

export type QueryFindContainersArgs = {
  input: FindContainerInput;
};

export type QueryFindHeightRegistrationArgs = {
  find: FindHeightRegistrationInput;
};

export type QueryFindPlantArgs = {
  input: FindPlantInput;
};

export type QueryFindPlantHeightRegistrationsArgs = {
  find: FindPlantInput;
};

export type QueryFindPlantsArgs = {
  input: FindPlantInput;
};

export type QueryFindUserArgs = {
  input: FindUserInput;
};

export type QueryFindUserContainersArgs = {
  input: FindUserContainersInput;
};

export type RefreshTokenInput = {
  token: Scalars['String'];
};

export type RemovePlantFromContainerInput = {
  containerUuid: Scalars['String'];
  plantUuid: Scalars['String'];
};

export type SignupInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Token = {
  __typename?: 'Token';
  /** JWT access token */
  accessToken: Scalars['String'];
  /** JWT refresh token */
  refreshToken: Scalars['String'];
};

export type UpdatePlantInput = {
  data: UpdatePlantInputData;
  find: FindPlantInput;
};

export type UpdatePlantInputData = {
  plantedSeedsOn?: InputMaybe<Scalars['DateTime']>;
  seedsSproutedOn?: InputMaybe<Scalars['DateTime']>;
  type?: InputMaybe<PlantType>;
  variety?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
  uuid: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<Error>>;
  user?: Maybe<User>;
};

export type ErrorFragment = { __typename?: 'Error'; field: string; message: string };

export type ContainerFragment = {
  __typename?: 'Container';
  uuid: string;
  type: ContainerType;
  dirtDepth: number;
  createdAt: any;
  updatedAt: any;
  user?: { __typename?: 'User'; uuid: string; username: string; email: string; createdAt: any; updatedAt: any } | null;
};

export type ContainerResponseFragment = {
  __typename?: 'ContainerResponse';
  container?: {
    __typename?: 'Container';
    uuid: string;
    type: ContainerType;
    dirtDepth: number;
    createdAt: any;
    updatedAt: any;
    user?: {
      __typename?: 'User';
      uuid: string;
      username: string;
      email: string;
      createdAt: any;
      updatedAt: any;
    } | null;
  } | null;
  errors?: Array<{ __typename?: 'Error'; field: string; message: string }> | null;
};

export type ContainersResponseFragment = {
  __typename?: 'ContainersResponse';
  containers?: Array<{
    __typename?: 'Container';
    uuid: string;
    type: ContainerType;
    dirtDepth: number;
    createdAt: any;
    updatedAt: any;
    user?: {
      __typename?: 'User';
      uuid: string;
      username: string;
      email: string;
      createdAt: any;
      updatedAt: any;
    } | null;
  }> | null;
  errors?: Array<{ __typename?: 'Error'; field: string; message: string }> | null;
};

export type FindContainerQueryVariables = Exact<{
  input: FindContainerInput;
}>;

export type FindContainerQuery = {
  __typename?: 'Query';
  findContainer: {
    __typename?: 'ContainerResponse';
    container?: {
      __typename?: 'Container';
      uuid: string;
      type: ContainerType;
      dirtDepth: number;
      createdAt: any;
      updatedAt: any;
      user?: {
        __typename?: 'User';
        uuid: string;
        username: string;
        email: string;
        createdAt: any;
        updatedAt: any;
      } | null;
    } | null;
    errors?: Array<{ __typename?: 'Error'; field: string; message: string }> | null;
  };
};

export type FindUserContainersQueryVariables = Exact<{
  input: FindUserContainersInput;
}>;

export type FindUserContainersQuery = {
  __typename?: 'Query';
  findUserContainers: {
    __typename?: 'ContainersResponse';
    containers?: Array<{
      __typename?: 'Container';
      uuid: string;
      type: ContainerType;
      dirtDepth: number;
      createdAt: any;
      updatedAt: any;
      user?: {
        __typename?: 'User';
        uuid: string;
        username: string;
        email: string;
        createdAt: any;
        updatedAt: any;
      } | null;
    }> | null;
    errors?: Array<{ __typename?: 'Error'; field: string; message: string }> | null;
  };
};

export type PlantFragment = {
  __typename?: 'Plant';
  uuid: string;
  type?: PlantType | null;
  variety?: string | null;
  plantedSeedsOn?: any | null;
  seedsSproutedOn?: any | null;
  createdAt: any;
  updatedAt: any;
  container?: {
    __typename?: 'Container';
    uuid: string;
    type: ContainerType;
    dirtDepth: number;
    createdAt: any;
    updatedAt: any;
    user?: {
      __typename?: 'User';
      uuid: string;
      username: string;
      email: string;
      createdAt: any;
      updatedAt: any;
    } | null;
  } | null;
};

export type PlantResponseFragment = {
  __typename?: 'PlantResponse';
  plant?: {
    __typename?: 'Plant';
    uuid: string;
    type?: PlantType | null;
    variety?: string | null;
    plantedSeedsOn?: any | null;
    seedsSproutedOn?: any | null;
    createdAt: any;
    updatedAt: any;
    container?: {
      __typename?: 'Container';
      uuid: string;
      type: ContainerType;
      dirtDepth: number;
      createdAt: any;
      updatedAt: any;
      user?: {
        __typename?: 'User';
        uuid: string;
        username: string;
        email: string;
        createdAt: any;
        updatedAt: any;
      } | null;
    } | null;
  } | null;
  errors?: Array<{ __typename?: 'Error'; field: string; message: string }> | null;
};

export type FindPlantQueryVariables = Exact<{
  input: FindPlantInput;
}>;

export type FindPlantQuery = {
  __typename?: 'Query';
  findPlant: {
    __typename?: 'PlantResponse';
    plant?: {
      __typename?: 'Plant';
      uuid: string;
      type?: PlantType | null;
      variety?: string | null;
      plantedSeedsOn?: any | null;
      seedsSproutedOn?: any | null;
      createdAt: any;
      updatedAt: any;
      container?: {
        __typename?: 'Container';
        uuid: string;
        type: ContainerType;
        dirtDepth: number;
        createdAt: any;
        updatedAt: any;
        user?: {
          __typename?: 'User';
          uuid: string;
          username: string;
          email: string;
          createdAt: any;
          updatedAt: any;
        } | null;
      } | null;
    } | null;
    errors?: Array<{ __typename?: 'Error'; field: string; message: string }> | null;
  };
};

export type UserResponseFragment = {
  __typename?: 'UserResponse';
  user?: { __typename?: 'User'; uuid: string; username: string; email: string; createdAt: any; updatedAt: any } | null;
  errors?: Array<{ __typename?: 'Error'; field: string; message: string }> | null;
};

export type UserFragment = {
  __typename?: 'User';
  uuid: string;
  username: string;
  email: string;
  createdAt: any;
  updatedAt: any;
};

export type FindUserQueryVariables = Exact<{
  input: FindUserInput;
}>;

export type FindUserQuery = {
  __typename?: 'Query';
  findUser: {
    __typename?: 'UserResponse';
    user?: {
      __typename?: 'User';
      uuid: string;
      username: string;
      email: string;
      createdAt: any;
      updatedAt: any;
    } | null;
    errors?: Array<{ __typename?: 'Error'; field: string; message: string }> | null;
  };
};

export const UserFragmentDoc = gql`
  fragment User on User {
    uuid
    username
    email
    createdAt
    updatedAt
  }
`;
export const ContainerFragmentDoc = gql`
  fragment Container on Container {
    uuid
    type
    dirtDepth
    user {
      ...User
    }
    createdAt
    updatedAt
  }
  ${UserFragmentDoc}
`;
export const ErrorFragmentDoc = gql`
  fragment Error on Error {
    field
    message
  }
`;
export const ContainerResponseFragmentDoc = gql`
  fragment ContainerResponse on ContainerResponse {
    container {
      ...Container
    }
    errors {
      ...Error
    }
  }
  ${ContainerFragmentDoc}
  ${ErrorFragmentDoc}
`;
export const ContainersResponseFragmentDoc = gql`
  fragment ContainersResponse on ContainersResponse {
    containers {
      ...Container
    }
    errors {
      ...Error
    }
  }
  ${ContainerFragmentDoc}
  ${ErrorFragmentDoc}
`;
export const PlantFragmentDoc = gql`
  fragment Plant on Plant {
    uuid
    type
    variety
    plantedSeedsOn
    seedsSproutedOn
    container {
      ...Container
    }
    createdAt
    updatedAt
  }
  ${ContainerFragmentDoc}
`;
export const PlantResponseFragmentDoc = gql`
  fragment PlantResponse on PlantResponse {
    plant {
      ...Plant
    }
    errors {
      ...Error
    }
  }
  ${PlantFragmentDoc}
  ${ErrorFragmentDoc}
`;
export const UserResponseFragmentDoc = gql`
  fragment UserResponse on UserResponse {
    user {
      ...User
    }
    errors {
      ...Error
    }
  }
  ${UserFragmentDoc}
  ${ErrorFragmentDoc}
`;
export const FindContainerDocument = gql`
  query findContainer($input: FindContainerInput!) {
    findContainer(input: $input) {
      ...ContainerResponse
    }
  }
  ${ContainerResponseFragmentDoc}
`;

/**
 * __useFindContainerQuery__
 *
 * To run a query within a React component, call `useFindContainerQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindContainerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindContainerQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindContainerQuery(
  baseOptions: Apollo.QueryHookOptions<FindContainerQuery, FindContainerQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindContainerQuery, FindContainerQueryVariables>(FindContainerDocument, options);
}
export function useFindContainerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FindContainerQuery, FindContainerQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindContainerQuery, FindContainerQueryVariables>(FindContainerDocument, options);
}
export type FindContainerQueryHookResult = ReturnType<typeof useFindContainerQuery>;
export type FindContainerLazyQueryHookResult = ReturnType<typeof useFindContainerLazyQuery>;
export type FindContainerQueryResult = Apollo.QueryResult<FindContainerQuery, FindContainerQueryVariables>;
export const FindUserContainersDocument = gql`
  query findUserContainers($input: FindUserContainersInput!) {
    findUserContainers(input: $input) {
      ...ContainersResponse
    }
  }
  ${ContainersResponseFragmentDoc}
`;

/**
 * __useFindUserContainersQuery__
 *
 * To run a query within a React component, call `useFindUserContainersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserContainersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserContainersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindUserContainersQuery(
  baseOptions: Apollo.QueryHookOptions<FindUserContainersQuery, FindUserContainersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindUserContainersQuery, FindUserContainersQueryVariables>(
    FindUserContainersDocument,
    options
  );
}
export function useFindUserContainersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FindUserContainersQuery, FindUserContainersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindUserContainersQuery, FindUserContainersQueryVariables>(
    FindUserContainersDocument,
    options
  );
}
export type FindUserContainersQueryHookResult = ReturnType<typeof useFindUserContainersQuery>;
export type FindUserContainersLazyQueryHookResult = ReturnType<typeof useFindUserContainersLazyQuery>;
export type FindUserContainersQueryResult = Apollo.QueryResult<
  FindUserContainersQuery,
  FindUserContainersQueryVariables
>;
export const FindPlantDocument = gql`
  query findPlant($input: FindPlantInput!) {
    findPlant(input: $input) {
      ...PlantResponse
    }
  }
  ${PlantResponseFragmentDoc}
`;

/**
 * __useFindPlantQuery__
 *
 * To run a query within a React component, call `useFindPlantQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPlantQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPlantQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindPlantQuery(baseOptions: Apollo.QueryHookOptions<FindPlantQuery, FindPlantQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindPlantQuery, FindPlantQueryVariables>(FindPlantDocument, options);
}
export function useFindPlantLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FindPlantQuery, FindPlantQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindPlantQuery, FindPlantQueryVariables>(FindPlantDocument, options);
}
export type FindPlantQueryHookResult = ReturnType<typeof useFindPlantQuery>;
export type FindPlantLazyQueryHookResult = ReturnType<typeof useFindPlantLazyQuery>;
export type FindPlantQueryResult = Apollo.QueryResult<FindPlantQuery, FindPlantQueryVariables>;
export const FindUserDocument = gql`
  query findUser($input: FindUserInput!) {
    findUser(input: $input) {
      ...UserResponse
    }
  }
  ${UserResponseFragmentDoc}
`;

/**
 * __useFindUserQuery__
 *
 * To run a query within a React component, call `useFindUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindUserQuery(baseOptions: Apollo.QueryHookOptions<FindUserQuery, FindUserQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindUserQuery, FindUserQueryVariables>(FindUserDocument, options);
}
export function useFindUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUserQuery, FindUserQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindUserQuery, FindUserQueryVariables>(FindUserDocument, options);
}
export type FindUserQueryHookResult = ReturnType<typeof useFindUserQuery>;
export type FindUserLazyQueryHookResult = ReturnType<typeof useFindUserLazyQuery>;
export type FindUserQueryResult = Apollo.QueryResult<FindUserQuery, FindUserQueryVariables>;
