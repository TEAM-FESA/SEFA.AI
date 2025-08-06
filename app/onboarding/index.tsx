/**
 * SEFA.AI - Onboarding Screen Component
 * 
 * This screen introduces new users to SEFA.AI through a series of slides.
 * Features:
 * - Interactive carousel with 3 introduction slides
 * - Educational messaging about offline AI capabilities
 * - Navigation to model download after completion
 * - Smooth animations and professional UI
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useRef, useState } from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

// Get device dimensions for responsive design
const { width, height } = Dimensions.get("window");

/**
 * Onboarding carousel pages configuration
 * Each page introduces a key concept about SEFA.AI
 */
const onboardingPages = [
  {
    image: require("../../assets/images/onboarding1.png"),
    title: "Welcome to SEFA.AI",
    description: "Your offline AI educational assistant to study anywhere!",
  },
  {
    image: require("../../assets/images/onboarding2.png"),
    title: "Learn with Offline AI",
    description: "Our AI works without internet, ensuring your privacy and access anytime.",
  },
  {
    image: require("../../assets/images/onboarding3.png"),
    title: "Let's Start!",
    description: "Ready to transform your studies? Let's configure your educational AI.",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  
  // State management for carousel navigation
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  /**
   * Handle scroll events to track current page
   * Updates the page indicator dots based on scroll position
   */
  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const page = Math.round(contentOffsetX / width);
    setCurrentPage(page);
  };

  /**
   * Navigation function for Next/Start button
   * Scrolls to next page or navigates to download screen when finished
   */
  const goToNextPage = async () => {
    if (currentPage < onboardingPages.length - 1) {
      // Navigate to next slide in carousel
      scrollViewRef.current?.scrollTo({
        x: (currentPage + 1) * width,
        animated: true,
      });
    } else {
      // Onboarding completed - mark as seen and proceed to download
      try {
        await AsyncStorage.setItem('hasSeenOnboarding', 'true');
        console.log("Onboarding completed successfully. Navigating to download.");
        router.navigate('/download');
      } catch (error) {
        console.error("Error saving onboarding state:", error);
        // Navigate anyway to avoid blocking user
        router.navigate('/download');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Horizontal scrollable carousel for onboarding slides */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {onboardingPages.map((page, index) => (
          <View key={index} style={styles.page}>
            {/* Educational illustration for current slide */}
            <Image
              source={page.image}
              style={styles.image}
              resizeMode="contain"
            />
            {/* Main title for current slide */}
            <Text style={styles.title}>{page.title}</Text>
            {/* Descriptive text explaining the feature */}
            <Text style={styles.description}>{page.description}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Page indicator dots */}
      <View style={styles.pagination}>
        {onboardingPages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentPage === index ? styles.activeDot : null,
            ]}
          />
        ))}
      </View>

      {/* Navigation button - changes text based on current page */}
      <TouchableOpacity style={styles.button} onPress={goToNextPage}>
        <Text style={styles.buttonText}>
          {currentPage === onboardingPages.length - 1 ? "Start" : "Next"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

/**
 * Stylesheet for Onboarding Screen
 * Responsive design that adapts to different screen sizes
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  page: {
    width: width,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: "70%",
    height: Dimensions.get("window").height * 0.35,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
    paddingHorizontal: 15,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    paddingHorizontal: 30,
    lineHeight: 22,
    marginBottom: 20,
  },
  pagination: { 
    flexDirection: "row", 
    position: "absolute", 
    bottom: 220,
    alignSelf: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeDot: { backgroundColor: "#000" },
  button: {
    position: "absolute",
    bottom: 100,
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: "center",
  },
  buttonText: { color: "#000", fontSize: 18, fontWeight: "bold" },
});
