import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons'; // Updated import

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarButton: HapticTab, // Ensure HapticTab handles icon rendering
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          ...Platform.select({
            ios: {
              position: 'absolute',
              backgroundColor: '#ffffff',
              borderTopWidth: 0,
              elevation: 0,
            },
            android: {
              backgroundColor: '#ffffff',
              borderTopWidth: 0,
              elevation: 8,
            },
            default: {},
          }),
          height: 60, // Adjust height as needed
        },
        tabBarShowLabel: true, // Hide labels if only icons are desired
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Proposals"
        options={{
          title: 'Proposals',
          tabBarIcon: ({ color }) => <Ionicons name="document-text-outline" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Clients"
        options={{
          title: 'Clients',
          tabBarIcon: ({ color }) => <Ionicons name="people-outline" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Ionicons name="settings-outline" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
