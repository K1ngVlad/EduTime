import AsyncStorage from '@react-native-async-storage/async-storage';

class CacheService {
  static async checkCache(key) {
    try {
      const date = new Date();
      const time = date.getTime();

      const cachedData = await AsyncStorage.getItem(key);

      if (!cachedData) {
        return {
          cached: false,
          cachedData: null,
        };
      }

      const cachedTime = await AsyncStorage.getItem(`${key}_date`);

      if (!cachedTime) {
        return {
          cached: false,
          cachedData: cachedData,
        };
      }

      const parsedData = JSON.parse(cachedData);
      if (time - Number(cachedTime) < 15000 * 60 && time > Number(cachedTime)) {
        return {
          cached: true,
          cachedData: parsedData,
        };
      }

      return {
        cached: false,
        cachedData: parsedData,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async cache(key, data) {
    try {
      const date = new Date();
      const time = String(date.getTime());
      const stringData = JSON.stringify(data);

      await AsyncStorage.setItem(key, stringData);
      await AsyncStorage.setItem(`${key}_date`, time);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export { CacheService };
