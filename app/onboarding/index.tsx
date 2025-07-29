// app/onboarding/index.tsx
import { useRouter } from "expo-router";
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
// REMOVA QUALQUER IMPORTAÇÃO DE AsyncStorage AQUI!

const { width, height } = Dimensions.get("window");

// Definição das páginas do carrossel
const onboardingPages = [
  {
    image: require("../../assets/images/onboarding1.png"), // <<<<<< AJUSTE O CAMINHO PARA SUA IMAGEM DA TELA 1
    title: "Welcome to Surf.",
    description: "I provide essential stuff for your UI designs every Tuesday!",
  },
  {
    image: require("../../assets/images/onboarding2.png"), // <<<<<< AJUSTE O CAMINHO PARA SUA IMAGEM DA TELA 2
    title: "Discover Amazing Features.",
    description:
      "Explore a world of possibilities with our intuitive interface.",
  },
  {
    image: require("../../assets/images/onboarding3.png"), // <<<<<< AJUSTE O CAMINHO PARA SUA IMAGEM DA TELA 3
    title: "Get Started Now!",
    description: "Ready to dive in? Let's begin your journey.",
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

  const goToNextPage = () => {
    // Não precisa ser 'async' pois não usa 'await'
    if (currentPage < onboardingPages.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: (currentPage + 1) * width,
        animated: true,
      });
    } else {
      // Quando o carrossel é finalizado, simplesmente navega para as Tabs.
      // NENHUMA OPERAÇÃO COM ASYNCSTORAGE AQUI.
      console.log(
        "Onboarding LOG: Carrossel finalizado. Navegando para as Tabs."
      );
      router.replace("/(tabs)"); // Usa replace para que o usuário não possa voltar ao onboarding
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
          {currentPage === 0 ? "Continue" : "Next"}
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
    width: "80%",
    height: Dimensions.get("window").height * 0.4,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    paddingHorizontal: 20,
  },
  pagination: { flexDirection: "row", position: "absolute", bottom: 180 },
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
    bottom: 70,
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: { color: "#000", fontSize: 18, fontWeight: "bold" },
});
