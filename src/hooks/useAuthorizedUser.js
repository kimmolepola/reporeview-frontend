import { useQuery } from '@apollo/react-hooks';

import { GET_AUTHORIZED_USER } from '../graphql/queries';

const useAuthorizedUser = () => {
  const { loading, error, data } = useQuery(GET_AUTHORIZED_USER);
  return { loading, error, data };
};

export default useAuthorizedUser;