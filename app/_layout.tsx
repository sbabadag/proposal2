import { Stack } from 'expo-router';
import { ClientProvider } from '../components/ClientContext';

export default function RootLayout() {
  return (
    <ClientProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ClientProvider>
  );
}
