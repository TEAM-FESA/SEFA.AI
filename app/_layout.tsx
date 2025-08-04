// app/_layout.tsx
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
// REMOVA QUALQUER IMPORTAÇÃO DE AsyncStorage AQUI!
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

// Essencial: Previne que a splash screen nativa do Expo se esconda automaticamente.
// Deve ser chamado o mais cedo possível, antes mesmo do componente RootLayout ser montado.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [showCustomSplash, setShowCustomSplash] = useState(true); // Controla a visibilidade da nossa splash personalizada

  useEffect(() => {
    async function prepareAppAndHideSplash() {
      try {
        // --- INÍCIO DA SIMULAÇÃO DA ANIMAÇÃO DO LOGO/CARREGAMENTO ---
        // Simula um tempo de 3 segundos para a animação do logo ou carregamento inicial.
        console.log("RootLayout LOG: Iniciando simulação da splash screen...");
        await new Promise((resolve) => setTimeout(resolve, 3000)); // Duração da sua splash
        console.log("RootLayout LOG: Simulação da splash screen concluída.");

        // NENHUMA LÓGICA DE VERIFICAÇÃO DE ESTADO AQUI.
        // O onboarding será SEMPRE o próximo passo após a splash.
      } catch (e) {
        console.warn(
          "RootLayout LOG: Erro durante a preparação do aplicativo:",
          e
        );
      } finally {
        // Uma vez que o tempo de simulação terminou, ocultamos nossa splash personalizada.
        setShowCustomSplash(false);
        // E também ocultamos a splash screen nativa do Expo (se ainda estiver visível).
        SplashScreen.hideAsync();
        console.log(
          "RootLayout LOG: SplashScreen.hideAsync chamado e showCustomSplash = false."
        );
      }
    }

    prepareAppAndHideSplash();
  }, []); // O array vazio [] garante que este efeito rode apenas uma vez na montagem inicial.

  // SE showCustomSplash FOR VERDADEIRO, EXIBIMOS APENAS A TELA DO LOGO.
  // Nada mais é renderizado abaixo deste "if".
  if (showCustomSplash) {
    console.log("RootLayout LOG: Renderizando Splash Screen Personalizada.");
    return (
      <View style={styles.splashContainer}>
        <Image
          source={require("../assets/images/logoSefa.png")} // <<<<<< AJUSTE O CAMINHO PARA SEU LOGO AQUI!
          style={styles.logo}
          resizeMode="contain"
        />
        {/* Você pode adicionar um ActivityIndicator ou sua animação real aqui */}
      </View>
    );
  }

  // SOMENTE QUANDO showCustomSplash FOR FALSO, A STACK DE NAVEGAÇÃO É RENDERIZADA.
  // E a primeira tela da Stack é SEMPRE o carrossel de onboarding.
  console.log(
    "RootLayout LOG: Renderizando Stack de Navegação Principal (SEMPRE para Onboarding)."
  );
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Esta é a PRIMEIRA TELA que será mostrada após a splash do logo. */}
        {/* O Expo Router prioriza a primeira Stack.Screen definida aqui como rota inicial. */}
        <Stack.Screen
          name="onboarding/index" // Caminho para sua tela de carrossel de onboarding
          options={{ headerShown: false }} // Oculta o cabeçalho padrão
        />

        {/* Todas as outras rotas do seu aplicativo vêm DEPOIS. */}
        {/* Elas só serão acessadas após o onboarding ser concluído via botão "Continue". */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* Adicione outras telas que você possa ter no futuro (ex: login/initial, login/chat) */}
        {/* <Stack.Screen name="login/initial" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="login/chat" options={{ headerShown: false }} /> */}
        <Stack.Screen name="Home/index" />
        {/* Rota para lidar com caminhos não encontrados (404) */}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Cor de fundo da sua splash screen
  },
  logo: {
    width: 200, // Ajuste o tamanho do logo
    height: 200,
  },
});
