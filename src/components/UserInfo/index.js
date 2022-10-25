import { View, Text, Image, StyleSheet } from "react-native";

export const UserInfo = (user) => {
  const { name, picture } = user;

  return (
    <View style={styles.container}>
      <Image source={{ uri: picture }} style={styles.image} />
      <Text>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 100,
  },
});
