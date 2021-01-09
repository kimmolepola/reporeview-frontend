import AsyncStorage from '@react-native-community/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    // Get the access token for the storage
    try {
      const token = await AsyncStorage.getItem(`${this.namespace}:accessToken`);
      return token ? JSON.parse(token) : null;
    } catch (e) {
      console.log(e);
    }
  }

  async setAccessToken(accessToken) {
    // Add the access token to the storage
    try {
      await AsyncStorage.setItem(`${this.namespace}:accessToken`, JSON.stringify(accessToken));
    } catch (e) {
      console.log(e);
    }
  }

  async removeAccessToken() {
    // Remove the access token from the storage
    try {
      await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
    } catch (e) {
      console.log(e);
    }
  }
}

export default AuthStorage;