import ApolloClient from 'apollo-boost';
import Constants from 'expo-constants';

const createApolloClient = (authStorage) => {
  return new ApolloClient({
    request: async (operation) => {
      try {
        const accessToken = await authStorage.getAccessToken();
        operation.setContext({
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : '',
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
    // Replace the IP address part with your own IP address!
    //uri: 'http://192.168.42.215:5000/graphql',
    uri: Constants.manifest.extra.apollo_uri
  });
};

export default createApolloClient;