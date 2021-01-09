import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { DELETE_REVIEW } from '../graphql/mutations';

export const useDeleteReview = () => {
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(DELETE_REVIEW);
  
  const deleteReview = async (id) => {
    try {
      await mutate({ variables: { id } });
      await apolloClient.resetStore();
    } catch (error){
      console.log(error);
    }
  };
  return [deleteReview, result];
};

export default useDeleteReview;