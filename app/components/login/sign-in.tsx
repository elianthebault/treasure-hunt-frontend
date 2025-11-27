import { Link } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function SignIn() {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit() {
    console.log("Login attempt:", { email, password });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>{t("signIn.title")}</Text>

      <Text style={styles.label}>{t("signIn.email")}:</Text>
      <TextInput
        style={styles.input}
        placeholder={t("signIn.emailPlaceholder")}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>{t("signIn.password")}:</Text>
      <TextInput
        style={styles.input}
        placeholder={t("signIn.passwordPlaceholder")}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>{t("signIn.submit")}</Text>
      </Pressable>

      <Link href="/components/login/forgotten-password" style={styles.link}>
        {t("signIn.forgottenPassword")}
      </Link>

      <Link href="/components/login/sign-up" style={styles.link}>
        {t("signIn.noAccountSignUp")}
      </Link>
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
