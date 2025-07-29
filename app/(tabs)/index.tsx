import { Image } from "expo-image";
import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#fff", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/logoSefa.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Bem vindo entusiasta!</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Aprendizado Individualizado</ThemedText>
        <ThemedText>
          Nossa I.A. identifica as áreas do conhecimento e técnicas que mais se
          adaptam ao seu aprendizado.{" "}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Funcionamento Offline</ThemedText>
        <ThemedText>
          A partir de uma download prévio, o aplicativo irá conter todas as
          funcionalidades offline, atendendo os estudantes em locais remotos.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Conteúdo Especializado</ThemedText>
        <ThemedText>
          Nossa I.A. conta com treinamento especializado, supervisionado por
          profissionais concentuais da educação e psicologia.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 50,
    position: "absolute",
  },
});
