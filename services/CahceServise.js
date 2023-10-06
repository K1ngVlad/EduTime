import AsyncStorage from '@react-native-async-storage/async-storage';

class CacheService {
  static async cache(url) {
    try {
      const date = new Date();
      const currentMinutes = date.getTime();

      const minutes = await AsyncStorage.getItem(`${url}_minutes`);

      if (minutes) {
      }

      await AsyncStorage.setItem(`${url}_minutes`, String(currentMinutes));
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export { CacheService };
