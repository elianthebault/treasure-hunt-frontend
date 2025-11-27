import { Redirect } from "expo-router";

export default function Index() {
  let isLogged = false;

  if (isLogged) {
    return <Redirect href="/components/adventure/adventures" />;
  }

  return <Redirect href="/components/login/sign-in" />;
}
