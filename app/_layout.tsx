import { LanguageProvider } from '../config/LanguageContext';
import { Stack } from 'expo-router';
import { ClientProvider } from '../components/ClientContext';
import { useEffect } from 'react';

export default function RootLayout() {
  return (
    <LanguageProvider>
      <ClientProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen 
            name="(tabs)" 
            options={{ headerShown: false }}
          />
        </Stack>
      </ClientProvider>
    </LanguageProvider>
  );
}
