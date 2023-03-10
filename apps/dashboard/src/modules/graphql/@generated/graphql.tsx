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

export type AuthResponse = {
  __typename?: 'AuthResponse';
  authTokens?: Maybe<AuthTokens>;
  user: User;
};

export type AuthTokens = {
  __typename?: 'AuthTokens';
  /** JWT access token */
  accessToken: Scalars['String'];
  /** JWT refresh token */
  refreshToken: Scalars['String'];
};

export type BestPerformingContainer = {
  __typename?: 'BestPerformingContainer';
  createdAt: Scalars['DateTime'];
  /** Dirth depth of the container */
  dirtDepth: Scalars['Float'];
  totalHarvestsWeight: Scalars['Float'];
  /** Type of the container */
  type: ContainerType;
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
  uuid: Scalars['String'];
};

export type BestPerformingContainersResponse = {
  __typename?: 'BestPerformingContainersResponse';
  containers?: Maybe<Array<BestPerformingContainer>>;
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

export type ContainerHarvest = {
  __typename?: 'ContainerHarvest';
  date: Scalars['DateTime'];
  weight: Scalars['Float'];
};

export type ContainerHarvestsResponse = {
  __typename?: 'ContainerHarvestsResponse';
  harvests: Array<ContainerHarvest>;
};

export type ContainerResponse = {
  __typename?: 'ContainerResponse';
  container?: Maybe<Container>;
  errors?: Maybe<Array<Error>>;
};

export type ContainerStatsResponse = {
  __typename?: 'ContainerStatsResponse';
  grossProduce?: Maybe<Scalars['Float']>;
  harvestsCount?: Maybe<Scalars['Int']>;
  plantsCount?: Maybe<Scalars['Int']>;
};

/** The type of a conatiner */
export enum ContainerType {
  Bag = 'Bag',
  Patch = 'Patch',
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

export type CreateHarvestInput = {
  plant: FindPlantInput;
  quantity: Scalars['Int'];
  weight: Scalars['Float'];
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

export type FindBestPerformingContainersInput = {
  take: Scalars['Int'];
  userUuid: Scalars['String'];
};

export type FindContainerInput = {
  uuid: Scalars['String'];
};

export type FindContainerPlantsInput = {
  cursor?: InputMaybe<Scalars['String']>;
  take?: InputMaybe<Scalars['Int']>;
  where: FindContainerInput;
};

export type FindHarvestInput = {
  uuid: Scalars['String'];
};

export type FindHarvestsInput = {
  cursor?: InputMaybe<Scalars['String']>;
  includePlant: Scalars['Boolean'];
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FindHarvestInput>;
};

export type FindHeightRegistrationInput = {
  height?: InputMaybe<Scalars['Float']>;
  uuid?: InputMaybe<Scalars['String']>;
};

export type FindHeightRegistrationsInput = {
  includePlant: Scalars['Boolean'];
  take: Scalars['Int'];
};

export type FindLatestsHarvestsInput = {
  includePlant: Scalars['Boolean'];
  take?: InputMaybe<Scalars['Int']>;
  userUuid: Scalars['String'];
};

export type FindPlantHarvestsInput = {
  cursor?: InputMaybe<Scalars['String']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FindPlantInput>;
};

export type FindPlantInput = {
  type?: InputMaybe<PlantType>;
  uuid?: InputMaybe<Scalars['String']>;
  variety?: InputMaybe<Scalars['String']>;
};

export type FindPlantsInput = {
  cursor?: InputMaybe<Scalars['String']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FindPlantInput>;
};

export type FindUserContainersInput = {
  userUuid: Scalars['String'];
};

export type FindUserInput = {
  uuid: Scalars['String'];
};

export type FindWeekHarvestsInput = {
  userUuid: Scalars['String'];
};

export type Harvest = {
  __typename?: 'Harvest';
  createdAt: Scalars['DateTime'];
  plant?: Maybe<Plant>;
  quantity: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  uuid: Scalars['String'];
  weight: Scalars['Float'];
};

export type HarvestResponse = {
  __typename?: 'HarvestResponse';
  errors?: Maybe<Array<Error>>;
  harvest?: Maybe<Harvest>;
};

export type HarvestsResponse = {
  __typename?: 'HarvestsResponse';
  count: Scalars['Int'];
  cursor: Scalars['String'];
  harvests?: Maybe<Array<Harvest>>;
  hasMore: Scalars['Boolean'];
};

export type HeightRegistration = {
  __typename?: 'HeightRegistration';
  createdAt: Scalars['DateTime'];
  height: Scalars['Float'];
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
  twoFactorCode: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addPlantToContainer: ContainerResponse;
  createContainer: ContainerResponse;
  createHarvest: HarvestResponse;
  createHeightRegistration: HeightRegistrationResponse;
  createPlant: PlantResponse;
  deleteContainer: DeleteObjectResponse;
  deleteHarvest: DeleteObjectResponse;
  deleteHeightRegistration: DeleteObjectResponse;
  deletePlant: DeleteObjectResponse;
  logOut: Scalars['Boolean'];
  login: AuthResponse;
  refreshToken: AuthTokens;
  removePlantFromContainer: DeleteObjectResponse;
  requestResetPassword: RequestResetPasswordResponse;
  resetPassword: ResetPasswordResponse;
  setupTwoFactorCode: SetupTwoFactorCodeResponse;
  signUp: AuthResponse;
  updateContainer: ContainerResponse;
  updateHarvest: HarvestResponse;
  updatePlant: PlantResponse;
  updateUser: UserResponse;
};

export type MutationAddPlantToContainerArgs = {
  input: AddPlantToContainerInput;
};

export type MutationCreateContainerArgs = {
  input: CreateContainerInput;
};

export type MutationCreateHarvestArgs = {
  input: CreateHarvestInput;
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

export type MutationDeleteHarvestArgs = {
  input: FindHarvestInput;
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

export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type MutationUpdateContainerArgs = {
  input: UpdateContainerInput;
};

export type MutationUpdateHarvestArgs = {
  input: UpdateHarvestInput;
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
  count: Scalars['Int'];
  cursor: Scalars['String'];
  hasMore: Scalars['Boolean'];
  plants?: Maybe<Array<Plant>>;
};

export type Query = {
  __typename?: 'Query';
  authCheck: Scalars['Boolean'];
  calculateContainerStats: ContainerStatsResponse;
  findBestPerformingContainers: BestPerformingContainersResponse;
  findContainer: ContainerResponse;
  findContainerHarvests: ContainerHarvestsResponse;
  findContainerPlants: PlantsResponse;
  findContainers: ContainersResponse;
  findHarvest: HarvestResponse;
  findHarvests: HarvestsResponse;
  findHeightRegistration: HeightRegistrationResponse;
  findHeightRegistrations: HeightRegistrationsResponse;
  findLatestsHarvests: HarvestsResponse;
  findPlant: PlantResponse;
  findPlantHarvests: HarvestsResponse;
  findPlantHeightRegistrations: HeightRegistrationsResponse;
  findPlants: PlantsResponse;
  findUser: UserResponse;
  findUserContainers: ContainersResponse;
  findWeekHarvests: HarvestsResponse;
  getWeatherForecast: WeatherForecastResponse;
  me: User;
};

export type QueryCalculateContainerStatsArgs = {
  input: FindContainerInput;
};

export type QueryFindBestPerformingContainersArgs = {
  input: FindBestPerformingContainersInput;
};

export type QueryFindContainerArgs = {
  input: FindContainerInput;
};

export type QueryFindContainerHarvestsArgs = {
  input: FindContainerInput;
};

export type QueryFindContainerPlantsArgs = {
  input: FindContainerPlantsInput;
};

export type QueryFindContainersArgs = {
  input: FindContainerInput;
};

export type QueryFindHarvestArgs = {
  input: FindHarvestInput;
};

export type QueryFindHarvestsArgs = {
  input: FindHarvestsInput;
};

export type QueryFindHeightRegistrationArgs = {
  input: FindHeightRegistrationInput;
};

export type QueryFindHeightRegistrationsArgs = {
  input: FindHeightRegistrationsInput;
};

export type QueryFindLatestsHarvestsArgs = {
  input: FindLatestsHarvestsInput;
};

export type QueryFindPlantArgs = {
  input: FindPlantInput;
};

export type QueryFindPlantHarvestsArgs = {
  input: FindPlantHarvestsInput;
};

export type QueryFindPlantHeightRegistrationsArgs = {
  input: FindPlantInput;
};

export type QueryFindPlantsArgs = {
  input: FindPlantsInput;
};

export type QueryFindUserArgs = {
  input: FindUserInput;
};

export type QueryFindUserContainersArgs = {
  input: FindUserContainersInput;
};

export type QueryFindWeekHarvestsArgs = {
  input: FindWeekHarvestsInput;
};

export type QueryGetWeatherForecastArgs = {
  input: WeatherForecastInput;
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

export type UpdateContainerInput = {
  /** Dirth depth of the container */
  dirtDepth?: InputMaybe<Scalars['Float']>;
  /** Type of the container */
  type?: InputMaybe<ContainerType>;
  uuid: Scalars['String'];
};

export type UpdateHarvestInput = {
  quantity?: InputMaybe<Scalars['Int']>;
  uuid: Scalars['String'];
  weight?: InputMaybe<Scalars['Float']>;
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
  user: User;
};

export type Weather = {
  __typename?: 'Weather';
  precipitationSum: Scalars['Float'];
  temperatureMax: Scalars['Float'];
  temperatureMin: Scalars['Float'];
  time: Scalars['String'];
  uvIndexMax: Scalars['Float'];
  weatherCode: Scalars['Int'];
  windDirectionDominant: Scalars['Float'];
  windSpeedMax: Scalars['Float'];
};

export type WeatherForecastInput = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type WeatherForecastResponse = {
  __typename?: 'WeatherForecastResponse';
  forecast: Array<Weather>;
};

export type AuthResponseFragment = {
  __typename?: 'AuthResponse';
  user: {
    __typename?: 'User';
    uuid: string;
    username: string;
    email: string;
    twoFactorEnabled: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  authTokens?: { __typename?: 'AuthTokens'; accessToken: string; refreshToken: string } | null;
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
    __typename?: 'AuthResponse';
    user: {
      __typename?: 'User';
      uuid: string;
      username: string;
      email: string;
      twoFactorEnabled: boolean;
      createdAt: Date;
      updatedAt: Date;
    };
    authTokens?: { __typename?: 'AuthTokens'; accessToken: string; refreshToken: string } | null;
  };
};

export type LogOutMutationVariables = Exact<{ [key: string]: never }>;

export type LogOutMutation = { __typename?: 'Mutation'; logOut: boolean };

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

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;

export type SignUpMutation = {
  __typename?: 'Mutation';
  signUp: {
    __typename?: 'AuthResponse';
    user: {
      __typename?: 'User';
      uuid: string;
      username: string;
      email: string;
      twoFactorEnabled: boolean;
      createdAt: Date;
      updatedAt: Date;
    };
    authTokens?: { __typename?: 'AuthTokens'; accessToken: string; refreshToken: string } | null;
  };
};

export type AuthCheckQueryVariables = Exact<{ [key: string]: never }>;

export type AuthCheckQuery = { __typename?: 'Query'; authCheck: boolean };

export type ErrorFragment = { __typename?: 'Error'; field: string; message: string };

export type DeleteObjectResponseFragment = {
  __typename?: 'DeleteObjectResponse';
  deleted?: boolean | null;
  errors?: Array<{ __typename?: 'Error'; field: string; message: string }> | null;
};

export type BestPerformingContainerFragment = {
  __typename?: 'BestPerformingContainer';
  uuid: string;
  type: ContainerType;
  dirtDepth: number;
  totalHarvestsWeight: number;
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

export type ContainerHarvestFragment = { __typename?: 'ContainerHarvest'; date: Date; weight: number };

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

export type BestPerformingContainersResponseFragment = {
  __typename?: 'BestPerformingContainersResponse';
  containers?: Array<{
    __typename?: 'BestPerformingContainer';
    uuid: string;
    type: ContainerType;
    dirtDepth: number;
    totalHarvestsWeight: number;
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
};

export type ContainerHarvestsResponseFragment = {
  __typename?: 'ContainerHarvestsResponse';
  harvests: Array<{ __typename?: 'ContainerHarvest'; date: Date; weight: number }>;
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

export type ContainerStatsResponseFragment = {
  __typename?: 'ContainerStatsResponse';
  plantsCount?: number | null;
  harvestsCount?: number | null;
  grossProduce?: number | null;
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

export type CalculateContainerStatsQueryVariables = Exact<{
  input: FindContainerInput;
}>;

export type CalculateContainerStatsQuery = {
  __typename?: 'Query';
  calculateContainerStats: {
    __typename?: 'ContainerStatsResponse';
    plantsCount?: number | null;
    harvestsCount?: number | null;
    grossProduce?: number | null;
  };
};

export type FindBestPerformingContainersQueryVariables = Exact<{
  input: FindBestPerformingContainersInput;
}>;

export type FindBestPerformingContainersQuery = {
  __typename?: 'Query';
  findBestPerformingContainers: {
    __typename?: 'BestPerformingContainersResponse';
    containers?: Array<{
      __typename?: 'BestPerformingContainer';
      uuid: string;
      type: ContainerType;
      dirtDepth: number;
      totalHarvestsWeight: number;
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
  };
};

export type FindContainerHarvestsQueryVariables = Exact<{
  input: FindContainerInput;
}>;

export type FindContainerHarvestsQuery = {
  __typename?: 'Query';
  findContainerHarvests: {
    __typename?: 'ContainerHarvestsResponse';
    harvests: Array<{ __typename?: 'ContainerHarvest'; date: Date; weight: number }>;
  };
};

export type FindContainerPlantsTypesQueryVariables = Exact<{
  input: FindContainerPlantsInput;
}>;

export type FindContainerPlantsTypesQuery = {
  __typename?: 'Query';
  findContainerPlants: {
    __typename?: 'PlantsResponse';
    count: number;
    cursor: string;
    hasMore: boolean;
    plants?: Array<{ __typename?: 'Plant'; uuid: string; type: PlantType }> | null;
  };
};

export type FindContainerPlantsQueryVariables = Exact<{
  input: FindContainerPlantsInput;
}>;

export type FindContainerPlantsQuery = {
  __typename?: 'Query';
  findContainerPlants: {
    __typename?: 'PlantsResponse';
    count: number;
    cursor: string;
    hasMore: boolean;
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

export type HarvestFragment = {
  __typename?: 'Harvest';
  uuid: string;
  quantity: number;
  weight: number;
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

export type HarvestResponseFragment = {
  __typename?: 'HarvestResponse';
  harvest?: {
    __typename?: 'Harvest';
    uuid: string;
    quantity: number;
    weight: number;
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

export type HarvestsResponseFragment = {
  __typename?: 'HarvestsResponse';
  count: number;
  cursor: string;
  hasMore: boolean;
  harvests?: Array<{
    __typename?: 'Harvest';
    uuid: string;
    quantity: number;
    weight: number;
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
};

export type CreateHarvestMutationVariables = Exact<{
  input: CreateHarvestInput;
}>;

export type CreateHarvestMutation = {
  __typename?: 'Mutation';
  createHarvest: {
    __typename?: 'HarvestResponse';
    harvest?: {
      __typename?: 'Harvest';
      uuid: string;
      quantity: number;
      weight: number;
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

export type FindHarvestsQueryVariables = Exact<{
  input: FindHarvestsInput;
}>;

export type FindHarvestsQuery = {
  __typename?: 'Query';
  findHarvests: {
    __typename?: 'HarvestsResponse';
    count: number;
    cursor: string;
    hasMore: boolean;
    harvests?: Array<{
      __typename?: 'Harvest';
      uuid: string;
      quantity: number;
      weight: number;
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
  };
};

export type FindLatestsHarvestsQueryVariables = Exact<{
  input: FindLatestsHarvestsInput;
}>;

export type FindLatestsHarvestsQuery = {
  __typename?: 'Query';
  findLatestsHarvests: {
    __typename?: 'HarvestsResponse';
    count: number;
    cursor: string;
    hasMore: boolean;
    harvests?: Array<{
      __typename?: 'Harvest';
      uuid: string;
      quantity: number;
      weight: number;
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
  };
};

export type FindPlantHarvestsQueryVariables = Exact<{
  input: FindPlantHarvestsInput;
}>;

export type FindPlantHarvestsQuery = {
  __typename?: 'Query';
  findPlantHarvests: {
    __typename?: 'HarvestsResponse';
    count: number;
    cursor: string;
    hasMore: boolean;
    harvests?: Array<{
      __typename?: 'Harvest';
      uuid: string;
      quantity: number;
      weight: number;
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
  };
};

export type FindWeekHarvestsQueryVariables = Exact<{
  input: FindWeekHarvestsInput;
}>;

export type FindWeekHarvestsQuery = {
  __typename?: 'Query';
  findWeekHarvests: {
    __typename?: 'HarvestsResponse';
    count: number;
    cursor: string;
    hasMore: boolean;
    harvests?: Array<{
      __typename?: 'Harvest';
      uuid: string;
      quantity: number;
      weight: number;
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
  };
};

export type HeightRegistrationFragment = {
  __typename?: 'HeightRegistration';
  uuid: string;
  height: number;
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
    height: number;
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
    height: number;
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
      height: number;
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

export type FindHeightRegistrationsQueryVariables = Exact<{
  input: FindHeightRegistrationsInput;
}>;

export type FindHeightRegistrationsQuery = {
  __typename?: 'Query';
  findHeightRegistrations: {
    __typename?: 'HeightRegistrationsResponse';
    heightRegistrations?: Array<{
      __typename?: 'HeightRegistration';
      uuid: string;
      height: number;
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
      height: number;
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

export type PlantTypeFragment = { __typename?: 'Plant'; uuid: string; type: PlantType };

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
  count: number;
  cursor: string;
  hasMore: boolean;
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
};

export type PlantsTypesResponseFragment = {
  __typename?: 'PlantsResponse';
  count: number;
  cursor: string;
  hasMore: boolean;
  plants?: Array<{ __typename?: 'Plant'; uuid: string; type: PlantType }> | null;
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

export type FindUserQueryVariables = Exact<{
  input: FindUserInput;
}>;

export type FindUserQuery = {
  __typename?: 'Query';
  findUser: {
    __typename?: 'UserResponse';
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

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me: {
    __typename?: 'User';
    uuid: string;
    username: string;
    email: string;
    twoFactorEnabled: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type WeatherForecastResponseFragment = {
  __typename?: 'WeatherForecastResponse';
  forecast: Array<{
    __typename?: 'Weather';
    time: string;
    weatherCode: number;
    temperatureMax: number;
    temperatureMin: number;
    uvIndexMax: number;
    precipitationSum: number;
    windSpeedMax: number;
    windDirectionDominant: number;
  }>;
};

export type WeatherFragment = {
  __typename?: 'Weather';
  time: string;
  weatherCode: number;
  temperatureMax: number;
  temperatureMin: number;
  uvIndexMax: number;
  precipitationSum: number;
  windSpeedMax: number;
  windDirectionDominant: number;
};

export type GetWeatherForecastQueryVariables = Exact<{
  input: WeatherForecastInput;
}>;

export type GetWeatherForecastQuery = {
  __typename?: 'Query';
  getWeatherForecast: {
    __typename?: 'WeatherForecastResponse';
    forecast: Array<{
      __typename?: 'Weather';
      time: string;
      weatherCode: number;
      temperatureMax: number;
      temperatureMin: number;
      uvIndexMax: number;
      precipitationSum: number;
      windSpeedMax: number;
      windDirectionDominant: number;
    }>;
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
export const AuthResponseFragmentDoc = gql`
  fragment AuthResponse on AuthResponse {
    user {
      ...User
    }
    authTokens {
      accessToken
      refreshToken
    }
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
export const BestPerformingContainerFragmentDoc = gql`
  fragment BestPerformingContainer on BestPerformingContainer {
    uuid
    type
    dirtDepth
    totalHarvestsWeight
    user {
      ...User
    }
    createdAt
    updatedAt
  }
  ${UserFragmentDoc}
`;
export const BestPerformingContainersResponseFragmentDoc = gql`
  fragment BestPerformingContainersResponse on BestPerformingContainersResponse {
    containers {
      ...BestPerformingContainer
    }
  }
  ${BestPerformingContainerFragmentDoc}
`;
export const ContainerHarvestFragmentDoc = gql`
  fragment ContainerHarvest on ContainerHarvest {
    date
    weight
  }
`;
export const ContainerHarvestsResponseFragmentDoc = gql`
  fragment ContainerHarvestsResponse on ContainerHarvestsResponse {
    harvests {
      ...ContainerHarvest
    }
  }
  ${ContainerHarvestFragmentDoc}
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
export const ContainerStatsResponseFragmentDoc = gql`
  fragment ContainerStatsResponse on ContainerStatsResponse {
    plantsCount
    harvestsCount
    grossProduce
  }
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
export const HarvestFragmentDoc = gql`
  fragment Harvest on Harvest {
    uuid
    quantity
    weight
    plant {
      ...Plant
    }
    createdAt
    updatedAt
  }
  ${PlantFragmentDoc}
`;
export const HarvestResponseFragmentDoc = gql`
  fragment HarvestResponse on HarvestResponse {
    harvest {
      ...Harvest
    }
    errors {
      ...Error
    }
  }
  ${HarvestFragmentDoc}
  ${ErrorFragmentDoc}
`;
export const HarvestsResponseFragmentDoc = gql`
  fragment HarvestsResponse on HarvestsResponse {
    harvests {
      ...Harvest
    }
    count
    cursor
    hasMore
  }
  ${HarvestFragmentDoc}
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
    count
    cursor
    hasMore
  }
  ${PlantFragmentDoc}
`;
export const PlantTypeFragmentDoc = gql`
  fragment PlantType on Plant {
    uuid
    type
  }
`;
export const PlantsTypesResponseFragmentDoc = gql`
  fragment PlantsTypesResponse on PlantsResponse {
    plants {
      ...PlantType
    }
    count
    cursor
    hasMore
  }
  ${PlantTypeFragmentDoc}
`;
export const UserResponseFragmentDoc = gql`
  fragment UserResponse on UserResponse {
    user {
      ...User
    }
  }
  ${UserFragmentDoc}
`;
export const WeatherFragmentDoc = gql`
  fragment Weather on Weather {
    time
    weatherCode
    temperatureMax
    temperatureMin
    uvIndexMax
    precipitationSum
    windSpeedMax
    windDirectionDominant
  }
`;
export const WeatherForecastResponseFragmentDoc = gql`
  fragment WeatherForecastResponse on WeatherForecastResponse {
    forecast {
      ...Weather
    }
  }
  ${WeatherFragmentDoc}
`;
export const LoginDocument = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      ...AuthResponse
    }
  }
  ${AuthResponseFragmentDoc}
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
export const LogOutDocument = gql`
  mutation logOut {
    logOut
  }
`;
export type LogOutMutationFn = Apollo.MutationFunction<LogOutMutation, LogOutMutationVariables>;

/**
 * __useLogOutMutation__
 *
 * To run a mutation, you first call `useLogOutMutation` within a React component and pass it Date options that fit your needs.
 * When your component renders, `useLogOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at Date time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logOutMutation, { data, loading, error }] = useLogOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogOutMutation(baseOptions?: Apollo.MutationHookOptions<LogOutMutation, LogOutMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogOutMutation, LogOutMutationVariables>(LogOutDocument, options);
}
export type LogOutMutationHookResult = ReturnType<typeof useLogOutMutation>;
export type LogOutMutationResult = Apollo.MutationResult<LogOutMutation>;
export type LogOutMutationOptions = Apollo.BaseMutationOptions<LogOutMutation, LogOutMutationVariables>;
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
export const SignUpDocument = gql`
  mutation signUp($input: SignUpInput!) {
    signUp(input: $input) {
      ...AuthResponse
    }
  }
  ${AuthResponseFragmentDoc}
`;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it Date options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at Date time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const AuthCheckDocument = gql`
  query authCheck {
    authCheck
  }
`;

/**
 * __useAuthCheckQuery__
 *
 * To run a query within a React component, call `useAuthCheckQuery` and pass it Date options that fit your needs.
 * When your component renders, `useAuthCheckQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthCheckQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuthCheckQuery(baseOptions?: Apollo.QueryHookOptions<AuthCheckQuery, AuthCheckQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AuthCheckQuery, AuthCheckQueryVariables>(AuthCheckDocument, options);
}
export function useAuthCheckLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AuthCheckQuery, AuthCheckQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AuthCheckQuery, AuthCheckQueryVariables>(AuthCheckDocument, options);
}
export type AuthCheckQueryHookResult = ReturnType<typeof useAuthCheckQuery>;
export type AuthCheckLazyQueryHookResult = ReturnType<typeof useAuthCheckLazyQuery>;
export type AuthCheckQueryResult = Apollo.QueryResult<AuthCheckQuery, AuthCheckQueryVariables>;
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
export const CalculateContainerStatsDocument = gql`
  query calculateContainerStats($input: FindContainerInput!) {
    calculateContainerStats(input: $input) {
      ...ContainerStatsResponse
    }
  }
  ${ContainerStatsResponseFragmentDoc}
`;

/**
 * __useCalculateContainerStatsQuery__
 *
 * To run a query within a React component, call `useCalculateContainerStatsQuery` and pass it Date options that fit your needs.
 * When your component renders, `useCalculateContainerStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCalculateContainerStatsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCalculateContainerStatsQuery(
  baseOptions: Apollo.QueryHookOptions<CalculateContainerStatsQuery, CalculateContainerStatsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CalculateContainerStatsQuery, CalculateContainerStatsQueryVariables>(
    CalculateContainerStatsDocument,
    options
  );
}
export function useCalculateContainerStatsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CalculateContainerStatsQuery, CalculateContainerStatsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CalculateContainerStatsQuery, CalculateContainerStatsQueryVariables>(
    CalculateContainerStatsDocument,
    options
  );
}
export type CalculateContainerStatsQueryHookResult = ReturnType<typeof useCalculateContainerStatsQuery>;
export type CalculateContainerStatsLazyQueryHookResult = ReturnType<typeof useCalculateContainerStatsLazyQuery>;
export type CalculateContainerStatsQueryResult = Apollo.QueryResult<
  CalculateContainerStatsQuery,
  CalculateContainerStatsQueryVariables
>;
export const FindBestPerformingContainersDocument = gql`
  query findBestPerformingContainers($input: FindBestPerformingContainersInput!) {
    findBestPerformingContainers(input: $input) {
      ...BestPerformingContainersResponse
    }
  }
  ${BestPerformingContainersResponseFragmentDoc}
`;

/**
 * __useFindBestPerformingContainersQuery__
 *
 * To run a query within a React component, call `useFindBestPerformingContainersQuery` and pass it Date options that fit your needs.
 * When your component renders, `useFindBestPerformingContainersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindBestPerformingContainersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindBestPerformingContainersQuery(
  baseOptions: Apollo.QueryHookOptions<FindBestPerformingContainersQuery, FindBestPerformingContainersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindBestPerformingContainersQuery, FindBestPerformingContainersQueryVariables>(
    FindBestPerformingContainersDocument,
    options
  );
}
export function useFindBestPerformingContainersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindBestPerformingContainersQuery,
    FindBestPerformingContainersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindBestPerformingContainersQuery, FindBestPerformingContainersQueryVariables>(
    FindBestPerformingContainersDocument,
    options
  );
}
export type FindBestPerformingContainersQueryHookResult = ReturnType<typeof useFindBestPerformingContainersQuery>;
export type FindBestPerformingContainersLazyQueryHookResult = ReturnType<
  typeof useFindBestPerformingContainersLazyQuery
>;
export type FindBestPerformingContainersQueryResult = Apollo.QueryResult<
  FindBestPerformingContainersQuery,
  FindBestPerformingContainersQueryVariables
>;
export const FindContainerHarvestsDocument = gql`
  query findContainerHarvests($input: FindContainerInput!) {
    findContainerHarvests(input: $input) {
      ...ContainerHarvestsResponse
    }
  }
  ${ContainerHarvestsResponseFragmentDoc}
`;

/**
 * __useFindContainerHarvestsQuery__
 *
 * To run a query within a React component, call `useFindContainerHarvestsQuery` and pass it Date options that fit your needs.
 * When your component renders, `useFindContainerHarvestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindContainerHarvestsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindContainerHarvestsQuery(
  baseOptions: Apollo.QueryHookOptions<FindContainerHarvestsQuery, FindContainerHarvestsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindContainerHarvestsQuery, FindContainerHarvestsQueryVariables>(
    FindContainerHarvestsDocument,
    options
  );
}
export function useFindContainerHarvestsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FindContainerHarvestsQuery, FindContainerHarvestsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindContainerHarvestsQuery, FindContainerHarvestsQueryVariables>(
    FindContainerHarvestsDocument,
    options
  );
}
export type FindContainerHarvestsQueryHookResult = ReturnType<typeof useFindContainerHarvestsQuery>;
export type FindContainerHarvestsLazyQueryHookResult = ReturnType<typeof useFindContainerHarvestsLazyQuery>;
export type FindContainerHarvestsQueryResult = Apollo.QueryResult<
  FindContainerHarvestsQuery,
  FindContainerHarvestsQueryVariables
>;
export const FindContainerPlantsTypesDocument = gql`
  query findContainerPlantsTypes($input: FindContainerPlantsInput!) {
    findContainerPlants(input: $input) {
      ...PlantsTypesResponse
    }
  }
  ${PlantsTypesResponseFragmentDoc}
`;

/**
 * __useFindContainerPlantsTypesQuery__
 *
 * To run a query within a React component, call `useFindContainerPlantsTypesQuery` and pass it Date options that fit your needs.
 * When your component renders, `useFindContainerPlantsTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindContainerPlantsTypesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindContainerPlantsTypesQuery(
  baseOptions: Apollo.QueryHookOptions<FindContainerPlantsTypesQuery, FindContainerPlantsTypesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindContainerPlantsTypesQuery, FindContainerPlantsTypesQueryVariables>(
    FindContainerPlantsTypesDocument,
    options
  );
}
export function useFindContainerPlantsTypesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FindContainerPlantsTypesQuery, FindContainerPlantsTypesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindContainerPlantsTypesQuery, FindContainerPlantsTypesQueryVariables>(
    FindContainerPlantsTypesDocument,
    options
  );
}
export type FindContainerPlantsTypesQueryHookResult = ReturnType<typeof useFindContainerPlantsTypesQuery>;
export type FindContainerPlantsTypesLazyQueryHookResult = ReturnType<typeof useFindContainerPlantsTypesLazyQuery>;
export type FindContainerPlantsTypesQueryResult = Apollo.QueryResult<
  FindContainerPlantsTypesQuery,
  FindContainerPlantsTypesQueryVariables
>;
export const FindContainerPlantsDocument = gql`
  query findContainerPlants($input: FindContainerPlantsInput!) {
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
export const CreateHarvestDocument = gql`
  mutation createHarvest($input: CreateHarvestInput!) {
    createHarvest(input: $input) {
      ...HarvestResponse
    }
  }
  ${HarvestResponseFragmentDoc}
`;
export type CreateHarvestMutationFn = Apollo.MutationFunction<CreateHarvestMutation, CreateHarvestMutationVariables>;

/**
 * __useCreateHarvestMutation__
 *
 * To run a mutation, you first call `useCreateHarvestMutation` within a React component and pass it Date options that fit your needs.
 * When your component renders, `useCreateHarvestMutation` returns a tuple that includes:
 * - A mutate function that you can call at Date time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHarvestMutation, { data, loading, error }] = useCreateHarvestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateHarvestMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateHarvestMutation, CreateHarvestMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateHarvestMutation, CreateHarvestMutationVariables>(CreateHarvestDocument, options);
}
export type CreateHarvestMutationHookResult = ReturnType<typeof useCreateHarvestMutation>;
export type CreateHarvestMutationResult = Apollo.MutationResult<CreateHarvestMutation>;
export type CreateHarvestMutationOptions = Apollo.BaseMutationOptions<
  CreateHarvestMutation,
  CreateHarvestMutationVariables
>;
export const FindHarvestsDocument = gql`
  query findHarvests($input: FindHarvestsInput!) {
    findHarvests(input: $input) {
      ...HarvestsResponse
    }
  }
  ${HarvestsResponseFragmentDoc}
`;

/**
 * __useFindHarvestsQuery__
 *
 * To run a query within a React component, call `useFindHarvestsQuery` and pass it Date options that fit your needs.
 * When your component renders, `useFindHarvestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindHarvestsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindHarvestsQuery(
  baseOptions: Apollo.QueryHookOptions<FindHarvestsQuery, FindHarvestsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindHarvestsQuery, FindHarvestsQueryVariables>(FindHarvestsDocument, options);
}
export function useFindHarvestsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FindHarvestsQuery, FindHarvestsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindHarvestsQuery, FindHarvestsQueryVariables>(FindHarvestsDocument, options);
}
export type FindHarvestsQueryHookResult = ReturnType<typeof useFindHarvestsQuery>;
export type FindHarvestsLazyQueryHookResult = ReturnType<typeof useFindHarvestsLazyQuery>;
export type FindHarvestsQueryResult = Apollo.QueryResult<FindHarvestsQuery, FindHarvestsQueryVariables>;
export const FindLatestsHarvestsDocument = gql`
  query findLatestsHarvests($input: FindLatestsHarvestsInput!) {
    findLatestsHarvests(input: $input) {
      ...HarvestsResponse
    }
  }
  ${HarvestsResponseFragmentDoc}
`;

/**
 * __useFindLatestsHarvestsQuery__
 *
 * To run a query within a React component, call `useFindLatestsHarvestsQuery` and pass it Date options that fit your needs.
 * When your component renders, `useFindLatestsHarvestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindLatestsHarvestsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindLatestsHarvestsQuery(
  baseOptions: Apollo.QueryHookOptions<FindLatestsHarvestsQuery, FindLatestsHarvestsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindLatestsHarvestsQuery, FindLatestsHarvestsQueryVariables>(
    FindLatestsHarvestsDocument,
    options
  );
}
export function useFindLatestsHarvestsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FindLatestsHarvestsQuery, FindLatestsHarvestsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindLatestsHarvestsQuery, FindLatestsHarvestsQueryVariables>(
    FindLatestsHarvestsDocument,
    options
  );
}
export type FindLatestsHarvestsQueryHookResult = ReturnType<typeof useFindLatestsHarvestsQuery>;
export type FindLatestsHarvestsLazyQueryHookResult = ReturnType<typeof useFindLatestsHarvestsLazyQuery>;
export type FindLatestsHarvestsQueryResult = Apollo.QueryResult<
  FindLatestsHarvestsQuery,
  FindLatestsHarvestsQueryVariables
>;
export const FindPlantHarvestsDocument = gql`
  query findPlantHarvests($input: FindPlantHarvestsInput!) {
    findPlantHarvests(input: $input) {
      ...HarvestsResponse
    }
  }
  ${HarvestsResponseFragmentDoc}
`;

/**
 * __useFindPlantHarvestsQuery__
 *
 * To run a query within a React component, call `useFindPlantHarvestsQuery` and pass it Date options that fit your needs.
 * When your component renders, `useFindPlantHarvestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPlantHarvestsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindPlantHarvestsQuery(
  baseOptions: Apollo.QueryHookOptions<FindPlantHarvestsQuery, FindPlantHarvestsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindPlantHarvestsQuery, FindPlantHarvestsQueryVariables>(FindPlantHarvestsDocument, options);
}
export function useFindPlantHarvestsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FindPlantHarvestsQuery, FindPlantHarvestsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindPlantHarvestsQuery, FindPlantHarvestsQueryVariables>(
    FindPlantHarvestsDocument,
    options
  );
}
export type FindPlantHarvestsQueryHookResult = ReturnType<typeof useFindPlantHarvestsQuery>;
export type FindPlantHarvestsLazyQueryHookResult = ReturnType<typeof useFindPlantHarvestsLazyQuery>;
export type FindPlantHarvestsQueryResult = Apollo.QueryResult<FindPlantHarvestsQuery, FindPlantHarvestsQueryVariables>;
export const FindWeekHarvestsDocument = gql`
  query findWeekHarvests($input: FindWeekHarvestsInput!) {
    findWeekHarvests(input: $input) {
      ...HarvestsResponse
    }
  }
  ${HarvestsResponseFragmentDoc}
`;

/**
 * __useFindWeekHarvestsQuery__
 *
 * To run a query within a React component, call `useFindWeekHarvestsQuery` and pass it Date options that fit your needs.
 * When your component renders, `useFindWeekHarvestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindWeekHarvestsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindWeekHarvestsQuery(
  baseOptions: Apollo.QueryHookOptions<FindWeekHarvestsQuery, FindWeekHarvestsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindWeekHarvestsQuery, FindWeekHarvestsQueryVariables>(FindWeekHarvestsDocument, options);
}
export function useFindWeekHarvestsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FindWeekHarvestsQuery, FindWeekHarvestsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindWeekHarvestsQuery, FindWeekHarvestsQueryVariables>(FindWeekHarvestsDocument, options);
}
export type FindWeekHarvestsQueryHookResult = ReturnType<typeof useFindWeekHarvestsQuery>;
export type FindWeekHarvestsLazyQueryHookResult = ReturnType<typeof useFindWeekHarvestsLazyQuery>;
export type FindWeekHarvestsQueryResult = Apollo.QueryResult<FindWeekHarvestsQuery, FindWeekHarvestsQueryVariables>;
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
export const FindHeightRegistrationsDocument = gql`
  query findHeightRegistrations($input: FindHeightRegistrationsInput!) {
    findHeightRegistrations(input: $input) {
      ...HeightRegistrationsResponse
    }
  }
  ${HeightRegistrationsResponseFragmentDoc}
`;

/**
 * __useFindHeightRegistrationsQuery__
 *
 * To run a query within a React component, call `useFindHeightRegistrationsQuery` and pass it Date options that fit your needs.
 * When your component renders, `useFindHeightRegistrationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindHeightRegistrationsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindHeightRegistrationsQuery(
  baseOptions: Apollo.QueryHookOptions<FindHeightRegistrationsQuery, FindHeightRegistrationsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindHeightRegistrationsQuery, FindHeightRegistrationsQueryVariables>(
    FindHeightRegistrationsDocument,
    options
  );
}
export function useFindHeightRegistrationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FindHeightRegistrationsQuery, FindHeightRegistrationsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindHeightRegistrationsQuery, FindHeightRegistrationsQueryVariables>(
    FindHeightRegistrationsDocument,
    options
  );
}
export type FindHeightRegistrationsQueryHookResult = ReturnType<typeof useFindHeightRegistrationsQuery>;
export type FindHeightRegistrationsLazyQueryHookResult = ReturnType<typeof useFindHeightRegistrationsLazyQuery>;
export type FindHeightRegistrationsQueryResult = Apollo.QueryResult<
  FindHeightRegistrationsQuery,
  FindHeightRegistrationsQueryVariables
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
      ...User
    }
  }
  ${UserFragmentDoc}
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
export const GetWeatherForecastDocument = gql`
  query getWeatherForecast($input: WeatherForecastInput!) {
    getWeatherForecast(input: $input) {
      ...WeatherForecastResponse
    }
  }
  ${WeatherForecastResponseFragmentDoc}
`;

/**
 * __useGetWeatherForecastQuery__
 *
 * To run a query within a React component, call `useGetWeatherForecastQuery` and pass it Date options that fit your needs.
 * When your component renders, `useGetWeatherForecastQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWeatherForecastQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetWeatherForecastQuery(
  baseOptions: Apollo.QueryHookOptions<GetWeatherForecastQuery, GetWeatherForecastQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetWeatherForecastQuery, GetWeatherForecastQueryVariables>(
    GetWeatherForecastDocument,
    options
  );
}
export function useGetWeatherForecastLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetWeatherForecastQuery, GetWeatherForecastQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetWeatherForecastQuery, GetWeatherForecastQueryVariables>(
    GetWeatherForecastDocument,
    options
  );
}
export type GetWeatherForecastQueryHookResult = ReturnType<typeof useGetWeatherForecastQuery>;
export type GetWeatherForecastLazyQueryHookResult = ReturnType<typeof useGetWeatherForecastLazyQuery>;
export type GetWeatherForecastQueryResult = Apollo.QueryResult<
  GetWeatherForecastQuery,
  GetWeatherForecastQueryVariables
>;
