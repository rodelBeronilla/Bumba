import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'Kettlebell Coach',
  slug: 'kettlebell-coach',
  version: '0.1.0',
  scheme: 'kettlebellcoach',
  orientation: 'portrait',
  userInterfaceStyle: 'dark',
  newArchEnabled: true,
  ios: {
    bundleIdentifier: 'com.rodelberonilla.kettlebellcoach',
    supportsTablet: false,
    infoPlist: {
      NSBluetoothAlwaysUsageDescription:
        'Pair with your Polar H10 to read heart rate and HRV during holds.',
      NSMotionUsageDescription:
        'Detect arm orientation and sway while holding the kettlebell.',
      UIBackgroundModes: ['bluetooth-central'],
    },
  },
  android: {
    package: 'com.rodelberonilla.kettlebellcoach',
    minSdkVersion: 33,
    permissions: [
      'BLUETOOTH_SCAN',
      'BLUETOOTH_CONNECT',
      'FOREGROUND_SERVICE',
      'FOREGROUND_SERVICE_HEALTH',
      'POST_NOTIFICATIONS',
      'WAKE_LOCK',
    ],
    intentFilters: [
      {
        action: 'VIEW',
        category: ['BROWSABLE', 'DEFAULT'],
        data: [{ scheme: 'kettlebellcoach', host: 'oauth-callback' }],
      },
    ],
  },
  plugins: [
    'expo-router',
    'expo-secure-store',
    [
      'react-native-ble-plx',
      {
        isBackgroundEnabled: true,
        modes: ['peripheral', 'central'],
        bluetoothAlwaysPermission:
          'Pair with your Polar H10 to read heart rate during holds.',
      },
    ],
  ],
  extra: {
    ouraClientId: process.env.EXPO_PUBLIC_OURA_CLIENT_ID ?? '',
  },
  experiments: {
    typedRoutes: true,
  },
};

export default config;
