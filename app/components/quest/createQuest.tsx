import { questRequest } from "@/app/models/questRequest";
import { API_URL } from "@/utils/api";
import { useAuth } from "@/utils/AuthContext";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Header from "../commons/header";

export default function CreateQuest() {
  const { t } = useTranslation();

  const { user, refreshUser } = useAuth();

  const [post, setPost] = useState<questRequest>({
    authorUuid: "",
    name: "",
    lore: "",
    firstStep: {
      puzzle: {
        riddle: "",
        clue: "",
      },
      previousStepId: null,
      longitude: null,
      latitude: null,
      radius: null,
    },
  });

  useEffect(() => {
    if (user) {
      setPost((prev) => ({ ...prev, authorUuid: user.uuid }));
    }
  }, [user]);

  function onSubmit() {
    console.log("POST = ", post);
    fetch(`${API_URL}/quests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text);
        }
        return res.json();
      })
      .then((data) => console.log("NEW QUEST:", data))
      .catch((err) => console.error("ERROR:", err.message));
  }

  async function getCurrentLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("Location permission denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });

    setPost((prev) => ({
      ...prev,
      firstStep: {
        ...prev.firstStep,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        radius: location.coords.accuracy,
      },
    }));
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

      <Text style={styles.h2}>
        {t("adventures.quests.createQuest.firstStep")}
      </Text>
      <Text style={styles.p}>{t("adventures.quests.createQuest.mystery")}</Text>

      <Text style={styles.label}>
        {t("adventures.quests.createQuest.riddleLabel")}:
      </Text>
      <TextInput
        style={styles.input}
        placeholder={t("adventures.quests.createQuest.riddlePlaceholder")}
        multiline={true}
        numberOfLines={4}
        keyboardType="default"
        value={post.firstStep.puzzle.riddle}
        onChangeText={(value) => {
          setPost((prev) => ({
            ...prev,
            firstStep: {
              ...prev.firstStep,
              puzzle: {
                ...prev.firstStep.puzzle,
                riddle: value,
              },
            },
          }));
        }}
      />

      <Text style={styles.label}>
        {t("adventures.quests.createQuest.clueLabel")}:
      </Text>
      <TextInput
        style={styles.input}
        placeholder={t("adventures.quests.createQuest.cluePlaceholder")}
        multiline={true}
        numberOfLines={4}
        keyboardType="default"
        value={post.firstStep.puzzle.clue}
        onChangeText={(value) => {
          setPost((prev) => ({
            ...prev,
            firstStep: {
              ...prev.firstStep,
              puzzle: {
                ...prev.firstStep.puzzle,
                clue: value,
              },
            },
          }));
        }}
      />

      <Pressable style={styles.button} onPress={getCurrentLocation}>
        <Text style={styles.buttonText}>
          {t("adventures.quests.createQuest.placeMarker")}
        </Text>
      </Pressable>

      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>
          {t("adventures.quests.createQuest.submit")}
        </Text>
      </Pressable>
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
  h2: {
    fontSize: 18,
    fontWeight: 600,
    textAlign: "center",
    textTransform: "uppercase",
    marginTop: 10,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
  },
  p: {},
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
