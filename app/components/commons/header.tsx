import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Header() {
  const router = useRouter();
  return (
    <View style={styles.header}>
      <Pressable
        style={styles.profileBtn}
        onPress={() => router.push("/components/commons/profile")}
      >
        <Text>profile</Text>
      </Pressable>
    </View>
  );
}

function toggleMenu() {
  console.log("MENU");
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 99,
  },
  profileBtn: {},
  menuBtn: {},
});
