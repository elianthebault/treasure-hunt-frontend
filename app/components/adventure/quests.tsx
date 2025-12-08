import { Quest } from "@/app/models/Quest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Header from "../commons/header";

export default function Quests() {
  const { t } = useTranslation();
  const [quests, setQuests] = useState<Quest[]>([]);

  useEffect(() => {
    async function loadAdventurer() {
      const userStr = await AsyncStorage.getItem("adventurer");
      if (!userStr) return;

      const user = JSON.parse(userStr);
      getQuests(user.uuid);
    }

    loadAdventurer();
  }, []);

  async function getQuests(uuid: string) {
    const res = await fetch(`http://localhost:8090/quests/${uuid}`);
    const data: Quest[] = await res.json();
    setQuests(data);
  }

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.h1}>{t("adventures.quests.title")}</Text>
      {quests && quests.length > 0 ? (
        <Text style={styles.subtitle}>{t("adventures.quests.myQuests")}</Text>
      ) : (
        <Pressable
          style={styles.button}
          onPress={() => router.push("/components/quest/createQuest")}
        >
          <Text style={styles.buttonText}>
            {t("adventures.quests.createQuest")}
          </Text>
        </Pressable>
      )}
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
