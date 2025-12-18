import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SignUp() {
  const { t } = useTranslation();

  const [post, setPost] = useState({
    phoneNumber: "",
    email: "",
    firstname: "",
    lastname: "",
    nickname: "",
    password: "",
    repeatPassword: "",
  });

  function onSubmit() {
    const formData = new FormData();
    console.log("USER = ", post);
    formData.append(
      "user",
      new Blob([JSON.stringify(post)], { type: "application/json" })
    );

    if (image) {
      formData.append("image", {
        uri: image,
        name: "profile.jpg",
        type: "image/jpeg",
      } as any);
    }

    fetch("http://localhost:8090/users", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        router.replace("/components/login/sign-in");
        console.log("NEW USER:", data);
      })
      .catch((err) => console.log("ERROR:", err));
  }

  const [image, setImage] = useState<string | null>(null);

  async function pickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permission required");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>{t("signUp.title")}</Text>
      <Text style={styles.label}>{t("signUp.phone")}:</Text>
      <TextInput
        style={styles.input}
        placeholder={t("signUp.phonePlaceholder")}
        keyboardType="phone-pad"
        value={post.phoneNumber}
        onChangeText={(value) => {
          setPost((prev) => ({ ...prev, phoneNumber: value }));
        }}
      />
      <Text style={styles.label}>{t("signUp.email")}:</Text>
      <TextInput
        style={styles.input}
        placeholder={t("signUp.emailPlaceholder")}
        keyboardType="email-address"
        value={post.email}
        onChangeText={(value) => {
          setPost((prev) => ({ ...prev, email: value }));
        }}
      />
      <Text style={styles.label}>{t("signUp.firstname")}:</Text>
      <TextInput
        style={styles.input}
        placeholder={t("signUp.firstnamePlaceholder")}
        keyboardType="default"
        value={post.firstname}
        onChangeText={(value) => {
          setPost((prev) => ({ ...prev, firstname: value }));
        }}
      />
      <Text style={styles.label}>{t("signUp.lastname")}:</Text>
      <TextInput
        style={styles.input}
        placeholder={t("signUp.lastnamePlaceholder")}
        keyboardType="default"
        value={post.lastname}
        onChangeText={(value) => {
          setPost((prev) => ({ ...prev, lastname: value }));
        }}
      />
      <Text style={styles.label}>{t("signUp.nickname")}:</Text>
      <TextInput
        style={styles.input}
        placeholder={t("signUp.nicknamePlaceholder")}
        keyboardType="default"
        value={post.nickname}
        onChangeText={(value) => {
          setPost((prev) => ({ ...prev, nickname: value }));
        }}
      />
      <Text style={styles.label}>{t("signUp.password")}:</Text>
      <TextInput
        style={styles.input}
        placeholder={t("signUp.passwordPlaceholder")}
        secureTextEntry
        value={post.password}
        onChangeText={(value) => {
          setPost((prev) => ({ ...prev, password: value }));
        }}
      />
      <Text style={styles.label}>{t("signUp.repeatPassword")}:</Text>
      <TextInput
        style={styles.input}
        placeholder={t("signUp.repeatPasswordPlaceholder")}
        secureTextEntry
        value={post.repeatPassword}
        onChangeText={(value) => {
          setPost((prev) => ({ ...prev, repeatPassword: value }));
        }}
      />
      <Text style={styles.label}>{t("signUp.profile")}:</Text>
      <Pressable style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>{t("signUp.uploadImage")}</Text>
      </Pressable>

      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            alignSelf: "center",
          }}
        />
      )}

      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>{t("signUp.submit")}</Text>
      </Pressable>
    </View>
  );
}

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
  link: {
    color: "blue",
    textAlign: "center",
  },
});
