import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

export default function Find() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>{t("adventures.find.title")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
  },
  h1: {
    fontSize: 21,
    fontWeight: 900,
    textAlign: "center",
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
  },
  button: {
    backgroundColor: "silver",
    marginVertical: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
  },
});
