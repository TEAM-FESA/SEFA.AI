// app/(tabs)/download.tsx - TELA DE DOWNLOAD DO MODELO
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

// Textos motivacionais que aparecem durante o download
const loadingMessages = [
  "Preparando sua IA educacional...",
  "Baixando o modelo Gemma 3n...",
  "Configurando o aprendizado offline...",
  "Quase pronto! Não saia do app...",
  "Otimizando para seu dispositivo...",
  "Preparando perguntas e respostas...",
  "Configurando privacidade total...",
  "Finalizando a instalação...",
  "Sua IA está quase pronta!",
  "Últimos ajustes... Aguarde!"
];

export default function DownloadScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    // Simula o progresso do download
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Quando completo, vai para o chat
          setTimeout(() => {
            router.replace('/(tabs)/Home');
          }, 1000);
          return 100;
        }
        return prev + 2; // Incrementa 2% a cada 200ms (10 segundos total)
      });
    }, 200);

    // Muda a mensagem a cada 1 segundo
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % loadingMessages.length);
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [router]);

  return (
    <View style={styles.container}>
      {/* Logo do App */}
      <Image
        source={require("../../assets/images/logoSefa.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Barra de Progresso */}
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

      {/* Mensagem Motivacional */}
      <Text style={styles.loadingMessage}>
        {loadingMessages[currentMessage]}
      </Text>

      {/* Aviso para não sair */}
      <Text style={styles.warningText}>
        ⚠️ Não saia do aplicativo durante o download
      </Text>
    </View>
  );
}

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
