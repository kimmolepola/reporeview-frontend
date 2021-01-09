import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES_PAGINATED } from '../graphql/queries';
import { useDebounce } from 'use-debounce';

const useRepositories = ({ first, ordering, filterKeyword }) => {
  const [searchKeyword] = useDebounce(filterKeyword, 250);
  const { orderBy, orderDirection } = ordering;
  const variables = { first, searchKeyword, orderBy, orderDirection };
  const { data, error, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES_PAGINATED, { variables }, { fetchPolicy: 'cache-and-network' });
  const handleFetchMore = () => {
    const canFetchMore =
    !loading && data && data.repositories && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore){
      return;
    }

    fetchMore({
      query: GET_REPOSITORIES_PAGINATED,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        };
        return nextResult;
      }
    });
  };
  const repositories = data ? data.repositories : undefined;

  return { repositories, fetchMore: handleFetchMore, error, loading, ...result };
};

export default useRepositories;

/*
const useRepositories = (ordering, filterKeyword) => {
  const [searchKeyword] = useDebounce(filterKeyword, 250);
  const { orderBy, orderDirection } = ordering;
  const { data, error, loading } = useQuery(GET_REPOSITORIES, { variables: { searchKeyword, orderBy, orderDirection } }, { fetchPolicy: 'cache-and-network' });
  const repositories = data ? data.repositories : undefined;
  return { repositories, error, loading };
};
*/