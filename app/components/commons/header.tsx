import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Header() {
  const router = useRouter();
  return (
    <View style={styles.header}>
      <Pressable onPress={() => router.push("/components/commons/profile")}>
        <Text>profile</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {},
});
