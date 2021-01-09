import { useMutation } from '@apollo/react-hooks';
import { CREATE_USER } from '../graphql/mutations';

const useSignUp = () => {

  const [mutate] = useMutation(CREATE_USER);
  
  const signUp = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    const { data } = await mutate({ variables: { props: { username, password } } });
    return data;
  };
  return [signUp];
};

export default useSignUp;