import { gql } from 'apollo-boost';

export const GET_AUTHORIZED_USER_PAGINATED = gql`
  query GetAuthorizedUser($after: String, $first: Int){
    authorizedUser{
      id
      reviews(first: $first, after: $after){
        edges{
          node{
            id
            repository{
              fullName
              id
            }
            rating
            createdAt
            text
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          totalCount
          hasNextPage
        }
      }
    }
  }
`;

export const GET_REPOSITORY_PAGINATED = gql`
query GetRepository($after: String, $first: Int, $repositoryId: ID!) {
  repository(id: $repositoryId) {
    id,
    fullName,
    description,
    language,
    stargazersCount,
    forksCount,
    reviewCount,
    ratingAverage,
    ownerAvatarUrl,
    url,
    reviews(first: $first, after: $after) {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
    }
  }
}
`;

export const GET_REPOSITORY = gql`
query GetRepository($repositoryId: ID!) {
  repository(id: $repositoryId) {
    id,
    fullName,
    description,
    language,
    stargazersCount,
    forksCount,
    reviewCount,
    ratingAverage,
    ownerAvatarUrl,
    url,
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}
`;

export const GET_AUTHORIZED_USER = gql`
  query GetAuthorizedUser($includeReviews: Boolean = false){
    authorizedUser{
      id
      reviews @include(if: $includeReviews){
        edges{
          node{
            id
            repository{
              fullName
            }
            rating
            createdAt
            text
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORIES = gql`
  query GetRepositories($searchKeyword: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
    repositories(searchKeyword: $searchKeyword, orderBy: $orderBy, orderDirection: $orderDirection) {
      edges {
        node {
          id,
          fullName,
          description,
          language,
          stargazersCount,
          forksCount,
          reviewCount,
          ratingAverage,
          ownerAvatarUrl
        }
      }
    }
  }
`;

export const GET_REPOSITORIES_PAGINATED = gql`
  query GetRepositories($first: Int, $after: String, $searchKeyword: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
    repositories(first: $first, after: $after, searchKeyword: $searchKeyword, orderBy: $orderBy, orderDirection: $orderDirection) {
      edges {
        node {
          id,
          fullName,
          description,
          language,
          stargazersCount,
          forksCount,
          reviewCount,
          ratingAverage,
          ownerAvatarUrl
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
    }
  }
`;

// other queries...