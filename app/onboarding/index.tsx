// app/onboarding/index.tsx
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

const { width, height } = Dimensions.get("window");

// Definição das páginas do carrossel
const onboardingPages = [
  {
    image: require("../../assets/images/onboarding1.png"),
    title: "Bem-vindo ao SEFA.AI",
    description: "Sua assistente de IA educacional offline para estudar onde quiser!",
  },
  {
    image: require("../../assets/images/onboarding2.png"),
    title: "Aprenda com IA Offline",
    description: "Nossa IA funciona sem internet, garantindo sua privacidade e acesso sempre.",
  },
  {
    image: require("../../assets/images/onboarding3.png"),
    title: "Vamos Começar!",
    description: "Pronto para transformar seus estudos? Vamos configurar sua IA educacional.",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const page = Math.round(contentOffsetX / width);
    setCurrentPage(page);
  };

  const goToNextPage = async () => {
    if (currentPage < onboardingPages.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: (currentPage + 1) * width,
        animated: true,
      });
    } else {
      // Marcar que o onboarding foi visto
      try {
        await AsyncStorage.setItem('hasSeenOnboarding', 'true');
        console.log("Onboarding LOG: Marcado como visto. Navegando para download.");
        router.navigate('/download');
      } catch (error) {
        console.error("Onboarding LOG: Erro ao salvar estado:", error);
        router.navigate('/download');
      }
    }
  };

  return (
    <View style={styles.container}>
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
            <Image
              source={page.image}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.title}>{page.title}</Text>
            <Text style={styles.description}>{page.description}</Text>
          </View>
        ))}
      </ScrollView>

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

      <TouchableOpacity style={styles.button} onPress={goToNextPage}>
        <Text style={styles.buttonText}>
          {currentPage === onboardingPages.length - 1 ? "Começar" : "Próximo"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

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
