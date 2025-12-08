import { User } from "@/app/models/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Header from "../commons/header";

export default function CreateQuest() {
  const { t } = useTranslation();

  const [user, setUser] = useState<User | null>(null);

  const [post, setPost] = useState({
    authorUUID: "",
    name: "",
    lore: "",
    step: [],
  });

  useEffect(() => {
    async function loadAdventurer() {
      const userStr = await AsyncStorage.getItem("adventurer");
      if (!userStr) return;

      const parsedUser: User = JSON.parse(userStr);

      setUser(parsedUser);

      setPost((prev) => ({
        ...prev,
        authorUUID: parsedUser.uuid,
      }));
    }

    loadAdventurer();
  }, []);

  function onSubmit() {
    const formData = new FormData();
    console.log("QUESTS = ", post);
    formData.append(
      "quest",
      new Blob([JSON.stringify(post)], { type: "application/json" })
    );

    fetch("http://localhost:8090/quests", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log("NEW QUEST:", data))
      .catch((err) => console.log("ERROR:", err));
  }

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.h1}>{t("adventures.quests.createQuest.title")}</Text>
      <Text style={styles.subtitle}>
        {t("adventures.quests.createQuest.subtitle")}
      </Text>

      <Text style={styles.label}>
        {t("adventures.quests.createQuest.nameLabel")}:
      </Text>
      <TextInput
        style={styles.input}
        placeholder={t("adventures.quests.createQuest.namePlaceholder")}
        keyboardType="default"
        value={post.name}
        onChangeText={(value) => {
          setPost((prev) => ({ ...prev, name: value }));
        }}
      />

      <Text style={styles.label}>
        {t("adventures.quests.createQuest.loreLabel")}:
      </Text>
      <TextInput
        style={styles.input}
        placeholder={t("adventures.quests.createQuest.lorePlaceholder")}
        multiline={true}
        numberOfLines={4}
        keyboardType="default"
        value={post.lore}
        onChangeText={(value) => {
          setPost((prev) => ({ ...prev, lore: value }));
        }}
      />
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
  label: {
    color: "gray",
    marginTop: 5,
    marginBottom: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    color: "silver",
    padding: 5,
    borderRadius: 5,
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
