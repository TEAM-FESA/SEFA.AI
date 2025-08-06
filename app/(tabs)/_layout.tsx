import { Tabs } from "expo-router";
import React from "react";
import { Image, Platform, Pressable, StyleSheet } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { HistoryIcon, HomeIcon, ProfileIcon, TasksIcon } from "@/components/ui/CustomIcons";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (

    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          default: {
            backgroundColor: '#000',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            height: 90,
            paddingBottom: 15,
            paddingTop: 15,
            paddingHorizontal: 10,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <HomeIcon size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Tasks",
          tabBarIcon: ({ color }) => (
            <TasksIcon size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Chat"
        options={{
          title: "Chat",
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/toucan.png')}
              style={{
                width: 30,
                height: 30,
                tintColor: '#000',
              }}
            />
          ),
          tabBarButton: (props) => (
            <Pressable
              {...props}
              style={{
                position: 'absolute',
                left: '50%',
                top: -10,
                transform: [{ translateX: -30 }],
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FEC20A',
                borderRadius: 30,
                width: 60,
                height: 60,
                zIndex: 1000,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => (
            <HistoryIcon size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Perfil"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <ProfileIcon size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({

});