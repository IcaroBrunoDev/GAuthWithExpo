import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

import * as Google from "expo-auth-session/providers/google";
import { UserInfo } from "./src/components/UserInfo";

const googleAuthTokens = {
  expoClientId:
    "362406565316-61g4a11itu8untc0esr0c5b5otqt0rv6.apps.googleusercontent.com",
  iosClientId:
    "362406565316-lrmvvpsh2dqgo1qnp1lns7bosblg8m61.apps.googleusercontent.com",
  androidClientId:
    "362406565316-ee29688l04jq3h17to915rt25k3djug3.apps.googleusercontent.com",
  webClientId:
    "362406565316-7qep7sa0vra19hcva94ukaijhhbavg35.apps.googleusercontent.com",
};

export default function App() {
  const [userData, setUserData] = React.useState();

  const [_, response, promptAsync] = Google.useAuthRequest(googleAuthTokens);

  React.useEffect(() => {
    if (response?.type === "success") {
      const { accessToken } = response.authentication;

      fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
        {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
        }
      )
        .then((response) => response.json())
        .then((data) => setUserData(data));
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Simple Google Auth App With Expo</Text>
      <Button
        title="Click Here to Loggin With Google"
        onPress={() => promptAsync()}
      />
      {response?.type === "success" && userData && <UserInfo {...userData} />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginBottom: 20,
  },
});
