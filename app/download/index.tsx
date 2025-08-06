/**
 * SEFA.AI - Model Download Screen Component
 * 
 * This screen handles the download of the Gemma 3n AI model from Hugging Face.
 * Features:
 * - Real-time download progress with visual feedback
 * - Motivational messages during download process
 * - Integration with expo-file-system for reliable downloads
 * - MediaPipe preparation simulation
 * - Automatic navigation to chat after successful download
 * - COMPLETELY OFFLINE FUNCTIONALITY after download
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

// Get device width for responsive progress bar
const { width } = Dimensions.get('window');

/**
 * Motivational messages displayed during model download
 * These messages keep users engaged and informed about the process
 */
const loadingMessages = [
  "Preparing your educational AI...",
  "Downloading Gemma 3n model...",
  "Configuring offline learning...",
  "Almost ready! Don't leave the app...",
  "Optimizing for your device...",
  "Preparing questions and answers...",
  "Configuring total privacy...",
  "Finalizing installation...",
  "Your AI is almost ready!",
  "Last adjustments... Wait!"
];

export default function DownloadScreen() {
  const router = useRouter();
  
  // State management for download progress and UI
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    // Cleanup flag to prevent state updates after component unmount
    let isMounted = true;
    
    /**
     * Main download function for Gemma 3n AI model
     * Downloads the .task file from Hugging Face and prepares it for MediaPipe
     */
    async function startDownload() {
      // Hugging Face model URL - Gemma 3n optimized for educational tasks
      const modelUrl = 'https://huggingface.co/SuellenFerraz/Gemma-3n-Task-File/resolve/main/gemma-3n-E2B-it-int4.task?download=true';
      const modelPath = FileSystem.documentDirectory + 'gemma-3n-E2B-it-int4.task';
      
      try {
        // Create resumable download with progress tracking
        const downloadResumable = FileSystem.createDownloadResumable(
          modelUrl,
          modelPath,
          {},
          (downloadProgress) => {
            // Only update progress if component is still mounted
            if (!isMounted) return;
            
            // Calculate and update download progress percentage
            const progress = Math.round(
              (downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite) * 100
            );
            setProgress(progress);
          }
        );
        
        // Execute the download
        await downloadResumable.downloadAsync();
        
        // Mark model as downloaded in persistent storage for offline functionality
        await AsyncStorage.setItem('modelDownloaded', 'true');
        await AsyncStorage.setItem('modelPath', modelPath); // Save model path for MediaPipe
        
        // MediaPipe integration simulation (in production, this would initialize MediaPipe)
        console.log('Simulating MediaPipe integration: model recognized and ready for offline use!');
        
        // Small delay for better UX, then navigate to onboarding chat
        setTimeout(() => {
          if (isMounted) router.replace('/chat');
        }, 1000);
        
      } catch (e) {
        // Handle download errors gracefully
        setProgress(0);
        alert('Error downloading model. Check your connection and try again.');
        console.error('Download error:', e);
      }
    }
    
    startDownload();
    
    // Cleanup function to prevent memory leaks
    return () => { isMounted = false; };
  }, [router]);

  return (
    <View style={styles.container}>
      {/* SEFA.AI logo to maintain brand consistency */}
      <Image
        source={require("../../assets/images/logoSefa.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Progress bar showing download completion percentage */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${progress}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>{progress}%</Text>
      </View>

      {/* Motivational message that cycles during download */}
      <Text style={styles.loadingMessage}>
        {loadingMessages[currentMessage]}
      </Text>

      {/* Warning to keep user engaged and prevent app closure */}
      <Text style={styles.warningText}>
        ⚠️ Don&apos;t leave the app during download
      </Text>
    </View>
  );
}

/**
 * Stylesheet for Download Screen
 * Clean, centered layout with animated progress elements
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 50,
  },
  progressContainer: {
    width: '90%',
    alignItems: 'center',
    marginBottom: 30,
  },
  progressBar: {
    width: '100%',
    height: 12,
    backgroundColor: '#000',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FEC20A',
    borderRadius: 6,
  },
  progressText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  loadingMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  warningText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#FF6B6B',
    fontWeight: '600',
    marginTop: 20,
  },
});
