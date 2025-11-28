import { Adventure } from "@/app/models/Adventure";
import { User } from "@/app/models/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Adventures() {
  const { t } = useTranslation();
  const [adventurer, setAdventurer] = useState<User>();
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function loadAdventurer() {
      const userStr = await AsyncStorage.getItem("adventurer");
      if (userStr) {
        const user: User = JSON.parse(userStr);
        setAdventurer(user);
        getAdventures(user.uuid);
      }
    }
    loadAdventurer();
  }, []);

  async function getAdventures(uuid: string) {
    const res = await fetch(`http://localhost:8090/adventurer/${uuid}`);
    const data: Adventure[] = await res.json();
    setAdventures(data);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>
        {adventurer?.nickname + "'s " + t("adventures.title")}
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
    width: "90%",
    margin: "auto",
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
