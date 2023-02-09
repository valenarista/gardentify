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
  createdAt?: Maybe<Scalars['DateTime']>;
  /** Dirth depth of the container */
  dirtDepth?: Maybe<Scalars['Float']>;
  /** Type of the container */
  type?: Maybe<ContainerType>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
  uuid?: Maybe<Scalars['String']>;
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
  uuid?: InputMaybe<Scalars['String']>;
};

export type FindHeightRegistrationInput = {
  height?: InputMaybe<Scalars['Float']>;
  uuid?: InputMaybe<Scalars['String']>;
};

export type FindPlantInput = {
  uuid: Scalars['String'];
};

export type FindUserInput = {
  username?: InputMaybe<Scalars['String']>;
};

export type HeightRegistration = {
  __typename?: 'HeightRegistration';
  createdAt?: Maybe<Scalars['DateTime']>;
  height?: Maybe<Scalars['Float']>;
  plant?: Maybe<Plant>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  uuid?: Maybe<Scalars['String']>;
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
  createdAt?: Maybe<Scalars['DateTime']>;
  plantedSeedsOn?: Maybe<Scalars['DateTime']>;
  seedsSproutedOn?: Maybe<Scalars['DateTime']>;
  type?: Maybe<PlantType>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  uuid?: Maybe<Scalars['String']>;
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
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  uuid?: Maybe<Scalars['String']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  user?: Maybe<User>;
};

export type ErrorFragment = { __typename?: 'Error'; field: string; message: string };

export type ContainerFragment = {
  __typename?: 'Container';
  uuid?: string | null;
  type?: ContainerType | null;
  dirtDepth?: number | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  user?: { __typename?: 'User'; uuid?: string | null } | null;
};

export type PlantFragment = {
  __typename?: 'Plant';
  uuid?: string | null;
  type?: PlantType | null;
  variety?: string | null;
  plantedSeedsOn?: any | null;
  seedsSproutedOn?: any | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  container?: {
    __typename?: 'Container';
    uuid?: string | null;
    type?: ContainerType | null;
    dirtDepth?: number | null;
    createdAt?: any | null;
    updatedAt?: any | null;
    user?: { __typename?: 'User'; uuid?: string | null } | null;
  } | null;
};

export type PlantResponseFragment = {
  __typename?: 'PlantResponse';
  plant?: {
    __typename?: 'Plant';
    uuid?: string | null;
    type?: PlantType | null;
    variety?: string | null;
    plantedSeedsOn?: any | null;
    seedsSproutedOn?: any | null;
    createdAt?: any | null;
    updatedAt?: any | null;
    container?: {
      __typename?: 'Container';
      uuid?: string | null;
      type?: ContainerType | null;
      dirtDepth?: number | null;
      createdAt?: any | null;
      updatedAt?: any | null;
      user?: { __typename?: 'User'; uuid?: string | null } | null;
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
      uuid?: string | null;
      type?: PlantType | null;
      variety?: string | null;
      plantedSeedsOn?: any | null;
      seedsSproutedOn?: any | null;
      createdAt?: any | null;
      updatedAt?: any | null;
      container?: {
        __typename?: 'Container';
        uuid?: string | null;
        type?: ContainerType | null;
        dirtDepth?: number | null;
        createdAt?: any | null;
        updatedAt?: any | null;
        user?: { __typename?: 'User'; uuid?: string | null } | null;
      } | null;
    } | null;
    errors?: Array<{ __typename?: 'Error'; field: string; message: string }> | null;
  };
};

export type UserFragment = { __typename?: 'User'; uuid?: string | null };

export const UserFragmentDoc = gql`
  fragment User on User {
    uuid
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
export const ErrorFragmentDoc = gql`
  fragment Error on Error {
    field
    message
  }
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
