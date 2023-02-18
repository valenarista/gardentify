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
  DateTime: Date;
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
  seedsPlantedAt?: InputMaybe<Scalars['DateTime']>;
  seedsSproutedAt?: InputMaybe<Scalars['DateTime']>;
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
  requestResetPassword: RequestResetPasswordResponse;
  resetPassword: ResetPasswordResponse;
  setupTwoFactorCode: SetupTwoFactorCodeResponse;
  signup: Auth;
  updateContainer: ContainerResponse;
  updatePlant: PlantResponse;
  updateUser: UserResponse;
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
  input: LoginInput;
};

export type MutationRefreshTokenArgs = {
  input: RefreshTokenInput;
};

export type MutationRemovePlantFromContainerArgs = {
  input: RemovePlantFromContainerInput;
};

export type MutationRequestResetPasswordArgs = {
  input: RequestResetPasswordInput;
};

export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};

export type MutationSetupTwoFactorCodeArgs = {
  input: SetupTwoFactorCodeInput;
};

export type MutationSignupArgs = {
  input: SignUpInput;
};

export type MutationUpdateContainerArgs = {
  input: UpdateContainerInput;
};

export type MutationUpdatePlantArgs = {
  input: UpdatePlantInput;
};

export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Plant = {
  __typename?: 'Plant';
  container?: Maybe<Container>;
  createdAt: Scalars['DateTime'];
  seedsPlantedAt: Scalars['DateTime'];
  seedsSproutedAt: Scalars['DateTime'];
  type: PlantType;
  updatedAt: Scalars['DateTime'];
  uuid: Scalars['String'];
  variety: Scalars['String'];
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
  findContainerPlants: PlantsResponse;
  findContainers: ContainersResponse;
  findHeightRegistration: HeightRegistrationResponse;
  findPlant: PlantResponse;
  findPlantHeightRegistrations: HeightRegistrationsResponse;
  findPlants: PlantsResponse;
  findUser: UserResponse;
  findUserContainers: ContainersResponse;
  me: UserResponse;
};

export type QueryFindContainerArgs = {
  input: FindContainerInput;
};

export type QueryFindContainerPlantsArgs = {
  input: FindContainerInput;
};

export type QueryFindContainersArgs = {
  input: FindContainerInput;
};

export type QueryFindHeightRegistrationArgs = {
  input: FindHeightRegistrationInput;
};

export type QueryFindPlantArgs = {
  input: FindPlantInput;
};

export type QueryFindPlantHeightRegistrationsArgs = {
  input: FindPlantInput;
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

export type RequestResetPasswordInput = {
  email: Scalars['String'];
};

export type RequestResetPasswordResponse = {
  __typename?: 'RequestResetPasswordResponse';
  emailSent: Scalars['Boolean'];
};

export type ResetPasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
  twoFactorCode: Scalars['String'];
};

export type ResetPasswordResponse = {
  __typename?: 'ResetPasswordResponse';
  success: Scalars['Boolean'];
};

export type SetupTwoFactorCodeInput = {
  email: Scalars['String'];
};

export type SetupTwoFactorCodeResponse = {
  __typename?: 'SetupTwoFactorCodeResponse';
  emailSent: Scalars['Boolean'];
};

export type SignUpInput = {
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

export type UpdateContainerInput = {
  /** Dirth depth of the container */
  dirtDepth?: InputMaybe<Scalars['Float']>;
  /** Type of the container */
  type?: InputMaybe<ContainerType>;
  uuid: Scalars['String'];
};

export type UpdatePlantInput = {
  seedsPlantedAt?: InputMaybe<Scalars['DateTime']>;
  seedsSproutedAt?: InputMaybe<Scalars['DateTime']>;
  type?: InputMaybe<PlantType>;
  uuid: Scalars['String'];
  variety?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  username?: InputMaybe<Scalars['String']>;
  uuid: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  twoFactorEnabled: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
  uuid: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<Error>>;
  user?: Maybe<User>;
};

export type AuthFragment = {
  __typename?: 'Auth';
  accessToken: string;
  refreshToken: string;
  user: {
    __typename?: 'User';
    uuid: string;
    username: string;
    email: string;
    twoFactorEnabled: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type RequestResetPasswordResponseFragment = { __typename?: 'RequestResetPasswordResponse'; emailSent: boolean };

export type ResetPasswordResponseFragment = { __typename?: 'ResetPasswordResponse'; success: boolean };

export type SetupTwoFactorCodeResponseFragment = { __typename?: 'SetupTwoFactorCodeResponse'; emailSent: boolean };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'Auth';
    accessToken: string;
    refreshToken: string;
    user: {
      __typename?: 'User';
      uuid: string;
      username: string;
      email: string;
      twoFactorEnabled: boolean;
      createdAt: Date;
      updatedAt: Date;
    };
  };
};

export type RequestResetPasswordMutationVariables = Exact<{
  input: RequestResetPasswordInput;
}>;

export type RequestResetPasswordMutation = {
  __typename?: 'Mutation';
  requestResetPassword: { __typename?: 'RequestResetPasswordResponse'; emailSent: boolean };
};

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;

export type ResetPasswordMutation = {
  __typename?: 'Mutation';
  resetPassword: { __typename?: 'ResetPasswordResponse'; success: boolean };
};

export type SetupTwoFactorCodeMutationVariables = Exact<{
  input: SetupTwoFactorCodeInput;
}>;

export type SetupTwoFactorCodeMutation = {
  __typename?: 'Mutation';
  setupTwoFactorCode: { __typename?: 'SetupTwoFactorCodeResponse'; emailSent: boolean };
};

export type SignupMutationVariables = Exact<{
  input: SignUpInput;
}>;

export type SignupMutation = {
  __typename?: 'Mutation';
  signup: {
    __typename?: 'Auth';
    accessToken: string;
    refreshToken: string;
    user: {
      __typename?: 'User';
      uuid: string;
      username: string;
      email: string;
      twoFactorEnabled: boolean;
      createdAt: Date;
      updatedAt: Date;
    };
  };
};

export type ErrorFragment = { __typename?: 'Error'; field: string; message: string };

export type DeleteObjectResponseFragment = {
  __typename?: 'DeleteObjectResponse';
  deleted?: boolean | null;
  errors?: Array<{ __typename?: 'Error'; field: string; message: string }> | null;
};

export type ContainerFragment = {
  __typename?: 'Container';
  uuid: string;
  type: ContainerType;
  dirtDepth: number;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    __typename?: 'User';
    uuid: string;
    username: string;
    email: string;
    twoFactorEnabled: boolean;
    createdAt: Date;
    updatedAt: Date;
  } | null;
};

export type ContainerResponseFragment = {
  __typename?: 'ContainerResponse';
  container?: {
    __typename?: 'Container';
    uuid: string;
    type: ContainerType;
    dirtDepth: number;
    createdAt: Date;
    updatedAt: Date;
    user?: {
      __typename?: 'User';
      uuid: string;
      username: string;
      email: string;
      twoFactorEnabled: boolean;
      createdAt: Date;
      updatedAt: Date;
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
    createdAt: Date;
    updatedAt: Date;
    user?: {
      __typename?: 'User';
      uuid: string;
      username: string;
      email: string;
      twoFactorEnabled: boolean;
      createdAt: Date;
      updatedAt: Date;
    } | null;
  }> | null;
  errors?: Array<{ __typename?: 'Error'; field: string; message: string }> | null;
};

export type CreateContainerMutationVariables = Exact<{
  input: CreateContainerInput;
}>;

export type CreateContainerMutation = {
  __typename?: 'Mutation';
  createContainer: {
    __typename?: 'ContainerResponse';
    container?: {
      __typename?: 'Container';
      uuid: string;
      type: ContainerType;
      dirtDepth: number;
      createdAt: Date;
      updatedAt: Date;
      user?: {
        __typename?: 'User';
        uuid: string;
        username: string;
        email: string;
        twoFactorEnabled: boolean;
        createdAt: Date;
        updatedAt: Date;
      } | null;
    } | null;
    errors?: Array<{ __typename?: 'Error'; field: string; message: string }> | null;
  };
};

export type DeleteContainerMutationVariables = Exact<{
  input: FindContainerInput;
}>;

export type DeleteContainerMutation = {
  __typename?: 'Mutation';
  deleteContainer: {
    __typename?: 'DeleteObjectResponse';
    deleted?: boolean | null;
    errors?: Array<{ __typename?: 'Error'; field: string; message: string }> | null;
  };
};

export type UpdateContainerMutationVariables = Exact<{
  input: UpdateContainerInput;
}>;

export type UpdateContainerMutation = {
  __typename?: 'Mutation';
  updateContainer: {
    __typename?: 'ContainerResponse';
    container?: {
      __typename?: 'Container';
      uuid: string;
      type: ContainerType;
      dirtDepth: number;
      createdAt: Date;
      updatedAt: Date;
      user?: {
        __typename?: 'User';
        uuid: string;
        username: string;
        email: string;
        twoFactorEnabled: boolean;
        createdAt: Date;
        updatedAt: Date;
      } | null;
    } | null;
    errors?: Array<{ __typename?: 'Error'; field: string; message: string }> | null;
  };
};

export type FindContainerPlantsQueryVariables = Exact<{
  input: FindContainerInput;
}>;

export type FindContainerPlantsQuery = {
  __typename?: 'Query';
  findContainerPlants: {
    __typename?: 'PlantsResponse';
    plants?: Array<{
      __typename?: 'Plant';
      uuid: string;
      type: PlantType;
      variety: string;
      seedsPlantedAt: Date;
      seedsSproutedAt: Date;
      createdAt: Date;
      updatedAt: Date;
      container?: {
        __typename?: 'Container';
        uuid: string;
        type: ContainerType;
        dirtDepth: number;
        createdAt: Date;
        updatedAt: Date;
        user?: {
          __typename?: 'User';
          uuid: string;
          username: string;
          email: string;
          twoFactorEnabled: boolean;
          createdAt: Date;
          updatedAt: Date;
        } | null;
      } | null;
    }> | null;
    errors?: Array<{ __typename?: 'Error'; field: string; message: string }> | null;
  };
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
      createdAt: Date;
      updatedAt: Date;
      user?: {
        __typename?: 'User';
        uuid: string;
        username: string;
        email: string;
        twoFactorEnabled: boolean;
        createdAt: Date;
        updatedAt: Date;
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
      createdAt: Date;
      updatedAt: Date;
      user?: {
        __typename?: 'User';
        uuid: string;
        username: string;
        email: string;
        twoFactorEnabled: boolean;
        createdAt: Date;
        updatedAt: Date;
      } | null;
    }> | null;
    errors?: Array<{ __typename?: 'Error'; field: string; message: string }> | null;
  };
};

export type HeightRegistrationFragment = {
  __typename?: 'HeightRegistration';
  uuid: string;
  height?: number | null;
  createdAt: Date;
  updatedAt: Date;
  plant?: {
    __typename?: 'Plant';
    uuid: string;
    type: PlantType;
    variety: string;
    seedsPlantedAt: Date;
    seedsSproutedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    container?: {
      __typename?: 'Container';
      uuid: string;
      type: ContainerType;
      dirtDepth: number;
      createdAt: Date;
      updatedAt: Date;
      user?: {
        __typename?: 'User';
        uuid: string;
        username: string;
        email: string;
        twoFactorEnabled: boolean;
        createdAt: Date;
        updatedAt: Date;
      } | null;
    } | null;
  } | null;
};

export type HeightRegistrationResponseFragment = {
  __typename?: 'HeightRegistrationResponse';
  heightRegistration?: {
    __typename?: 'HeightRegistration';
    uuid: string;
    height?: number | null;
    createdAt: Date;
    updatedAt: Date;
    plant?: {
      __typename?: 'Plant';
      uuid: string;
      type: PlantType;
      variety: string;
      seedsPlantedAt: Date;
      seedsSproutedAt: Date;
      createdAt: Date;
      updatedAt: Date;
      container?: {
        __typename?: 'Container';
        uuid: string;
        type: ContainerType;
        dirtDepth: number;
        createdAt: Date;
        updatedAt: Date;
        user?: {
          __typename?: 'User';
          uuid: string;
          username: string;
          email: string;
          twoFactorEnabled: boolean;
          createdAt: Date;
          updatedAt: Date;
        } | null;
      } | null;
    } | null;
  } | null;
  errors?: Array<{ __typename?: 'Error'; field: string; message: string }> | null;
};

export type HeightRegistrationsResponseFragment = {
  __typename?: 'HeightRegistrationsResponse';
  heightRegistrations?: Array<{
    __typename?: 'HeightRegistration';
    uuid: string;
    height?: number | null;
    createdAt: Date;
    updatedAt: Date;
    plant?: {
      __typename?: 'Plant';
      uuid: string;
      type: PlantType;
      variety: string;
      seedsPlantedAt: Date;
      seedsSproutedAt: Date;
      createdAt: Date;
      updatedAt: Date;
      container?: {
        __typename?: 'Container';
        uuid: string;
        type: ContainerType;
        dirtDepth: number;
        createdAt: Date;
        updatedAt: Date;
        user?: {
          __typename?: 'User';
          uuid: string;
          username: string;
          email: string;
          twoFactorEnabled: boolean;
          createdAt: Date;
          updatedAt: Date;
        } | null;
      } | null;
    } | null;
  }> | null;
  errors?: Array<{ __typename?: 'Error'; field: string; message: string }> | null;
};

export type CreateHeightRegistrationMutationVariables = Exact<{
  input: CreateHeightRegistrationInput;
}>;

export type CreateHeightRegistrationMutation = {
  __typename?: 'Mutation';
  createHeightRegistration: {
    __typename?: 'HeightRegistrationResponse';
    heightRegistration?: {
      __typename?: 'HeightRegistration';
      uuid: string;
      height?: number | null;
      createdAt: Date;
      updatedAt: Date;
      plant?: {
        __typename?: 'Plant';
        uuid: string;
        type: PlantType;
        variety: string;
        seedsPlantedAt: Date;
        seedsSproutedAt: Date;
        createdAt: Date;
        updatedAt: Date;
        container?: {
          __typename?: 'Container';
          uuid: string;
          type: ContainerType;
          dirtDepth: number;
          createdAt: Date;
          updatedAt: Date;
          user?: {
            __typename?: 'User';
            uuid: string;
            username: string;
            email: string;
            twoFactorEnabled: boolean;
            createdAt: Date;
            updatedAt: Date;
          } | null;
        } | null;
      } | null;
    } | null;
    errors?: Array<{ __typename?: 'Error'; field: string; message: string }> | null;
  };
};

export type FindPlantHeightRegistrationsQueryVariables = Exact<{
  input: FindPlantInput;
}>;

export type FindPlantHeightRegistrationsQuery = {
  __typename?: 'Query';
  findPlantHeightRegistrations: {
    __typename?: 'HeightRegistrationsResponse';
    heightRegistrations?: Array<{
      __typename?: 'HeightRegistration';
      uuid: string;
      height?: number | null;
      createdAt: Date;
      updatedAt: Date;
      plant?: {
        __typename?: 'Plant';
        uuid: string;
        type: PlantType;
        variety: string;
        seedsPlantedAt: Date;
        seedsSproutedAt: Date;
        createdAt: Date;
        updatedAt: Date;
        container?: {
          __typename?: 'Container';
          uuid: string;
          type: ContainerType;
          dirtDepth: number;
          createdAt: Date;
          updatedAt: Date;
          user?: {
            __typename?: 'User';
            uuid: string;
            username: string;
            email: string;
            twoFactorEnabled: boolean;
            createdAt: Date;
            updatedAt: Date;
          } | null;
        } | null;
      } | null;
    }> | null;
    errors?: Array<{ __typename?: 'Error'; field: string; message: string }> | null;
  };
};

export type PlantFragment = {
  __typename?: 'Plant';
  uuid: string;
  type: PlantType;
  variety: string;
  seedsPlantedAt: Date;
  seedsSproutedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  container?: {
    __typename?: 'Container';
    uuid: string;
    type: ContainerType;
    dirtDepth: number;
    createdAt: Date;
    updatedAt: Date;
    user?: {
      __typename?: 'User';
      uuid: string;
      username: string;
      email: string;
      twoFactorEnabled: boolean;
      createdAt: Date;
      updatedAt: Date;
    } | null;
  } | null;
};

export type PlantResponseFragment = {
  __typename?: 'PlantResponse';
  plant?: {
    __typename?: 'Plant';
    uuid: string;
    type: PlantType;
    variety: string;
    seedsPlantedAt: Date;
    seedsSproutedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    container?: {
      __typename?: 'Container';
      uuid: string;
      type: ContainerType;
      dirtDepth: number;
      createdAt: Date;
      updatedAt: Date;
      user?: {
        __typename?: 'User';
        uuid: string;
        username: string;
        email: string;
        twoFactorEnabled: boolean;
        createdAt: Date;
        updatedAt: Date;
      } | null;
    } | null;
  } | null;
  errors?: Array<{ __typename?: 'Error'; field: string; message: string }> | null;
};

export type PlantsResponseFragment = {
  __typename?: 'PlantsResponse';
  plants?: Array<{
    __typename?: 'Plant';
    uuid: string;
    type: PlantType;
    variety: string;
    seedsPlantedAt: Date;
    seedsSproutedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    container?: {
      __typename?: 'Container';
      uuid: string;
      type: ContainerType;
      dirtDepth: number;
      createdAt: Date;
      updatedAt: Date;
      user?: {
        __typename?: 'User';
        uuid: string;
        username: string;
        email: string;
        twoFactorEnabled: boolean;
        createdAt: Date;
        updatedAt: Date;
      } | null;
    } | null;
  }> | null;
  errors?: Array<{ __typename?: 'Error'; field: string; message: string }> | null;
};

export type CreatePlantMutationVariables = Exact<{
  input: CreatePlantInput;
}>;

export type CreatePlantMutation = {
  __typename?: 'Mutation';
  createPlant: {
    __typename?: 'PlantResponse';
    plant?: {
      __typename?: 'Plant';
      uuid: string;
      type: PlantType;
      variety: string;
      seedsPlantedAt: Date;
      seedsSproutedAt: Date;
      createdAt: Date;
      updatedAt: Date;
      container?: {
        __typename?: 'Container';
        uuid: string;
        type: ContainerType;
        dirtDepth: number;
        createdAt: Date;
        updatedAt: Date;
        user?: {
          __typename?: 'User';
          uuid: string;
          username: string;
          email: string;
          twoFactorEnabled: boolean;
          createdAt: Date;
          updatedAt: Date;
        } | null;
      } | null;
    } | null;
    errors?: Array<{ __typename?: 'Error'; field: string; message: string }> | null;
  };
};

export type DeletePlantMutationVariables = Exact<{
  input: FindPlantInput;
}>;

export type DeletePlantMutation = {
  __typename?: 'Mutation';
  deletePlant: {
    __typename?: 'DeleteObjectResponse';
    deleted?: boolean | null;
    errors?: Array<{ __typename?: 'Error'; field: string; message: string }> | null;
  };
};

export type UpdatePlantMutationVariables = Exact<{
  input: UpdatePlantInput;
}>;

export type UpdatePlantMutation = {
  __typename?: 'Mutation';
  updatePlant: {
    __typename?: 'PlantResponse';
    plant?: {
      __typename?: 'Plant';
      uuid: string;
      type: PlantType;
      variety: string;
      seedsPlantedAt: Date;
      seedsSproutedAt: Date;
      createdAt: Date;
      updatedAt: Date;
      container?: {
        __typename?: 'Container';
        uuid: string;
        type: ContainerType;
        dirtDepth: number;
        createdAt: Date;
        updatedAt: Date;
        user?: {
          __typename?: 'User';
          uuid: string;
          username: string;
          email: string;
          twoFactorEnabled: boolean;
          createdAt: Date;
          updatedAt: Date;
        } | null;
      } | null;
    } | null;
    errors?: Array<{ __typename?: 'Error'; field: string; message: string }> | null;
  };
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
      type: PlantType;
      variety: string;
      seedsPlantedAt: Date;
      seedsSproutedAt: Date;
      createdAt: Date;
      updatedAt: Date;
      container?: {
        __typename?: 'Container';
        uuid: string;
        type: ContainerType;
        dirtDepth: number;
        createdAt: Date;
        updatedAt: Date;
        user?: {
          __typename?: 'User';
          uuid: string;
          username: string;
          email: string;
          twoFactorEnabled: boolean;
          createdAt: Date;
          updatedAt: Date;
        } | null;
      } | null;
    } | null;
    errors?: Array<{ __typename?: 'Error'; field: string; message: string }> | null;
  };
};

export type UserResponseFragment = {
  __typename?: 'UserResponse';
  user?: {
    __typename?: 'User';
    uuid: string;
    username: string;
    email: string;
    twoFactorEnabled: boolean;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  errors?: Array<{ __typename?: 'Error'; field: string; message: string }> | null;
};

export type UserFragment = {
  __typename?: 'User';
  uuid: string;
  username: string;
  email: string;
  twoFactorEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;

export type UpdateUserMutation = {
  __typename?: 'Mutation';
  updateUser: {
    __typename?: 'UserResponse';
    user?: {
      __typename?: 'User';
      uuid: string;
      username: string;
      email: string;
      twoFactorEnabled: boolean;
      createdAt: Date;
      updatedAt: Date;
    } | null;
    errors?: Array<{ __typename?: 'Error'; field: string; message: string }> | null;
  };
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
      twoFactorEnabled: boolean;
      createdAt: Date;
      updatedAt: Date;
    } | null;
    errors?: Array<{ __typename?: 'Error'; field: string; message: string }> | null;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me: {
    __typename?: 'UserResponse';
    user?: {
      __typename?: 'User';
      uuid: string;
      username: string;
      email: string;
      twoFactorEnabled: boolean;
      createdAt: Date;
      updatedAt: Date;
    } | null;
    errors?: Array<{ __typename?: 'Error'; field: string; message: string }> | null;
  };
};

export const UserFragmentDoc = gql`
  fragment User on User {
    uuid
    username
    email
    twoFactorEnabled
    createdAt
    updatedAt
  }
`;
export const AuthFragmentDoc = gql`
  fragment Auth on Auth {
    user {
      ...User
    }
    accessToken
    refreshToken
  }
  ${UserFragmentDoc}
`;
export const RequestResetPasswordResponseFragmentDoc = gql`
  fragment RequestResetPasswordResponse on RequestResetPasswordResponse {
    emailSent
  }
`;
export const ResetPasswordResponseFragmentDoc = gql`
  fragment ResetPasswordResponse on ResetPasswordResponse {
    success
  }
`;
export const SetupTwoFactorCodeResponseFragmentDoc = gql`
  fragment SetupTwoFactorCodeResponse on SetupTwoFactorCodeResponse {
    emailSent
  }
`;
export const ErrorFragmentDoc = gql`
  fragment Error on Error {
    field
    message
  }
`;
export const DeleteObjectResponseFragmentDoc = gql`
  fragment DeleteObjectResponse on DeleteObjectResponse {
    deleted
    errors {
      ...Error
    }
  }
  ${ErrorFragmentDoc}
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
    seedsPlantedAt
    seedsSproutedAt
    container {
      ...Container
    }
    createdAt
    updatedAt
  }
  ${ContainerFragmentDoc}
`;
export const HeightRegistrationFragmentDoc = gql`
  fragment HeightRegistration on HeightRegistration {
    uuid
    height
    plant {
      ...Plant
    }
    createdAt
    updatedAt
  }
  ${PlantFragmentDoc}
`;
export const HeightRegistrationResponseFragmentDoc = gql`
  fragment HeightRegistrationResponse on HeightRegistrationResponse {
    heightRegistration {
      ...HeightRegistration
    }
    errors {
      ...Error
    }
  }
  ${HeightRegistrationFragmentDoc}
  ${ErrorFragmentDoc}
`;
export const HeightRegistrationsResponseFragmentDoc = gql`
  fragment HeightRegistrationsResponse on HeightRegistrationsResponse {
    heightRegistrations {
      ...HeightRegistration
    }
    errors {
      ...Error
    }
  }
  ${HeightRegistrationFragmentDoc}
  ${ErrorFragmentDoc}
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
export const PlantsResponseFragmentDoc = gql`
  fragment PlantsResponse on PlantsResponse {
    plants {
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
export const LoginDocument = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      ...Auth
    }
  }
  ${AuthFragmentDoc}
`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it Date options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at Date time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RequestResetPasswordDocument = gql`
  mutation requestResetPassword($input: RequestResetPasswordInput!) {
    requestResetPassword(input: $input) {
      ...RequestResetPasswordResponse
    }
  }
  ${RequestResetPasswordResponseFragmentDoc}
`;
export type RequestResetPasswordMutationFn = Apollo.MutationFunction<
  RequestResetPasswordMutation,
  RequestResetPasswordMutationVariables
>;

/**
 * __useRequestResetPasswordMutation__
 *
 * To run a mutation, you first call `useRequestResetPasswordMutation` within a React component and pass it Date options that fit your needs.
 * When your component renders, `useRequestResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at Date time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestResetPasswordMutation, { data, loading, error }] = useRequestResetPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRequestResetPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<RequestResetPasswordMutation, RequestResetPasswordMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RequestResetPasswordMutation, RequestResetPasswordMutationVariables>(
    RequestResetPasswordDocument,
    options
  );
}
export type RequestResetPasswordMutationHookResult = ReturnType<typeof useRequestResetPasswordMutation>;
export type RequestResetPasswordMutationResult = Apollo.MutationResult<RequestResetPasswordMutation>;
export type RequestResetPasswordMutationOptions = Apollo.BaseMutationOptions<
  RequestResetPasswordMutation,
  RequestResetPasswordMutationVariables
>;
export const ResetPasswordDocument = gql`
  mutation resetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      ...ResetPasswordResponse
    }
  }
  ${ResetPasswordResponseFragmentDoc}
`;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it Date options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at Date time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
}
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>;
export const SetupTwoFactorCodeDocument = gql`
  mutation setupTwoFactorCode($input: SetupTwoFactorCodeInput!) {
    setupTwoFactorCode(input: $input) {
      ...SetupTwoFactorCodeResponse
    }
  }
  ${SetupTwoFactorCodeResponseFragmentDoc}
`;
export type SetupTwoFactorCodeMutationFn = Apollo.MutationFunction<
  SetupTwoFactorCodeMutation,
  SetupTwoFactorCodeMutationVariables
>;

/**
 * __useSetupTwoFactorCodeMutation__
 *
 * To run a mutation, you first call `useSetupTwoFactorCodeMutation` within a React component and pass it Date options that fit your needs.
 * When your component renders, `useSetupTwoFactorCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at Date time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setupTwoFactorCodeMutation, { data, loading, error }] = useSetupTwoFactorCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetupTwoFactorCodeMutation(
  baseOptions?: Apollo.MutationHookOptions<SetupTwoFactorCodeMutation, SetupTwoFactorCodeMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SetupTwoFactorCodeMutation, SetupTwoFactorCodeMutationVariables>(
    SetupTwoFactorCodeDocument,
    options
  );
}
export type SetupTwoFactorCodeMutationHookResult = ReturnType<typeof useSetupTwoFactorCodeMutation>;
export type SetupTwoFactorCodeMutationResult = Apollo.MutationResult<SetupTwoFactorCodeMutation>;
export type SetupTwoFactorCodeMutationOptions = Apollo.BaseMutationOptions<
  SetupTwoFactorCodeMutation,
  SetupTwoFactorCodeMutationVariables
>;
export const SignupDocument = gql`
  mutation signup($input: SignUpInput!) {
    signup(input: $input) {
      ...Auth
    }
  }
  ${AuthFragmentDoc}
`;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it Date options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at Date time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
}
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const CreateContainerDocument = gql`
  mutation createContainer($input: CreateContainerInput!) {
    createContainer(input: $input) {
      ...ContainerResponse
    }
  }
  ${ContainerResponseFragmentDoc}
`;
export type CreateContainerMutationFn = Apollo.MutationFunction<
  CreateContainerMutation,
  CreateContainerMutationVariables
>;

/**
 * __useCreateContainerMutation__
 *
 * To run a mutation, you first call `useCreateContainerMutation` within a React component and pass it Date options that fit your needs.
 * When your component renders, `useCreateContainerMutation` returns a tuple that includes:
 * - A mutate function that you can call at Date time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createContainerMutation, { data, loading, error }] = useCreateContainerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateContainerMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateContainerMutation, CreateContainerMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateContainerMutation, CreateContainerMutationVariables>(
    CreateContainerDocument,
    options
  );
}
export type CreateContainerMutationHookResult = ReturnType<typeof useCreateContainerMutation>;
export type CreateContainerMutationResult = Apollo.MutationResult<CreateContainerMutation>;
export type CreateContainerMutationOptions = Apollo.BaseMutationOptions<
  CreateContainerMutation,
  CreateContainerMutationVariables
>;
export const DeleteContainerDocument = gql`
  mutation deleteContainer($input: FindContainerInput!) {
    deleteContainer(input: $input) {
      ...DeleteObjectResponse
    }
  }
  ${DeleteObjectResponseFragmentDoc}
`;
export type DeleteContainerMutationFn = Apollo.MutationFunction<
  DeleteContainerMutation,
  DeleteContainerMutationVariables
>;

/**
 * __useDeleteContainerMutation__
 *
 * To run a mutation, you first call `useDeleteContainerMutation` within a React component and pass it Date options that fit your needs.
 * When your component renders, `useDeleteContainerMutation` returns a tuple that includes:
 * - A mutate function that you can call at Date time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteContainerMutation, { data, loading, error }] = useDeleteContainerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteContainerMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteContainerMutation, DeleteContainerMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteContainerMutation, DeleteContainerMutationVariables>(
    DeleteContainerDocument,
    options
  );
}
export type DeleteContainerMutationHookResult = ReturnType<typeof useDeleteContainerMutation>;
export type DeleteContainerMutationResult = Apollo.MutationResult<DeleteContainerMutation>;
export type DeleteContainerMutationOptions = Apollo.BaseMutationOptions<
  DeleteContainerMutation,
  DeleteContainerMutationVariables
>;
export const UpdateContainerDocument = gql`
  mutation updateContainer($input: UpdateContainerInput!) {
    updateContainer(input: $input) {
      ...ContainerResponse
    }
  }
  ${ContainerResponseFragmentDoc}
`;
export type UpdateContainerMutationFn = Apollo.MutationFunction<
  UpdateContainerMutation,
  UpdateContainerMutationVariables
>;

/**
 * __useUpdateContainerMutation__
 *
 * To run a mutation, you first call `useUpdateContainerMutation` within a React component and pass it Date options that fit your needs.
 * When your component renders, `useUpdateContainerMutation` returns a tuple that includes:
 * - A mutate function that you can call at Date time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContainerMutation, { data, loading, error }] = useUpdateContainerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateContainerMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateContainerMutation, UpdateContainerMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateContainerMutation, UpdateContainerMutationVariables>(
    UpdateContainerDocument,
    options
  );
}
export type UpdateContainerMutationHookResult = ReturnType<typeof useUpdateContainerMutation>;
export type UpdateContainerMutationResult = Apollo.MutationResult<UpdateContainerMutation>;
export type UpdateContainerMutationOptions = Apollo.BaseMutationOptions<
  UpdateContainerMutation,
  UpdateContainerMutationVariables
>;
export const FindContainerPlantsDocument = gql`
  query findContainerPlants($input: FindContainerInput!) {
    findContainerPlants(input: $input) {
      ...PlantsResponse
    }
  }
  ${PlantsResponseFragmentDoc}
`;

/**
 * __useFindContainerPlantsQuery__
 *
 * To run a query within a React component, call `useFindContainerPlantsQuery` and pass it Date options that fit your needs.
 * When your component renders, `useFindContainerPlantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindContainerPlantsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindContainerPlantsQuery(
  baseOptions: Apollo.QueryHookOptions<FindContainerPlantsQuery, FindContainerPlantsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindContainerPlantsQuery, FindContainerPlantsQueryVariables>(
    FindContainerPlantsDocument,
    options
  );
}
export function useFindContainerPlantsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FindContainerPlantsQuery, FindContainerPlantsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindContainerPlantsQuery, FindContainerPlantsQueryVariables>(
    FindContainerPlantsDocument,
    options
  );
}
export type FindContainerPlantsQueryHookResult = ReturnType<typeof useFindContainerPlantsQuery>;
export type FindContainerPlantsLazyQueryHookResult = ReturnType<typeof useFindContainerPlantsLazyQuery>;
export type FindContainerPlantsQueryResult = Apollo.QueryResult<
  FindContainerPlantsQuery,
  FindContainerPlantsQueryVariables
>;
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
 * To run a query within a React component, call `useFindContainerQuery` and pass it Date options that fit your needs.
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
 * To run a query within a React component, call `useFindUserContainersQuery` and pass it Date options that fit your needs.
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
export const CreateHeightRegistrationDocument = gql`
  mutation createHeightRegistration($input: CreateHeightRegistrationInput!) {
    createHeightRegistration(input: $input) {
      ...HeightRegistrationResponse
    }
  }
  ${HeightRegistrationResponseFragmentDoc}
`;
export type CreateHeightRegistrationMutationFn = Apollo.MutationFunction<
  CreateHeightRegistrationMutation,
  CreateHeightRegistrationMutationVariables
>;

/**
 * __useCreateHeightRegistrationMutation__
 *
 * To run a mutation, you first call `useCreateHeightRegistrationMutation` within a React component and pass it Date options that fit your needs.
 * When your component renders, `useCreateHeightRegistrationMutation` returns a tuple that includes:
 * - A mutate function that you can call at Date time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHeightRegistrationMutation, { data, loading, error }] = useCreateHeightRegistrationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateHeightRegistrationMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateHeightRegistrationMutation, CreateHeightRegistrationMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateHeightRegistrationMutation, CreateHeightRegistrationMutationVariables>(
    CreateHeightRegistrationDocument,
    options
  );
}
export type CreateHeightRegistrationMutationHookResult = ReturnType<typeof useCreateHeightRegistrationMutation>;
export type CreateHeightRegistrationMutationResult = Apollo.MutationResult<CreateHeightRegistrationMutation>;
export type CreateHeightRegistrationMutationOptions = Apollo.BaseMutationOptions<
  CreateHeightRegistrationMutation,
  CreateHeightRegistrationMutationVariables
>;
export const FindPlantHeightRegistrationsDocument = gql`
  query findPlantHeightRegistrations($input: FindPlantInput!) {
    findPlantHeightRegistrations(input: $input) {
      ...HeightRegistrationsResponse
    }
  }
  ${HeightRegistrationsResponseFragmentDoc}
`;

/**
 * __useFindPlantHeightRegistrationsQuery__
 *
 * To run a query within a React component, call `useFindPlantHeightRegistrationsQuery` and pass it Date options that fit your needs.
 * When your component renders, `useFindPlantHeightRegistrationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPlantHeightRegistrationsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindPlantHeightRegistrationsQuery(
  baseOptions: Apollo.QueryHookOptions<FindPlantHeightRegistrationsQuery, FindPlantHeightRegistrationsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindPlantHeightRegistrationsQuery, FindPlantHeightRegistrationsQueryVariables>(
    FindPlantHeightRegistrationsDocument,
    options
  );
}
export function useFindPlantHeightRegistrationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindPlantHeightRegistrationsQuery,
    FindPlantHeightRegistrationsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindPlantHeightRegistrationsQuery, FindPlantHeightRegistrationsQueryVariables>(
    FindPlantHeightRegistrationsDocument,
    options
  );
}
export type FindPlantHeightRegistrationsQueryHookResult = ReturnType<typeof useFindPlantHeightRegistrationsQuery>;
export type FindPlantHeightRegistrationsLazyQueryHookResult = ReturnType<
  typeof useFindPlantHeightRegistrationsLazyQuery
>;
export type FindPlantHeightRegistrationsQueryResult = Apollo.QueryResult<
  FindPlantHeightRegistrationsQuery,
  FindPlantHeightRegistrationsQueryVariables
>;
export const CreatePlantDocument = gql`
  mutation createPlant($input: CreatePlantInput!) {
    createPlant(input: $input) {
      ...PlantResponse
    }
  }
  ${PlantResponseFragmentDoc}
`;
export type CreatePlantMutationFn = Apollo.MutationFunction<CreatePlantMutation, CreatePlantMutationVariables>;

/**
 * __useCreatePlantMutation__
 *
 * To run a mutation, you first call `useCreatePlantMutation` within a React component and pass it Date options that fit your needs.
 * When your component renders, `useCreatePlantMutation` returns a tuple that includes:
 * - A mutate function that you can call at Date time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlantMutation, { data, loading, error }] = useCreatePlantMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePlantMutation(
  baseOptions?: Apollo.MutationHookOptions<CreatePlantMutation, CreatePlantMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreatePlantMutation, CreatePlantMutationVariables>(CreatePlantDocument, options);
}
export type CreatePlantMutationHookResult = ReturnType<typeof useCreatePlantMutation>;
export type CreatePlantMutationResult = Apollo.MutationResult<CreatePlantMutation>;
export type CreatePlantMutationOptions = Apollo.BaseMutationOptions<CreatePlantMutation, CreatePlantMutationVariables>;
export const DeletePlantDocument = gql`
  mutation deletePlant($input: FindPlantInput!) {
    deletePlant(input: $input) {
      ...DeleteObjectResponse
    }
  }
  ${DeleteObjectResponseFragmentDoc}
`;
export type DeletePlantMutationFn = Apollo.MutationFunction<DeletePlantMutation, DeletePlantMutationVariables>;

/**
 * __useDeletePlantMutation__
 *
 * To run a mutation, you first call `useDeletePlantMutation` within a React component and pass it Date options that fit your needs.
 * When your component renders, `useDeletePlantMutation` returns a tuple that includes:
 * - A mutate function that you can call at Date time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePlantMutation, { data, loading, error }] = useDeletePlantMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeletePlantMutation(
  baseOptions?: Apollo.MutationHookOptions<DeletePlantMutation, DeletePlantMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeletePlantMutation, DeletePlantMutationVariables>(DeletePlantDocument, options);
}
export type DeletePlantMutationHookResult = ReturnType<typeof useDeletePlantMutation>;
export type DeletePlantMutationResult = Apollo.MutationResult<DeletePlantMutation>;
export type DeletePlantMutationOptions = Apollo.BaseMutationOptions<DeletePlantMutation, DeletePlantMutationVariables>;
export const UpdatePlantDocument = gql`
  mutation updatePlant($input: UpdatePlantInput!) {
    updatePlant(input: $input) {
      ...PlantResponse
    }
  }
  ${PlantResponseFragmentDoc}
`;
export type UpdatePlantMutationFn = Apollo.MutationFunction<UpdatePlantMutation, UpdatePlantMutationVariables>;

/**
 * __useUpdatePlantMutation__
 *
 * To run a mutation, you first call `useUpdatePlantMutation` within a React component and pass it Date options that fit your needs.
 * When your component renders, `useUpdatePlantMutation` returns a tuple that includes:
 * - A mutate function that you can call at Date time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlantMutation, { data, loading, error }] = useUpdatePlantMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePlantMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdatePlantMutation, UpdatePlantMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdatePlantMutation, UpdatePlantMutationVariables>(UpdatePlantDocument, options);
}
export type UpdatePlantMutationHookResult = ReturnType<typeof useUpdatePlantMutation>;
export type UpdatePlantMutationResult = Apollo.MutationResult<UpdatePlantMutation>;
export type UpdatePlantMutationOptions = Apollo.BaseMutationOptions<UpdatePlantMutation, UpdatePlantMutationVariables>;
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
 * To run a query within a React component, call `useFindPlantQuery` and pass it Date options that fit your needs.
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
export const UpdateUserDocument = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      ...UserResponse
    }
  }
  ${UserResponseFragmentDoc}
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it Date options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at Date time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
}
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
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
 * To run a query within a React component, call `useFindUserQuery` and pass it Date options that fit your needs.
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
export const MeDocument = gql`
  query me {
    me {
      ...UserResponse
    }
  }
  ${UserResponseFragmentDoc}
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it Date options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
