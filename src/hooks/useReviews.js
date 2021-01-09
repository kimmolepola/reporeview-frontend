import { GET_AUTHORIZED_USER_PAGINATED } from '../graphql/queries';
import { useQuery } from '@apollo/react-hooks';

const useReviews = ({ first }) => {
  const variables = { includeReviews: true, first };
  const { data, error, loading, fetchMore, ...result } = useQuery(GET_AUTHORIZED_USER_PAGINATED, { variables }, { fetchPolicy: 'cache-and-network' });
  const handleFetchMore = () => {
    const canFetchMore =
        !loading && data && data.authorizedUser && data.authorizedUser.reviews && data.authorizedUser.reviews.pageInfo.hasNextPage;

    if (!canFetchMore){
      return;
    }

    fetchMore({
      query: GET_AUTHORIZED_USER_PAGINATED,
      variables: {
        after: data.authorizedUser.reviews.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          authorizedUser: {
            ...fetchMoreResult.authorizedUser,
            reviews: {
              ...fetchMoreResult.authorizedUser.reviews,
              edges: [
                ...previousResult.authorizedUser.reviews.edges,
                ...fetchMoreResult.authorizedUser.reviews.edges,
              ],
            },
          }
        };
        return nextResult;
      }
    });
  };
  const reviews = data && data.authorizedUser ? data.authorizedUser.reviews : undefined;
  return { reviews, fetchMore: handleFetchMore, error, loading, ...result };
};

export default useReviews;