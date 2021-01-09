import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useApolloClient } from '@apollo/react-hooks';

const useSignOut = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const signOut = async () => {
    try {
      await authStorage.removeAccessToken();
      try {
        await apolloClient.resetStore();
      } catch (error){
        console.log(error);
      }
    } catch (error){
      console.log(error);
    }
    
  };
  return signOut;
};

export default useSignOut;