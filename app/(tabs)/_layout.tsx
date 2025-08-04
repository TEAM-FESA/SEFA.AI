import { Tabs } from "expo-router";
import React from "react";
import { Image, Platform, Pressable, StyleSheet, Text } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (

    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'white',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          default: {
            backgroundColor: '#000',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Tela",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Chat"
        options={{
          title: "Chat",
          tabBarLabel: ({ focused, color }) => (
            <Text style={{
              color: focused ? '#000' : '#826200', // Cores para ativo/inativo
              fontSize: 12,
              marginBottom: 4, // Ajuste conforme necessário
            }}>
              Chat
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require('../../assets/images/toucan.png')}
              style={{
                margin: 2,
                width: 28,
                height: 28,
                // Remova o padding se quiser controle mais preciso
                tintColor: focused ? '#000' : '#826200' // Cores personalizadas para estado ativo/inativo
              }}
            />
          ),
          // Opção 1: Botão personalizado mantendo a funcionalidade padrão
          tabBarButton: (props) => (
            <Pressable
              {...props}
              style={
                {flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                // Adicione um background se necessário
                backgroundColor: '#FEC20A',
                borderRadius: 200,
                marginBottom: -10,
                marginTop: -25,
                borderWidth: 4,
                transform: [
                  { translateY: 0 } // Move 10 pixels para baixo
                ],
                borderColor:'black',}
            }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({

});


