import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
export const STORAGE_KEYS = {
  USER_PROFILE: 'userProfile',
  CHAT_HISTORY: 'chatHistory',
  USER_PREFERENCES: 'userPreferences',
  ONBOARDING_COMPLETED: 'onboardingCompleted',
  THEME: 'theme',
} as const;

// Generic storage functions
export const storage = {
  // Get item from storage
  async get<T>(key: string): Promise<T | null> {
    try {
      const item = await AsyncStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting item ${key}:`, error);
      return null;
    }
  },

  // Set item in storage
  async set<T>(key: string, value: T): Promise<boolean> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting item ${key}:`, error);
      return false;
    }
  },

  // Remove item from storage
  async remove(key: string): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing item ${key}:`, error);
      return false;
    }
  },

  // Clear all storage
  async clear(): Promise<boolean> {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  },

  // Get multiple items
  async getMultiple(keys: string[]): Promise<Record<string, any>> {
    try {
      const pairs = await AsyncStorage.multiGet(keys);
      const result: Record<string, any> = {};
      
      pairs.forEach(([key, value]) => {
        if (value !== null) {
          result[key] = JSON.parse(value);
        }
      });
      
      return result;
    } catch (error) {
      console.error('Error getting multiple items:', error);
      return {};
    }
  },

  // Set multiple items
  async setMultiple(items: Record<string, any>): Promise<boolean> {
    try {
      const pairs = Object.entries(items).map(([key, value]) => [
        key,
        JSON.stringify(value),
      ]);
      
      await AsyncStorage.multiSet(pairs);
      return true;
    } catch (error) {
      console.error('Error setting multiple items:', error);
      return false;
    }
  },
};

// Specific storage functions for the app
export const userStorage = {
  // Get user profile
  async getProfile() {
    return storage.get(STORAGE_KEYS.USER_PROFILE);
  },

  // Save user profile
  async saveProfile(profile: any) {
    return storage.set(STORAGE_KEYS.USER_PROFILE, profile);
  },

  // Get user preferences
  async getPreferences() {
    return storage.get(STORAGE_KEYS.USER_PREFERENCES);
  },

  // Save user preferences
  async savePreferences(preferences: any) {
    return storage.set(STORAGE_KEYS.USER_PREFERENCES, preferences);
  },

  // Check if onboarding is completed
  async isOnboardingCompleted(): Promise<boolean> {
    const completed = await storage.get(STORAGE_KEYS.ONBOARDING_COMPLETED);
    return completed === true;
  },

  // Mark onboarding as completed
  async setOnboardingCompleted() {
    return storage.set(STORAGE_KEYS.ONBOARDING_COMPLETED, true);
  },
};

export const chatStorage = {
  // Get chat history
  async getHistory() {
    return storage.get(STORAGE_KEYS.CHAT_HISTORY);
  },

  // Save chat history
  async saveHistory(history: any) {
    return storage.set(STORAGE_KEYS.CHAT_HISTORY, history);
  },

  // Add new chat session
  async addChatSession(session: any) {
    const history = await this.getHistory() || [];
    history.push(session);
    return this.saveHistory(history);
  },

  // Update chat session
  async updateChatSession(sessionId: string, updates: any) {
    const history = await this.getHistory() || [];
    const index = history.findIndex((session: any) => session.id === sessionId);
    
    if (index !== -1) {
      history[index] = { ...history[index], ...updates };
      return this.saveHistory(history);
    }
    
    return false;
  },
}; 