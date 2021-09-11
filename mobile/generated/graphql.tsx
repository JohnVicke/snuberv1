import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Friend = {
  __typename?: 'Friend';
  displayName: Scalars['String'];
  id: Scalars['Float'];
};

export type FriendRequestResponse = {
  __typename?: 'FriendRequestResponse';
  displayName: Scalars['String'];
  updatedAt: Scalars['String'];
  id: Scalars['Float'];
  status: Scalars['String'];
};

export type LatLng = {
  __typename?: 'LatLng';
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type Marker = {
  __typename?: 'Marker';
  id: Scalars['Float'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  title: Scalars['String'];
  imageId: Scalars['String'];
  imageSignedUrl: Scalars['String'];
  creatorId: Scalars['Float'];
  creator: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type MarkerError = {
  __typename?: 'MarkerError';
  type: Scalars['String'];
  message: Scalars['String'];
};

export type MarkerInput = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  title: Scalars['String'];
  image?: Maybe<Scalars['Upload']>;
};

export type MarkerResponse = {
  __typename?: 'MarkerResponse';
  marker?: Maybe<Marker>;
  errors?: Maybe<Array<MarkerError>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  vote: Scalars['Boolean'];
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  updateUser: UserResponse;
  createMarker: MarkerResponse;
  removeMarker: Scalars['Boolean'];
  sendFriendRequest: Scalars['Boolean'];
  answerFriendRequest: Scalars['Boolean'];
};


export type MutationVoteArgs = {
  value: Scalars['Int'];
  postId: Scalars['Int'];
};


export type MutationCreatePostArgs = {
  options: PostInput;
};


export type MutationUpdatePostArgs = {
  title?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationRegisterArgs = {
  input: UserInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  input: UserInput;
};


export type MutationCreateMarkerArgs = {
  options: MarkerInput;
};


export type MutationSendFriendRequestArgs = {
  username: Scalars['String'];
};


export type MutationAnswerFriendRequestArgs = {
  friendsId: Scalars['Int'];
  answer: Scalars['Boolean'];
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  posts: Array<Post>;
  hasMore: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Float'];
  title: Scalars['String'];
  type: Scalars['String'];
  points: Scalars['Float'];
  voteStatus?: Maybe<Scalars['Int']>;
  creatorId: Scalars['Float'];
  creator: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  textSnippet: Scalars['String'];
};

export type PostInput = {
  title: Scalars['String'];
  type: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  posts: PaginatedPosts;
  post?: Maybe<Post>;
  me?: Maybe<User>;
  markers: Array<SnuberMarker>;
  incomingFriendRequests: Array<FriendRequestResponse>;
  outgoingFriendRequests: Array<FriendRequestResponse>;
  friends: Array<Friend>;
};


export type QueryPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};

export type SnuberMarker = {
  __typename?: 'SnuberMarker';
  id: Scalars['Float'];
  creatorId: Scalars['Float'];
  title: Scalars['String'];
  latLng: LatLng;
  updatedAt: Scalars['DateTime'];
  imageSignedUrl?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newMarker: SnuberMarker;
};


export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  displayName: Scalars['String'];
  avatarId: Scalars['String'];
  avatarSignedUrl: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  markers: Array<Marker>;
  posts: Array<Post>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  displayName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  file?: Maybe<Scalars['Upload']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type AnswerFriendRequestMutationVariables = Exact<{
  answer: Scalars['Boolean'];
  friendsId: Scalars['Int'];
}>;


export type AnswerFriendRequestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'answerFriendRequest'>
);

export type CreateMarkerMutationVariables = Exact<{
  title: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  image?: Maybe<Scalars['Upload']>;
}>;


export type CreateMarkerMutation = (
  { __typename?: 'Mutation' }
  & { createMarker: (
    { __typename?: 'MarkerResponse' }
    & { marker?: Maybe<(
      { __typename?: 'Marker' }
      & Pick<Marker, 'latitude' | 'longitude' | 'id' | 'creatorId'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'MarkerError' }
      & Pick<MarkerError, 'type' | 'message'>
    )>> }
  ) }
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RemoveMarkerMutationVariables = Exact<{ [key: string]: never; }>;


export type RemoveMarkerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeMarker'>
);

export type SendFriendRequestMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type SendFriendRequestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sendFriendRequest'>
);

export type FriendsQueryVariables = Exact<{ [key: string]: never; }>;


export type FriendsQuery = (
  { __typename?: 'Query' }
  & { friends: Array<(
    { __typename?: 'Friend' }
    & Pick<Friend, 'id' | 'displayName'>
  )> }
);

export type IncomingFriendRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type IncomingFriendRequestsQuery = (
  { __typename?: 'Query' }
  & { incomingFriendRequests: Array<(
    { __typename?: 'FriendRequestResponse' }
    & Pick<FriendRequestResponse, 'displayName' | 'updatedAt' | 'id'>
  )> }
);

export type MarkersQueryVariables = Exact<{ [key: string]: never; }>;


export type MarkersQuery = (
  { __typename?: 'Query' }
  & { markers: Array<(
    { __typename?: 'SnuberMarker' }
    & Pick<SnuberMarker, 'title' | 'updatedAt' | 'creatorId' | 'id' | 'imageSignedUrl'>
    & { latLng: (
      { __typename?: 'LatLng' }
      & Pick<LatLng, 'latitude' | 'longitude'>
    ) }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'avatarId' | 'avatarSignedUrl' | 'id'>
  )> }
);

export type NewMarkerSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewMarkerSubscription = (
  { __typename?: 'Subscription' }
  & { newMarker: (
    { __typename?: 'SnuberMarker' }
    & Pick<SnuberMarker, 'title' | 'updatedAt' | 'creatorId' | 'imageSignedUrl' | 'id'>
    & { latLng: (
      { __typename?: 'LatLng' }
      & Pick<LatLng, 'latitude' | 'longitude'>
    ) }
  ) }
);

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const AnswerFriendRequestDocument = gql`
    mutation AnswerFriendRequest($answer: Boolean!, $friendsId: Int!) {
  answerFriendRequest(answer: $answer, friendsId: $friendsId)
}
    `;
export type AnswerFriendRequestMutationFn = Apollo.MutationFunction<AnswerFriendRequestMutation, AnswerFriendRequestMutationVariables>;

/**
 * __useAnswerFriendRequestMutation__
 *
 * To run a mutation, you first call `useAnswerFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAnswerFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [answerFriendRequestMutation, { data, loading, error }] = useAnswerFriendRequestMutation({
 *   variables: {
 *      answer: // value for 'answer'
 *      friendsId: // value for 'friendsId'
 *   },
 * });
 */
export function useAnswerFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<AnswerFriendRequestMutation, AnswerFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AnswerFriendRequestMutation, AnswerFriendRequestMutationVariables>(AnswerFriendRequestDocument, options);
      }
export type AnswerFriendRequestMutationHookResult = ReturnType<typeof useAnswerFriendRequestMutation>;
export type AnswerFriendRequestMutationResult = Apollo.MutationResult<AnswerFriendRequestMutation>;
export type AnswerFriendRequestMutationOptions = Apollo.BaseMutationOptions<AnswerFriendRequestMutation, AnswerFriendRequestMutationVariables>;
export const CreateMarkerDocument = gql`
    mutation CreateMarker($title: String!, $latitude: Float!, $longitude: Float!, $image: Upload) {
  createMarker(
    options: {title: $title, latitude: $latitude, longitude: $longitude, image: $image}
  ) {
    marker {
      latitude
      longitude
      id
      creatorId
    }
    errors {
      type
      message
    }
  }
}
    `;
export type CreateMarkerMutationFn = Apollo.MutationFunction<CreateMarkerMutation, CreateMarkerMutationVariables>;

/**
 * __useCreateMarkerMutation__
 *
 * To run a mutation, you first call `useCreateMarkerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMarkerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMarkerMutation, { data, loading, error }] = useCreateMarkerMutation({
 *   variables: {
 *      title: // value for 'title'
 *      latitude: // value for 'latitude'
 *      longitude: // value for 'longitude'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useCreateMarkerMutation(baseOptions?: Apollo.MutationHookOptions<CreateMarkerMutation, CreateMarkerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMarkerMutation, CreateMarkerMutationVariables>(CreateMarkerDocument, options);
      }
export type CreateMarkerMutationHookResult = ReturnType<typeof useCreateMarkerMutation>;
export type CreateMarkerMutationResult = Apollo.MutationResult<CreateMarkerMutation>;
export type CreateMarkerMutationOptions = Apollo.BaseMutationOptions<CreateMarkerMutation, CreateMarkerMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RemoveMarkerDocument = gql`
    mutation RemoveMarker {
  removeMarker
}
    `;
export type RemoveMarkerMutationFn = Apollo.MutationFunction<RemoveMarkerMutation, RemoveMarkerMutationVariables>;

/**
 * __useRemoveMarkerMutation__
 *
 * To run a mutation, you first call `useRemoveMarkerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMarkerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMarkerMutation, { data, loading, error }] = useRemoveMarkerMutation({
 *   variables: {
 *   },
 * });
 */
export function useRemoveMarkerMutation(baseOptions?: Apollo.MutationHookOptions<RemoveMarkerMutation, RemoveMarkerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveMarkerMutation, RemoveMarkerMutationVariables>(RemoveMarkerDocument, options);
      }
export type RemoveMarkerMutationHookResult = ReturnType<typeof useRemoveMarkerMutation>;
export type RemoveMarkerMutationResult = Apollo.MutationResult<RemoveMarkerMutation>;
export type RemoveMarkerMutationOptions = Apollo.BaseMutationOptions<RemoveMarkerMutation, RemoveMarkerMutationVariables>;
export const SendFriendRequestDocument = gql`
    mutation SendFriendRequest($username: String!) {
  sendFriendRequest(username: $username)
}
    `;
export type SendFriendRequestMutationFn = Apollo.MutationFunction<SendFriendRequestMutation, SendFriendRequestMutationVariables>;

/**
 * __useSendFriendRequestMutation__
 *
 * To run a mutation, you first call `useSendFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendFriendRequestMutation, { data, loading, error }] = useSendFriendRequestMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useSendFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<SendFriendRequestMutation, SendFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendFriendRequestMutation, SendFriendRequestMutationVariables>(SendFriendRequestDocument, options);
      }
export type SendFriendRequestMutationHookResult = ReturnType<typeof useSendFriendRequestMutation>;
export type SendFriendRequestMutationResult = Apollo.MutationResult<SendFriendRequestMutation>;
export type SendFriendRequestMutationOptions = Apollo.BaseMutationOptions<SendFriendRequestMutation, SendFriendRequestMutationVariables>;
export const FriendsDocument = gql`
    query Friends {
  friends {
    id
    displayName
  }
}
    `;

/**
 * __useFriendsQuery__
 *
 * To run a query within a React component, call `useFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFriendsQuery(baseOptions?: Apollo.QueryHookOptions<FriendsQuery, FriendsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FriendsQuery, FriendsQueryVariables>(FriendsDocument, options);
      }
export function useFriendsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FriendsQuery, FriendsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FriendsQuery, FriendsQueryVariables>(FriendsDocument, options);
        }
export type FriendsQueryHookResult = ReturnType<typeof useFriendsQuery>;
export type FriendsLazyQueryHookResult = ReturnType<typeof useFriendsLazyQuery>;
export type FriendsQueryResult = Apollo.QueryResult<FriendsQuery, FriendsQueryVariables>;
export const IncomingFriendRequestsDocument = gql`
    query IncomingFriendRequests {
  incomingFriendRequests {
    displayName
    updatedAt
    id
  }
}
    `;

/**
 * __useIncomingFriendRequestsQuery__
 *
 * To run a query within a React component, call `useIncomingFriendRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useIncomingFriendRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIncomingFriendRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useIncomingFriendRequestsQuery(baseOptions?: Apollo.QueryHookOptions<IncomingFriendRequestsQuery, IncomingFriendRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IncomingFriendRequestsQuery, IncomingFriendRequestsQueryVariables>(IncomingFriendRequestsDocument, options);
      }
export function useIncomingFriendRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IncomingFriendRequestsQuery, IncomingFriendRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IncomingFriendRequestsQuery, IncomingFriendRequestsQueryVariables>(IncomingFriendRequestsDocument, options);
        }
export type IncomingFriendRequestsQueryHookResult = ReturnType<typeof useIncomingFriendRequestsQuery>;
export type IncomingFriendRequestsLazyQueryHookResult = ReturnType<typeof useIncomingFriendRequestsLazyQuery>;
export type IncomingFriendRequestsQueryResult = Apollo.QueryResult<IncomingFriendRequestsQuery, IncomingFriendRequestsQueryVariables>;
export const MarkersDocument = gql`
    query Markers {
  markers {
    latLng {
      latitude
      longitude
    }
    title
    updatedAt
    creatorId
    id
    imageSignedUrl
  }
}
    `;

/**
 * __useMarkersQuery__
 *
 * To run a query within a React component, call `useMarkersQuery` and pass it any options that fit your needs.
 * When your component renders, `useMarkersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMarkersQuery({
 *   variables: {
 *   },
 * });
 */
export function useMarkersQuery(baseOptions?: Apollo.QueryHookOptions<MarkersQuery, MarkersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MarkersQuery, MarkersQueryVariables>(MarkersDocument, options);
      }
export function useMarkersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MarkersQuery, MarkersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MarkersQuery, MarkersQueryVariables>(MarkersDocument, options);
        }
export type MarkersQueryHookResult = ReturnType<typeof useMarkersQuery>;
export type MarkersLazyQueryHookResult = ReturnType<typeof useMarkersLazyQuery>;
export type MarkersQueryResult = Apollo.QueryResult<MarkersQuery, MarkersQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    username
    avatarId
    avatarSignedUrl
    id
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const NewMarkerDocument = gql`
    subscription newMarker {
  newMarker {
    latLng {
      latitude
      longitude
    }
    title
    updatedAt
    creatorId
    imageSignedUrl
    id
  }
}
    `;

/**
 * __useNewMarkerSubscription__
 *
 * To run a query within a React component, call `useNewMarkerSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMarkerSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMarkerSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewMarkerSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewMarkerSubscription, NewMarkerSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewMarkerSubscription, NewMarkerSubscriptionVariables>(NewMarkerDocument, options);
      }
export type NewMarkerSubscriptionHookResult = ReturnType<typeof useNewMarkerSubscription>;
export type NewMarkerSubscriptionResult = Apollo.SubscriptionResult<NewMarkerSubscription>;