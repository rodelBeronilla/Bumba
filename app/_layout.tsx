import '../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useSettings } from '@/store/settings';
import { useSession } from '@/store/session';

export default function RootLayout() {
  const hydrateSettings = useSettings((s) => s.hydrate);
  const hydrateSession = useSession((s) => s.hydrate);

  useEffect(() => {
    void hydrateSettings();
    void hydrateSession();
  }, [hydrateSettings, hydrateSession]);

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#0b0d12' },
          headerTintColor: '#e7ecf3',
          contentStyle: { backgroundColor: '#0b0d12' },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Kettlebell Coach' }} />
        <Stack.Screen name="settings" options={{ title: 'Settings', presentation: 'modal' }} />
      </Stack>
    </>
  );
}
