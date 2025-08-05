// app/index.tsx - TELA DE SPLASH SEFA.AI
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Após 3 segundos, vai para onboarding
    const timer = setTimeout(() => {
      console.log("SEFA: Splash finalizado, indo para onboarding");
      router.replace('/onboarding');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logoSefa.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

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
