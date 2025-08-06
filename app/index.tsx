/**
 * SEFA.AI - Splash Screen Component
 * 
 * This is the initial screen that appears when the app starts.
 * It handles the conditional navigation logic based on app state:
 * 1. Shows SEFA.AI logo for at least 2 seconds
 * 2. Checks if AI model is downloaded
 * 3. Checks if user profile exists
 * 4. Navigates to appropriate screen based on these conditions
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    /**
     * Main function to check app state and navigate accordingly
     * This function determines the user's journey through the app
     */
    async function checkAppState() {
      // Ensure splash screen is visible for at least 2 seconds for better UX
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check if the Gemma 3n AI model has been downloaded to device storage
      const modelDownloaded = await AsyncStorage.getItem('modelDownloaded');
      
      // Check if user has completed the onboarding chat and created profile
      const userProfile = await AsyncStorage.getItem('userProfile');
      
      // Navigation logic based on current app state
      if (!modelDownloaded) {
        // First time user: show onboarding slides then proceed to download
        router.replace('/onboarding');
      } else if (!userProfile) {
        // Model exists but no user profile: go to onboarding chat
        router.replace('/chat');
      } else {
        // Everything is ready: go directly to main dashboard
        router.replace('/(tabs)/Home');
      }
    }
    
    checkAppState();
  }, [router]); // Router dependency ensures navigation works properly

  return (
    <View style={styles.container}>
      {/* SEFA.AI Logo - displayed while checking app state */}
      <Image
        source={require("../assets/images/logoSefa.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

/**
 * Stylesheet for Splash Screen
 * Simple centered layout with white background
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 250,
    height: 250,
  },
});
