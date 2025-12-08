import { Adventure } from "@/app/models/Adventure";
import { useAuth } from "@/utils/AuthContext";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Header from "../commons/header";

export default function Adventures() {
  const { t } = useTranslation();
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const router = useRouter();

  const { user, refreshUser } = useAuth();

  async function getAdventures(uuid: string) {
    const res = await fetch(`http://localhost:8090/adventurer/${uuid}`);
    const data: Adventure[] = await res.json();
    setAdventures(data);
  }

  useEffect(() => {
    if (user) {
      getAdventures(user!.uuid);
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Header />
      {/* <Menu /> */}
      <Text style={styles.h1}>
        {user?.nickname + "'s " + t("adventures.title")}
      </Text>
      {adventures && adventures.length > 0 ? (
        <Text style={styles.subtitle}>{t("adventures.ongoing")}</Text>
      ) : (
        <Pressable
          style={styles.button}
          onPress={() => router.push("/components/adventure/find")}
        >
          <Text style={styles.buttonText}>
            {t("adventures.findAdventures")}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

export const _stack = {
  screenOptions: {
    headerShown: false,
  },
};

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
