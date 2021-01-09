import { gql } from 'apollo-boost';

export const DELETE_REVIEW = gql`
mutation DeleteReview($id: ID!){
  deleteReview(id: $id)
}
`;

export const CREATE_USER = gql`
mutation CreateUser($props: CreateUserInput!){
  createUser(user: $props) {
    id
  }
}
`;

export const CREATE_REVIEW = gql`
mutation CreateReview($props: CreateReviewInput!){
  createReview(review: $props) {
    repositoryId
  }
}
`;

export const AUTHORIZE = gql`
mutation Authorize($creds: AuthorizeInput!){
  authorize(credentials: $creds) {
    accessToken
  }
}
`;
