import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

import * as Google from "expo-auth-session/providers/google";
import { UserInfo } from "./src/components/UserInfo";

const googleAuthTokens = {
  expoClientId: "YOUR_EXPOCLIENT_GUID_HERE",
  iosClientId: "YOUR_IOSCLIENT_GUID_HERE",
  androidClientId: "YOUR_ANDROIDCLIENT_GUID_HERE",
  webClientId: "YOUR_WEBCLIENT_GUID_HERE",
};

const googleApiUrl = "https://www.googleapis.com/oauth2/v1/";

export default function App() {
  const [userData, setUserData] = React.useState();

  const [_, response, promptAsync] = Google.useAuthRequest(googleAuthTokens);

  React.useEffect(() => {
    if (response?.type === "success") {
      const { accessToken } = response.authentication;

      fetch(`${googleApiUrl}/userinfo?access_token=${accessToken}`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      })
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
