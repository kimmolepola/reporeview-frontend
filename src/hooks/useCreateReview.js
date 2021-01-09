import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { CREATE_REVIEW } from '../graphql/mutations';

export const useCreateReview = () => {
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const review = async ({ ownerName, repositoryName, rating, text }) => {
    // call the mutate function here with the right arguments

    const { data } = await mutate({ variables: { props: { ownerName, repositoryName, rating, text } } });
    await apolloClient.resetStore();
    return data;
  };
  return [review, result];
};

export default useCreateReview;