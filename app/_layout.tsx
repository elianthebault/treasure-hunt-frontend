import { AuthProvider } from "@/utils/AuthContext";
import { Stack } from "expo-router";
import "../utils/i18n";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}
