import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORY_PAGINATED } from '../graphql/queries';

const useRepository = ({ first, id }) => {
  const variables = { first, repositoryId: id };
  const { data, error, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY_PAGINATED, { variables }, { fetchPolicy: 'cache-and-network' });
  const handleFetchMore = () => {
    const canFetchMore =
    !loading && data && data.repository && data.repository.reviews && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore){
      return;
    }

    fetchMore({
      query: GET_REPOSITORY_PAGINATED,
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repository: { 
            ...fetchMoreResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ]
            },
          }
        };
        return nextResult;
      }
    });
  };
  const repository = data ? data.repository : undefined;
  return { repository, fetchMore: handleFetchMore, error, loading, ...result };
};

export default useRepository;