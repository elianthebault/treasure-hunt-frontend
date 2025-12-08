import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Menu() {
  const router = useRouter();
  return (
    <View style={styles.menu}>
      <Text>COUCOU</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileBtn: {},
  menuBtn: {},
  menu: {
    position: "absolute",
    display: "flex",
    zIndex: 9999,
    backgroundColor: "silver",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
