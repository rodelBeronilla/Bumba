# Kettlebell Coach

Native Android port of the web `kettlebell-timer.jsx` prototype, built per
`kettlebellcoachspec.md`. Expo + React Native (Dev Client) with NativeWind, real
BLE access via `react-native-ble-plx`, and an Oura-aware coaching engine.

## Quick start

```bash
# one-time
npm install -g expo eas-cli
eas login

# install deps
npm install

# device build (requires USB-debugging Android phone or simulator)
npx expo run:android --device

# shareable APK
eas build --profile preview --platform android
```

Set `EXPO_PUBLIC_OURA_CLIENT_ID` in `.env` (copy from `.env.example`) before
attempting OAuth. The deep-link redirect URI is
`kettlebellcoach://oauth-callback`.

## Layout

| Path | Role |
| --- | --- |
| `app/_layout.tsx` | Stack root, hydrates Zustand stores |
| `app/index.tsx` | Main timer screen — ticker, sensors, coach |
| `app/settings.tsx` | Modal settings (durations, cues, Oura) |
| `src/components/*` | `ArmDisplay`, `AdviceCard`, `RpeSelector`, `SensorPills`, `RoundLog` |
| `src/coaching/engine.ts` | Layered coach pipeline (safety → form → context → zone) |
| `src/coaching/rules.ts` | RPE zone cues, HR ceiling helper |
| `src/sensors/polar.ts` | H10 BLE: scan, HR `0x2A37` parse, RR capture, RMSSD, auto-reconnect, SecureStore device persistence |
| `src/sensors/motion.ts` | `expo-sensors` Accelerometer + `swayRms` / `tiltDeg` helpers |
| `src/integrations/oura.ts` | OAuth2 PKCE + PAT fast-path, `fetchDailyContext()` |
| `src/store/session.ts` | Zustand: phase, current arm, round history (AsyncStorage) |
| `src/store/settings.ts` | Zustand: durations, cues, last-paired device |
| `src/utils/audio.ts` | `expo-speech` announce, `expo-av` beep, `expo-haptics` |

## Phase status (per spec §4)

- **Phase 0 — Parity:** Timer, voice cues, beep, haptics, wake lock, motion via `expo-sensors`, AsyncStorage round history.
- **Phase 1 — Polar H10:** Scan/connect, RR capture, RMSSD, auto-reconnect, SecureStore last-device. Foreground service still TODO if sustained-screen-off sessions are needed.
- **Phase 2 — Oura:** OAuth2 PKCE flow + PAT fallback, daily context fetch, load-budget banner.
- **Phase 3 — PMD ECG/ACC:** Not yet — see spec for Kotlin-bridge fallback path.
- **Phase 4 — Auto-RPE:** Not yet — designed to slot in alongside the existing manual RPE selector.

## Web → native API map (spec §9)

| Web prototype | Native replacement |
| --- | --- |
| `speechSynthesis.speak` | `Speech.speak` (`expo-speech`) |
| `AudioContext` beeps | `Audio.Sound` (`expo-av`) — see `assets/beep.wav` placeholder |
| `navigator.vibrate` | `Haptics.notificationAsync` (`expo-haptics`) |
| `navigator.wakeLock` | `useKeepAwake()` (`expo-keep-awake`) |
| `DeviceMotionEvent` | `Accelerometer.addListener` (`expo-sensors`) |
| `navigator.bluetooth.requestDevice` | `BleManager.startDeviceScan` (`react-native-ble-plx`) |
| `localStorage` | `AsyncStorage` |
| Persistent secrets | `SecureStore` |

## Notes

- `assets/beep.wav` is intentionally absent from the repo — drop a real short tone there before shipping. `src/utils/audio.ts` resolves the require lazily, so missing-asset is a no-op (TTS + haptics still fire).
- Min Android SDK 33 (per spec §2) — set via `app.config.ts`.
- The coaching engine in `src/coaching/engine.ts` ports the layered pipeline from spec §7 verbatim; rules in `rules.ts` are intentionally edit-friendly.
